from rest_framework import serializers
from django.contrib.auth.models import User

class RegisterSerializer(serializers.ModelSerializer):
    # Password is write-only to prevent it from being exposed in responses
    password = serializers.CharField(write_only=True)

    class Meta:
        model = User  # Link to Django's built-in User model
        fields = ('username', 'email', 'password')  # Fields to accept from client

    def create(self, validated_data):
        # Create a new user using Django's built-in create_user method
        # This automatically handles password hashing
        user = User.objects.create_user(
            username=validated_data['username'],
            email=validated_data.get('email', ''),  # Use empty string if email not provided
            password=validated_data['password']
        )
        return user
