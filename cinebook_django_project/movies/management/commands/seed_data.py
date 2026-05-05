from django.core.management.base import BaseCommand
from django.utils import timezone
from movies.models import Genre, Language, Movie, Theater, Screen, Show
import datetime, random

class Command(BaseCommand):
    help = 'Seed sample data'
    def handle(self, *args, **kwargs):
        genres = {}
        for g in ['Action','Drama','Comedy','Thriller','Sci-Fi','Romance','Horror','Biography']:
            obj, _ = Genre.objects.get_or_create(name=g)
            genres[g] = obj

        langs = {}
        for l in ['Hindi','English','Tamil','Telugu','Kannada','Malayalam']:
            obj, _ = Language.objects.get_or_create(name=l)
            langs[l] = obj

        movies_data = [
            {'title':'Kalki 2898 AD','description':'A mythological sci-fi epic set in a dystopian future. Kalki, the 10th avatar of Vishnu, battles against evil in a post-apocalyptic world.','genre':'Sci-Fi','language':'Telugu','duration':181,'release_date':'2024-06-27','rating':'UA','imdb_score':8.4,'trailer_url':'https://www.youtube.com/embed/GecS__6ZYWY'},
            {'title':'Fighter','description':"India's first aerial action franchise. Elite Air Force officers combat terrorists threatening national security.","genre":'Attack','language':'Hindi','duration':166,'release_date':'2024-01-25','rating':'UA','imdb_score':7.8,'trailer_url':'https://www.youtube.com/embed/LFaVQw24MaY'},
            {'title':'Stree 2','description':'The horror-comedy franchise returns to Chanderi with a new supernatural threat.','genre':'Comedy','language':'Hindi','duration':135,'release_date':'2024-08-15','rating':'UA','imdb_score':8.1,'trailer_url':'https://www.youtube.com/embed/Qoij5y-8AVc'},
            {'title':'Pushpa 2: The Rule','description':"Pushpa Raj's sandalwood smuggling empire faces new threats from enemies and a relentless cop.",'genre':'Action','language':'Telugu','duration':190,'release_date':'2024-12-05','rating':'UA','imdb_score':8.2,'trailer_url':'https://www.youtube.com/embed/Q1NKMPhP8PY'},
            {'title':'Article 370','description':'A political drama based on the abrogation of Article 370 in Jammu & Kashmir.','genre':'Drama','language':'Hindi','duration':145,'release_date':'2024-02-23','rating':'UA','imdb_score':8.0,'trailer_url':'https://www.youtube.com/embed/3rCmpjlcVAA'},
            {'title':'Jailer 2','description':'Muthuvel Pandian comes out of retirement once more in this mass entertainer.','genre':'Thriller','language':'Telugui','duration':155,'release_date':'2024-11-10','rating':'UA','imdb_score':7.9,'trailer_url':'https://www.youtube.com/embed/Ga26bMSoHAk'},
            {'title':'Rocky Aur Rani Kii Prem Kahaani','description':'A love story navigating family drama, cultural clashes, and modern relationships.','genre':'Romance','language':'Hindi','duration':168,'release_date':'2024-07-28','rating':'UA','imdb_score':7.5,'trailer_url':'https://www.youtube.com/embed/mV3iOQ_FMCU'},
            {'title':'Leo','description':'A mild-mannered cafe owner with a violent past faces criminals who come after him.','genre':'Action','language':'Tamil','duration':163,'release_date':'2024-10-19','rating':'UA','imdb_score':7.6,'trailer_url':'https://www.youtube.com/embed/gMoNpUQVVlA'},
        ]

        created_movies = []
        for md in movies_data:
            movie, _ = Movie.objects.get_or_create(title=md['title'], defaults={**md, 'genre':genres[md['genre']], 'language':langs[md['language']], 'is_active':True})
            created_movies.append(movie)

        theaters_data = [
            {'name':'PVR Cinemas','location':'Juhu','city':'Mumbai','address':'Juhu Versova Link Road, Andheri West'},
            {'name':'INOX Megaplex','location':'Koregaon Park','city':'Pune','address':'Weikfield IT Citi Infopark, Nagar Road'},
            {'name':'Cinépolis','location':'Vasant Kunj','city':'Delhi','address':'Ambience Mall, Nelson Mandela Marg'},
            {'name':'Carnival Cinemas','location':'Whitefield','city':'Bangalore','address':'Market Square Mall, Whitefield Main Road'},
            {'name':'Miraj Cinemas','location':'Kothrud','city':'Pune','address':'Kothrud Stand, Karve Road'},
        ]

        created_theaters = []
        for td in theaters_data:
            t, _ = Theater.objects.get_or_create(name=td['name'], defaults=td)
            created_theaters.append(t)
            for i in range(1, 4):
                Screen.objects.get_or_create(theater=t, name=f'Screen {i}', defaults={'total_rows':8,'seats_per_row':12})

        today = timezone.now().date()
        times = [datetime.time(10,0), datetime.time(13,30), datetime.time(17,0), datetime.time(20,30)]
        prices = [220, 280, 320, 380]
        show_count = 0
        for day_offset in range(7):
            show_date = today + datetime.timedelta(days=day_offset)
            for theater in created_theaters:
                screens = list(theater.screens.all())
                for i, movie in enumerate(random.sample(created_movies, min(3, len(created_movies)))):
                    screen = screens[i % len(screens)]
                    for show_time in times[:3]:
                        try:
                            Show.objects.get_or_create(movie=movie, screen=screen, show_date=show_date, show_time=show_time, defaults={'price':random.choice(prices),'is_active':True})
                            show_count += 1
                        except Exception:
                            pass
        self.stdout.write(self.style.SUCCESS(f'Seeded {len(created_movies)} movies, {len(created_theaters)} theaters, ~{show_count} shows'))
