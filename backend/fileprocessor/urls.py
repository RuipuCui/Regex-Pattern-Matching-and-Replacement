# fileprocessor/urls.py

from django.urls import path
from . import views
from .views import process_file

urlpatterns = [
    path('process/', process_file, name='process_file'),
]
