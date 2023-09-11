from django.urls import path
from .views import RegistrationAPIView, LoginAPIView, ListUsersAPIView, ResearchTopicListAPIView, UserProfileView, UserProfileUpdateView

urlpatterns = [
    path('register/', RegistrationAPIView.as_view(), name='register'),
    path('login/', LoginAPIView.as_view(), name='login'),
    path('users/', ListUsersAPIView.as_view(), name='list-users'),
    path('research-topics/', ResearchTopicListAPIView.as_view(), name='research-topic-list'),
    path('user-profile/', UserProfileView.as_view(), name='user-profile'),
    path('update-profile/', UserProfileUpdateView.as_view(), name='user-profile-update'),

]
