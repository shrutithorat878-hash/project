from django.urls import path
from . import views

app_name = 'bookings'

urlpatterns = [
    path('book/<int:show_id>/', views.create_booking, name='create_booking'),
    path('confirmation/<uuid:booking_id>/', views.booking_confirmation, name='confirmation'),
    path('my-bookings/', views.my_bookings, name='my_bookings'),
    path('cancel/<uuid:booking_id>/', views.cancel_booking, name='cancel_booking'),
    path('admin-dashboard/', views.admin_dashboard, name='admin_dashboard'),
]
