from django.urls import path
from .views import RegistrationAPIView, LoginAPIView, ListUsersAPIView

urlpatterns = [
    path('register/', RegistrationAPIView.as_view(), name='register'),
    path('login/', LoginAPIView.as_view(), name='login'),
    path('users/', ListUsersAPIView.as_view(), name='list-users'),
]
