from django.shortcuts import render
from rest_framework import generics, permissions, status
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from transformers import pipeline
from .models import Note
from .serializers import NoteSerializer

# 🔹 Load the summarization model once globally
summarizer = pipeline("summarization", model="facebook/bart-large-cnn")

# 🔹 List & Create Notes
class NoteListCreateView(generics.ListCreateAPIView):
    serializer_class = NoteSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        return Note.objects.filter(user=self.request.user).order_by('-created_at')
    
    def perform_create(self, serializer):
        print("🔥 Creating note for:", self.request.user)
        serializer.save(user=self.request.user)

# 🔹 Retrieve, Update, Delete a Note
class NoteDetailView(generics.RetrieveUpdateDestroyAPIView):
    serializer_class = NoteSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        return Note.objects.filter(user=self.request.user)

# 🔹 AI Summarization API
@api_view(['POST'])
@permission_classes([IsAuthenticated])
def summarize_note(request):
    try:
        # Get data from request
        text = request.data.get("text")
        title = request.data.get("title", "Untitled Note")

        if not text:
            return Response({"error": "Text is required."}, status=status.HTTP_400_BAD_REQUEST)

        # Hugging Face summarization
        result = summarizer(text, max_length=150, min_length=40, do_sample=False)
        summary = result[0]['summary_text']

        # Save as a new Note — no note_id needed at all!
        note = Note.objects.create(
            user=request.user,
            title=title,
            content=text,
            summary=summary
        )

        serializer = NoteSerializer(note)
        return Response(serializer.data, status=status.HTTP_201_CREATED)

    except Exception as e:
        print("🔥 Error in summarize_note:", str(e))
        return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
