from django.urls import path

from rest_framework_simplejwt.views import TokenRefreshView

from .views import (
    DoodlesApiView,
    CustomTokenObtainPairView,
    RegisterView,
)

urlpatterns = [
    path('api/register', RegisterView.as_view()),
    path('api/token', CustomTokenObtainPairView.as_view()),
    path('api/token/refresh', TokenRefreshView.as_view()),
    path('api/data', DoodlesApiView.as_view()),
]
