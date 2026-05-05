from django.shortcuts import render, get_object_or_404, redirect
from django.contrib.auth.decorators import login_required
from django.contrib import messages
from django.http import JsonResponse
from django.utils import timezone
from django.core.mail import send_mail
from django.conf import settings
from django.template.loader import render_to_string
from movies.models import Show
from .models import Booking, BookedSeat
import datetime
import json


@login_required
def create_booking(request, show_id):
    show = get_object_or_404(Show, pk=show_id, is_active=True)

    if request.method == 'POST':
        data = json.loads(request.body)
        seat_ids       = data.get('seats', [])
        payment_method = data.get('payment_method', 'card')

        if not seat_ids:
            return JsonResponse({'success': False, 'error': 'No seats selected'})
        if len(seat_ids) > 8:
            return JsonResponse({'success': False, 'error': 'Max 8 seats allowed'})

        # Check seats not already booked
        booked = list(
            show.bookings.filter(status__in=['confirmed','pending'])
            .values_list('seats__seat_number', flat=True)
        )
        conflict = [s for s in seat_ids if s in booked]
        if conflict:
            return JsonResponse({'success': False, 'error': f'Seats {", ".join(conflict)} already booked'})

        total = show.price * len(seat_ids)

        # Create booking
        booking = Booking.objects.create(
            user=request.user,
            show=show,
            status='confirmed',
            payment_method=payment_method,
            total_amount=total,
            expires_at=timezone.now() + datetime.timedelta(minutes=30),
        )

        for sid in seat_ids:
            row   = sid[0]
            index = int(sid[1:])
            BookedSeat.objects.create(
                booking=booking,
                seat_number=sid,
                row_label=row,
                seat_index=index,
            )

        # Send email confirmation (Task 2)
        send_booking_confirmation(booking)

        return JsonResponse({
            'success': True,
            'booking_id': str(booking.booking_id),
            'redirect': f'/bookings/confirmation/{booking.booking_id}/'
        })

    return JsonResponse({'success': False, 'error': 'Invalid method'})


def send_booking_confirmation(booking):
    """Task 2: Send ticket email confirmation"""
    subject = f"CineBook - Booking Confirmed! #{booking.booking_ref}"
    seats   = [s.seat_number for s in booking.seats.all()]
    message = f"""
Hi {booking.user.first_name or booking.user.username},

🎟️ Your booking is CONFIRMED!

Booking ID  : {booking.booking_ref}
Movie       : {booking.show.movie.title}
Theater     : {booking.show.screen.theater.name}
Date        : {booking.show.show_date.strftime('%d %b %Y')}
Time        : {booking.show.show_time.strftime('%I:%M %p')}
Seats       : {', '.join(seats)}
Amount Paid : ₹{booking.total_amount}

Thank you for booking with CineBook!
Enjoy the movie! 🍿
    """
    try:
        send_mail(subject, message, settings.DEFAULT_FROM_EMAIL, [booking.user.email])
        booking.email_sent = True
        booking.save()
    except Exception:
        pass


@login_required
def booking_confirmation(request, booking_id):
    booking = get_object_or_404(Booking, booking_id=booking_id, user=request.user)
    seats   = booking.seats.all()
    return render(request, 'bookings/confirmation.html', {'booking': booking, 'seats': seats})


@login_required
def my_bookings(request):
    bookings = Booking.objects.filter(
        user=request.user
    ).select_related('show__movie','show__screen__theater').prefetch_related('seats')
    return render(request, 'bookings/my_bookings.html', {'bookings': bookings})


@login_required
def cancel_booking(request, booking_id):
    booking = get_object_or_404(Booking, booking_id=booking_id, user=request.user)
    if booking.status == 'confirmed':
        booking.status = 'cancelled'
        booking.save()
        messages.success(request, 'Booking cancelled successfully.')
    return redirect('bookings:my_bookings')


def admin_dashboard(request):
    """Task 6: Admin Dashboard with Analytics"""
    if not request.user.is_staff:
        return redirect('movies:home')

    from django.db.models import Sum, Count
    from movies.models import Movie, Theater

    total_revenue = Booking.objects.filter(status='confirmed').aggregate(Sum('total_amount'))['total_amount__sum'] or 0
    total_tickets = BookedSeat.objects.filter(booking__status='confirmed').count()
    total_bookings = Booking.objects.filter(status='confirmed').count()

    # Popular movies
    popular = Movie.objects.annotate(
        ticket_count=Count('shows__bookings__seats', filter=__import__('django.db.models', fromlist=['Q']).Q(shows__bookings__status='confirmed'))
    ).order_by('-ticket_count')[:6]

    # Recent bookings
    recent = Booking.objects.filter(status='confirmed').select_related(
        'user','show__movie','show__screen__theater'
    ).prefetch_related('seats')[:10]

    # Busiest theaters
    theaters = Theater.objects.annotate(
        total_tickets=Count('screens__shows__bookings__seats',
            filter=__import__('django.db.models', fromlist=['Q']).Q(screens__shows__bookings__status='confirmed'))
    ).order_by('-total_tickets')[:5]

    context = {
        'total_revenue': total_revenue,
        'total_tickets': total_tickets,
        'total_bookings': total_bookings,
        'popular_movies': popular,
        'recent_bookings': recent,
        'busiest_theaters': theaters,
    }
    return render(request, 'bookings/admin_dashboard.html', context)
