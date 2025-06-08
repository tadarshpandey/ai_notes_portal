from rest_framework import serializers
from .models import Note

class NoteSerializer(serializers.ModelSerializer):
    class Meta:
        model = Note
        fields = ['id', 'user', 'title', 'content', 'summary', 'created_at', 'updated_at']
        read_only_fields = ['user', 'summary', 'created_at', 'updated_at']