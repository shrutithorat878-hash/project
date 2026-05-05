from django.contrib import admin
from .models import Genre, Language, Movie, Theater, Screen, Show


@admin.register(Genre)
class GenreAdmin(admin.ModelAdmin):
    list_display = ['name']
    search_fields = ['name']


@admin.register(Language)
class LanguageAdmin(admin.ModelAdmin):
    list_display = ['name']


@admin.register(Movie)
class MovieAdmin(admin.ModelAdmin):
    list_display  = ['title','genre','language','imdb_score','duration','release_date','is_active']
    list_filter   = ['genre','language','is_active','rating']
    search_fields = ['title']
    list_editable = ['is_active']


class ScreenInline(admin.TabularInline):
    model = Screen
    extra = 2


@admin.register(Theater)
class TheaterAdmin(admin.ModelAdmin):
    list_display = ['name','city','location','is_active']
    list_filter  = ['city','is_active']
    search_fields = ['name','city']
    inlines = [ScreenInline]


@admin.register(Show)
class ShowAdmin(admin.ModelAdmin):
    list_display  = ['movie','screen','show_date','show_time','price','is_active']
    list_filter   = ['show_date','is_active','screen__theater']
    search_fields = ['movie__title']
    date_hierarchy = 'show_date'
