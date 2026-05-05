from django.shortcuts import render, redirect
from django.contrib.auth import login, logout, authenticate
from django.contrib.auth.models import User
from django.contrib import messages
from django.contrib.auth.decorators import login_required
from .models import UserProfile


def register(request):
    if request.method == 'POST':
        username   = request.POST.get('username','').strip()
        email      = request.POST.get('email','').strip()
        password1  = request.POST.get('password1','')
        password2  = request.POST.get('password2','')
        first_name = request.POST.get('first_name','').strip()
        last_name  = request.POST.get('last_name','').strip()
        phone      = request.POST.get('phone','').strip()

        if password1 != password2:
            messages.error(request, 'Passwords do not match.')
            return render(request, 'accounts/register.html')
        if User.objects.filter(username=username).exists():
            messages.error(request, 'Username already taken.')
            return render(request, 'accounts/register.html')
        if User.objects.filter(email=email).exists():
            messages.error(request, 'Email already registered.')
            return render(request, 'accounts/register.html')

        user = User.objects.create_user(
            username=username, email=email,
            password=password1,
            first_name=first_name, last_name=last_name
        )
        UserProfile.objects.create(user=user, phone=phone)
        login(request, user)
        messages.success(request, f'Welcome to CineBook, {first_name or username}! 🎬')
        return redirect('movies:home')

    return render(request, 'accounts/register.html')


def user_login(request):
    if request.user.is_authenticated:
        return redirect('movies:home')
    if request.method == 'POST':
        username = request.POST.get('username','')
        password = request.POST.get('password','')
        user = authenticate(request, username=username, password=password)
        if user:
            login(request, user)
            next_url = request.GET.get('next','/')
            return redirect(next_url)
        messages.error(request, 'Invalid username or password.')
    return render(request, 'accounts/login.html')


def user_logout(request):
    logout(request)
    return redirect('movies:home')


@login_required
def profile(request):
    try:
        prof = request.user.profile
    except UserProfile.DoesNotExist:
        prof = UserProfile.objects.create(user=request.user)

    if request.method == 'POST':
        request.user.first_name = request.POST.get('first_name','')
        request.user.last_name  = request.POST.get('last_name','')
        request.user.email      = request.POST.get('email','')
        request.user.save()
        prof.phone = request.POST.get('phone','')
        prof.city  = request.POST.get('city','')
        prof.save()
        messages.success(request, 'Profile updated successfully!')
        return redirect('accounts:profile')

    return render(request, 'accounts/profile.html', {'profile': prof})
