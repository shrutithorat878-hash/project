from django.db import models


class Genre(models.Model):
    name = models.CharField(max_length=50, unique=True)
    def __str__(self): return self.name
    class Meta: ordering = ['name']


class Language(models.Model):
    name = models.CharField(max_length=50, unique=True)
    def __str__(self): return self.name


class Movie(models.Model):
    RATING_CHOICES = [('U','U'),('UA','U/A'),('A','A'),('S','S')]
    title        = models.CharField(max_length=200)
    description  = models.TextField()
    genre        = models.ForeignKey(Genre, on_delete=models.SET_NULL, null=True)
    language     = models.ForeignKey(Language, on_delete=models.SET_NULL, null=True)
    duration     = models.PositiveIntegerField(help_text='minutes')
    release_date = models.DateField()
    rating       = models.CharField(max_length=2, choices=RATING_CHOICES, default='UA')
    imdb_score   = models.DecimalField(max_digits=3, decimal_places=1, default=0.0)
    poster       = models.ImageField(upload_to='posters/', blank=True, null=True)
    trailer_url  = models.URLField(blank=True)
    is_active    = models.BooleanField(default=True)
    created_at   = models.DateTimeField(auto_now_add=True)

    def __str__(self): return self.title
    def duration_display(self):
        return f"{self.duration//60}h {self.duration%60}m"
    class Meta: ordering = ['-release_date']


class Theater(models.Model):
    name      = models.CharField(max_length=200)
    location  = models.CharField(max_length=200)
    city      = models.CharField(max_length=100)
    address   = models.TextField()
    is_active = models.BooleanField(default=True)
    def __str__(self): return f"{self.name} - {self.city}"
    class Meta: ordering = ['city','name']


class Screen(models.Model):
    theater       = models.ForeignKey(Theater, on_delete=models.CASCADE, related_name='screens')
    name          = models.CharField(max_length=50)
    total_rows    = models.PositiveIntegerField(default=10)
    seats_per_row = models.PositiveIntegerField(default=15)
    def __str__(self): return f"{self.theater.name} - {self.name}"
    @property
    def total_seats(self): return self.total_rows * self.seats_per_row


class Show(models.Model):
    movie     = models.ForeignKey(Movie, on_delete=models.CASCADE, related_name='shows')
    screen    = models.ForeignKey(Screen, on_delete=models.CASCADE, related_name='shows')
    show_date = models.DateField()
    show_time = models.TimeField()
    price     = models.DecimalField(max_digits=8, decimal_places=2)
    is_active = models.BooleanField(default=True)
    def __str__(self): return f"{self.movie.title} | {self.show_date} {self.show_time}"
    class Meta:
        ordering = ['show_date','show_time']
        unique_together = ['screen','show_date','show_time']
