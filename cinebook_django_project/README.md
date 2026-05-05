# 🎬 CineBook — Django Movie Booking System
## BookMyShow Clone | Internship Project

A full-stack movie ticket booking web application built with **Python Django** and **MySQL**.

---

## ✅ All 6 Internship Tasks Implemented

| # | Task | Location |
|---|------|----------|
| 1 | **Genre & Language Filters** | `movies/views.py` → `home()` + `templates/movies/home.html` |
| 2 | **Ticket Email Confirmation** | `bookings/views.py` → `send_booking_confirmation()` |
| 3 | **Add Movie Trailers** (YouTube embed) | `movies/views.py` → `movie_detail()` + `templates/movies/movie_detail.html` |
| 4 | **Payment Gateway Integration** | `bookings/views.py` → `create_booking()` + `templates/movies/seat_selection.html` |
| 5 | **Seat Reservation Timeout** | `static/js/cinebook.js` → `startTimer()` (5-min countdown) |
| 6 | **Admin Dashboard with Analytics** | `bookings/views.py` → `admin_dashboard()` + `templates/bookings/admin_dashboard.html` |

---

## 📁 Project Structure

```
cinebook/                   ← Django project config
├── settings.py             ← DB, apps, email config
├── urls.py                 ← Root URL routing

movies/                     ← Movies app
├── models.py               ← Movie, Genre, Language, Theater, Screen, Show
├── views.py                ← Home, movie detail, seat selection
├── urls.py
├── admin.py
└── management/commands/
    └── seed_data.py        ← Sample data seeder

bookings/                   ← Bookings app
├── models.py               ← Booking, BookedSeat
├── views.py                ← Create booking, confirmation, dashboard
├── urls.py
└── admin.py

accounts/                   ← Auth app
├── models.py               ← UserProfile
├── views.py                ← Register, Login, Logout, Profile
├── urls.py
└── admin.py

templates/
├── base.html               ← Navbar, footer, messages
├── movies/
│   ├── home.html           ← Movie grid + filters
│   ├── movie_detail.html   ← Trailer + showtimes
│   └── seat_selection.html ← Seat map + payment + timer
├── bookings/
│   ├── confirmation.html   ← Ticket + email confirmation
│   ├── my_bookings.html    ← User booking history
│   └── admin_dashboard.html← Analytics dashboard
└── accounts/
    ├── register.html
    ├── login.html
    └── profile.html

static/
├── css/cinebook.css        ← All styles
└── js/cinebook.js          ← Global JS utilities
```

---

## 🚀 Setup Instructions

### 1. Install Python dependencies
```bash
pip install -r requirements.txt
```

### 2. MySQL Setup
Create database in MySQL:
```sql
CREATE DATABASE cinebook_db CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
```

Then update `cinebook/settings.py`:
```python
DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.mysql',
        'NAME': 'cinebook_db',
        'USER': 'root',
        'PASSWORD': 'your_password',
        'HOST': 'localhost',
        'PORT': '3306',
    }
}
```

### 3. Run Migrations
```bash
python manage.py makemigrations
python manage.py migrate
```

### 4. Create Superuser (Admin)
```bash
python manage.py createsuperuser
```

### 5. Seed Sample Data
```bash
python manage.py seed_data
```
This creates: 8 movies, 5 theaters, 3 screens each, ~300+ shows for next 7 days.

### 6. Run Development Server
```bash
python manage.py runserver
```

Open: **http://127.0.0.1:8000**

---

## 🔑 Default Login (after seed)

| Role | URL | Username | Password |
|------|-----|----------|----------|
| Admin | /admin/ | admin | admin123 |

---

## 🌐 App URLs

| URL | Page |
|-----|------|
| `/` | Home — Movie listing with filters |
| `/movie/<id>/` | Movie detail + YouTube trailer + showtimes |
| `/show/<id>/seats/` | Seat selection map + 5-min timer |
| `/bookings/book/<show_id>/` | Book seats API (POST) |
| `/bookings/confirmation/<id>/` | Booking confirmed ticket |
| `/bookings/my-bookings/` | User booking history |
| `/bookings/admin-dashboard/` | Analytics dashboard (staff only) |
| `/accounts/register/` | Register |
| `/accounts/login/` | Login |
| `/accounts/profile/` | User profile |
| `/admin/` | Django admin panel |

---

## 🛠️ Tech Stack

- **Backend**: Python 3.x · Django 4.2
- **Database**: MySQL (SQLite for development)
- **Frontend**: Bootstrap 5 · Custom CSS · Vanilla JS
- **Fonts**: Google Fonts (Bebas Neue, DM Sans, JetBrains Mono)
- **Email**: Django email backend (console for dev, SMTP for prod)
