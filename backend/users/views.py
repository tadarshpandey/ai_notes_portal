from django.shortcuts import render

# Create your views here.
from rest_framework import generics
# Import the `generics` module from Django REST Framework.
# This module provides pre-built views for common API patterns,
# simplifying the creation of API endpoints.

from .serializers import RegisterSerializer
# Import `RegisterSerializer` from the current application's `serializers.py` file.
# This custom serializer is crucial for:
# 1. Validating incoming data (e.g., username, password, email) during registration.
# 2. Deserializing the request data into Python objects.
# 3. Creating and saving new `User` instances to the database.

from django.contrib.auth.models import User
# Import Django's built-in `User` model.
# This model represents user accounts in the database and is used by Django's authentication system.

class RegisterView(generics.CreateAPIView):
    """
    API view for user registration.

    This view handles HTTP POST requests to create new user accounts.
    It leverages `generics.CreateAPIView` for a streamlined implementation
    of the creation process.
    """
    queryset = User.objects.all()
    # Defines the base queryset for this view.
    # For `CreateAPIView`, this primarily serves to identify the model (`User`)
    # that new instances will be created for. Although `objects.all()` is used,
    # this view's purpose is solely to create, not to list or retrieve.

    serializer_class = RegisterSerializer
    # Specifies the serializer class that this view will use.
    # When a POST request is received, `RegisterSerializer` will be
    # instantiated with the request data, validated, and then used to
    # create a new `User` object in the database.
