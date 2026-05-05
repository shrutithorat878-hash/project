from django.db import models
from django.contrib.auth.models import User
from movies.models import Show
import uuid


class Booking(models.Model):
    STATUS = [('pending','Pending'),('confirmed','Confirmed'),('cancelled','Cancelled'),('expired','Expired')]
    PAYMENT = [('card','Card'),('upi','UPI'),('razorpay','Razorpay'),('wallet','Wallet')]

    booking_id      = models.UUIDField(default=uuid.uuid4, editable=False, unique=True)
    user            = models.ForeignKey(User, on_delete=models.CASCADE, related_name='bookings')
    show            = models.ForeignKey(Show, on_delete=models.CASCADE, related_name='bookings')
    status          = models.CharField(max_length=20, choices=STATUS, default='pending')
    payment_method  = models.CharField(max_length=20, choices=PAYMENT, default='card')
    total_amount    = models.DecimalField(max_digits=10, decimal_places=2)
    email_sent      = models.BooleanField(default=False)
    created_at      = models.DateTimeField(auto_now_add=True)
    updated_at      = models.DateTimeField(auto_now=True)
    expires_at      = models.DateTimeField(null=True, blank=True)

    def __str__(self): return f"BK-{str(self.booking_id)[:8].upper()} | {self.user.username}"

    @property
    def booking_ref(self): return f"CB{str(self.booking_id)[:8].upper()}"

    class Meta: ordering = ['-created_at']


class BookedSeat(models.Model):
    booking     = models.ForeignKey(Booking, on_delete=models.CASCADE, related_name='seats')
    seat_number = models.CharField(max_length=10)   # e.g. A1, B5
    row_label   = models.CharField(max_length=5)
    seat_index  = models.PositiveIntegerField()

    def __str__(self): return f"{self.seat_number} - {self.booking.booking_ref}"
    class Meta: unique_together = ['booking','seat_number']
