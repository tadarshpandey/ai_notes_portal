from django.contrib import admin
from django.urls import path, include
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)
from users.views import RegisterView  # Make sure you have 'users' app and RegisterView

urlpatterns = [
    path('admin/', admin.site.urls),

    # Auth-related endpoints
    path('api/register/', RegisterView.as_view(), name='register'),
    path('api/token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('api/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),

    # Notes-related API
    path('api/', include('notes_app.urls')),
]
