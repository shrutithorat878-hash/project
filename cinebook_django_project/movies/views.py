from django.shortcuts import render, get_object_or_404
from django.db.models import Q
from django.utils import timezone
from .models import Movie, Genre, Language, Show, Theater
import datetime


def home(request):
    movies = Movie.objects.filter(is_active=True).select_related('genre','language')
    genres    = Genre.objects.all()
    languages = Language.objects.all()
    cities    = Theater.objects.filter(is_active=True).values_list('city', flat=True).distinct()

    # Filters
    genre_id  = request.GET.get('genre')
    lang_id   = request.GET.get('language')
    city      = request.GET.get('city')
    search    = request.GET.get('search','').strip()

    if genre_id:  movies = movies.filter(genre_id=genre_id)
    if lang_id:   movies = movies.filter(language_id=lang_id)
    if search:    movies = movies.filter(Q(title__icontains=search)|Q(description__icontains=search))

    context = {
        'movies': movies,
        'genres': genres,
        'languages': languages,
        'cities': cities,
        'selected_genre': genre_id,
        'selected_lang': lang_id,
        'selected_city': city,
        'search': search,
    }
    return render(request, 'movies/home.html', context)


def movie_detail(request, pk):
    movie = get_object_or_404(Movie, pk=pk, is_active=True)
    today = timezone.now().date()
    # Shows for next 7 days
    shows = Show.objects.filter(
        movie=movie,
        is_active=True,
        show_date__gte=today,
        show_date__lte=today + datetime.timedelta(days=6)
    ).select_related('screen__theater').order_by('show_date','show_time')

    # Group shows by date
    shows_by_date = {}
    for show in shows:
        d = show.show_date
        if d not in shows_by_date:
            shows_by_date[d] = []
        shows_by_date[d].append(show)

    # Get YouTube embed ID from URL
    trailer_embed = ''
    if movie.trailer_url:
        if 'embed/' in movie.trailer_url:
            trailer_embed = movie.trailer_url
        elif 'watch?v=' in movie.trailer_url:
            vid_id = movie.trailer_url.split('watch?v=')[-1].split('&')[0]
            trailer_embed = f"https://www.youtube.com/embed/{vid_id}"
        elif 'youtu.be/' in movie.trailer_url:
            vid_id = movie.trailer_url.split('youtu.be/')[-1]
            trailer_embed = f"https://www.youtube.com/embed/{vid_id}"

    context = {
        'movie': movie,
        'shows_by_date': shows_by_date,
        'trailer_embed': trailer_embed,
        'today': today,
    }
    return render(request, 'movies/movie_detail.html', context)


def show_seats(request, show_id):
    show  = get_object_or_404(Show, pk=show_id, is_active=True)
    screen = show.screen

    # Get already booked seat numbers
    booked_seats = list(
        show.bookings.filter(status__in=['confirmed','pending'])
        .values_list('seats__seat_number', flat=True)
    )

    rows = []
    row_letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
    for r in range(screen.total_rows):
        row_label = row_letters[r]
        seats = []
        for c in range(1, screen.seats_per_row + 1):
            sid = f"{row_label}{c}"
            seats.append({
                'id': sid,
                'row': row_label,
                'num': c,
                'booked': sid in booked_seats,
            })
        rows.append({'label': row_label, 'seats': seats})

    context = {
        'show': show,
        'rows': rows,
        'booked_seats': booked_seats,
    }
    return render(request, 'movies/seat_selection.html', context)
