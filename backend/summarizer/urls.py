from django.urls import path
from .views import summarize_note

urlpatterns = [
    path('summarize/', summarize_note, name='summarize-note'),
]
