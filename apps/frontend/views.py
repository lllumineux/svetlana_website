from django.shortcuts import render


def index(request, *args, **kwargs):
    return render(request, 'index.html')


def main(request, *args, **kwargs):
    return render(request, 'main.html')
