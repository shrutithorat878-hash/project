from django.contrib import admin
from .models import Booking, BookedSeat


class BookedSeatInline(admin.TabularInline):
    model = BookedSeat
    extra = 0
    readonly_fields = ['seat_number','row_label','seat_index']


@admin.register(Booking)
class BookingAdmin(admin.ModelAdmin):
    list_display   = ['booking_ref','user','show','status','total_amount','payment_method','created_at']
    list_filter    = ['status','payment_method','created_at']
    search_fields  = ['user__username','user__email']
    readonly_fields = ['booking_id','booking_ref','created_at','updated_at']
    inlines        = [BookedSeatInline]

    def booking_ref(self, obj): return obj.booking_ref
