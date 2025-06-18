from django.shortcuts import render

# Create your views here.
from rest_framework import generics, permissions
from .models import Note
from .serializers import NoteSerializer

class NoteListCreateView(generics.ListCreateAPIView):
    serializer_class = NoteSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        return Note.objects.filter(user=self.request.user).order_by('-created_at')
    
    def perform_create(self, serializer):
        serializer.save(user=self.request.user)

class NoteDetailView(generics.RetrieveUpdateDestroyAPIView):
    serializer_class = NoteSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        return Note.objects.filter(user=self.request.user)
    
'''
code for hugging face transformer ai for notes summarizer....
'''
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework import status

from transformers import pipeline

# Load the summarization model once globally
summarizer = pipeline("summarization", model="facebook/bart-large-cnn")

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def summarize_note(request):
    try:
        text = request.data.get("text", "")
        print("Incoming text:", text)

        if not text:
            return Response({"error": "No input text provided."}, status=status.HTTP_400_BAD_REQUEST)

        # Hugging Face Summarization
        result = summarizer(text, max_length=150, min_length=40, do_sample=False)
        summary = result[0]['summary_text']

        return Response({"summary": summary}, status=status.HTTP_200_OK)

    except Exception as e:
        print("🔥 Error occurred in summarize_note:", str(e))
        print("Not working notes_app views code for ai summarizer")
        return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


# Artificial Intelligence (AI) has revolutionized many industries, from healthcare to finance.
# In healthcare, AI helps in diagnosing diseases more accurately and quickly.
# Financial institutions use AI for fraud detection and algorithmic trading.
# Moreover, AI-powered chatbots are improving customer service across sectors.
# However, with its rapid growth, concerns about job displacement and ethical use have emerged.
# Governments and organizations are now focusing on creating regulations to ensure responsible AI development.

