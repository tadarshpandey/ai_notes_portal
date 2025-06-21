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
        # 👇 Safely convert note_id to int
        note_id_raw = request.data.get("note_id", None)
        note_id = int(note_id_raw) if note_id_raw and str(note_id_raw).isdigit() else None

        text = request.data.get("text", "").strip()
        title = request.data.get("title", "").strip()

        if note_id:
            try:
                note = Note.objects.get(id=note_id, user=request.user)
                text = note.content  # Overwrite text from DB
                print("📌 Updating summary for note ID:", note_id)
            except Note.DoesNotExist:
                return Response({"error": "Note not found for updating."}, status=404)

        if not text:
            return Response({"error": "No input text provided."}, status=400)

        # Summarize
        result = summarizer(text, max_length=150, min_length=40, do_sample=False)
        summary = result[0]['summary_text']

        if note_id:
            note.summary = summary
            note.save()
        else:
            if not title:
                import uuid
                title = f"note_{uuid.uuid4().hex[:8]}"
            print("🆕 Creating new note:", title)
            Note.objects.create(
                user=request.user,
                title=title,
                content=text,
                summary=summary
            )

        return Response({"summary": summary}, status=200)

    except Exception as e:
        print("🔥 Error in summarize_note:", str(e))
        return Response({"error": str(e)}, status=500)
