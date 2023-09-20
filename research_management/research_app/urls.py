from django.urls import path
from . import views

urlpatterns = [
    path('login/', views.LoginAPIView.as_view(), name='login'),
    path('user-profile/', views.UserProfileView.as_view(), name='user-profile'),
    path('update-profile/', views.UserProfileUpdateView.as_view(), name='user-profile-update'),

    path('users/', views.UserListAPIView.as_view(), name='users'),
    path('user/<int:pk>/', views.UserAPIView.as_view(), name='user-id'),
    path('user/', views.UserAPIView.as_view(), name='user'),
    path('users/<int:pk>/toggle-active/', views.UserToggleActiveView.as_view(), name='toggle-active'),

    path('research-topics/', views.ResearchTopicListAPIView.as_view(), name='research-topics'),
    path("research-topic/<int:pk>/", views.ResearchTopicAPIView.as_view(), name="research-topic-id"),
    path("research-topic/", views.ResearchTopicAPIView.as_view(), name="research-topic"),

    path('research-topics/registration/', views.ResearchTopicRegistrationListAPIView.as_view(), name='research-topics-registration'),
    path("research-topic/registration/<int:pk>/", views.ResearchTopicRegistrationAPIView.as_view(), name="research-topic-registration-id"),
    path("research-topic/registration/", views.ResearchTopicRegistrationAPIView.as_view(), name="research-topic-registration"),
]