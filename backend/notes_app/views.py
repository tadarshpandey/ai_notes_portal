from django.shortcuts import render
from rest_framework import generics, permissions, status
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from .models import Note
from .serializers import NoteSerializer
import fitz
import uuid
import nltk
from summa.summarizer import summarize
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from django.contrib.auth.models import User
from django.contrib.auth.tokens import default_token_generator
from django.utils.http import urlsafe_base64_encode, urlsafe_base64_decode
from django.utils.encoding import force_bytes, force_str
from rest_framework.permissions import AllowAny


nltk.download('punkt', quiet=True)

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

# ✅ Rewritten lightweight summarizer (no Sumy)
def summarize_text_locally(text):
    try:
        summary = summarize(text, ratio=0.3)  # Ratio: 30% of original
        return summary if summary else text
    except Exception as e:
        print("❌ Error in TextRank summarization:", e)
        return text


# 🔹 AI Summarization API (local tokenizer)
@api_view(['POST'])
@permission_classes([IsAuthenticated])
def summarize_note(request):
    try:
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

        # ✅ Perform simple summarization
        summary = summarize_text_locally(text)

        if note_id:
            note.summary = summary
            note.save()
        else:
            if not title:
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

# 🔹 PDF Upload & Text Extraction
@api_view(['POST'])
@permission_classes([IsAuthenticated])
def upload_pdf(request):
    pdf_file = request.FILES.get('file')

    if not pdf_file:
        return Response({"error": "No file uploaded."}, status=status.HTTP_400_BAD_REQUEST)
    
    if not pdf_file.name.endswith('.pdf'):
        return Response({"error": "Only PDF files are supported."}, status=status.HTTP_400_BAD_REQUEST)
    
    try:
        doc = fitz.open(stream=pdf_file.read(), filetype="pdf")
        text = ""
        for page in doc:
            text += page.get_text()
        doc.close()

        return Response({"extracted_text": text}, status=status.HTTP_200_OK)
    
    except Exception as e:
        return Response({"error": f"Error Processing PDF: {str(e)}"}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

# for password reset
class RequestPasswordResetView(APIView):
    permission_classes = [AllowAny]

    def post(self, request):
        email = request.data.get('email')
        username = request.data.get('username')
        redirect_url = request.data.get('redirect_url')

        try:
            user = User.objects.get(email=email, username=username)
            uid = urlsafe_base64_encode(force_bytes(user.pk))
            token = default_token_generator.make_token(user)
            reset_link = f"{redirect_url}?uid={uid}&token={token}"
            return Response({"reset_link": reset_link}, status=200)
        except User.DoesNotExist:
            return Response({"error": "User not found"}, status=404)

class ResetPasswordConfirmView(APIView):
    permission_classes = [AllowAny]  # <-- Allow public access
    def post(self, request):
        uid = request.data.get('uid')
        token = request.data.get('token')
        password = request.data.get('password')

        try:
            uid = force_str(urlsafe_base64_decode(uid))
            user = User.objects.get(pk=uid)

            if default_token_generator.check_token(user, token):
                user.set_password(password)
                user.save()
                return Response({"message": "Password reset successful"})
            else:
                return Response({"error": "Invalid or expired token"}, status=400)

        except Exception as e:
            return Response({"error": "Something went wrong"}, status=400)
