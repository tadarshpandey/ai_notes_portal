from django.urls import path
from .views import NoteListCreateView, NoteDetailView,  summarize_note, upload_pdf

urlpatterns = [
    path('notes/', NoteListCreateView.as_view(), name='note-list-create'),
    path('notes/<int:pk>/', NoteDetailView.as_view(), name='note-detail'),
    path('summarize/', summarize_note, name='summarize'),
    # path for upload pdf's for summarizing feature...
    path('upload-pdf/', upload_pdf, name='upload_pdf'),
    

]