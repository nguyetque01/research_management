from django.urls import path
from . import views

urlpatterns = [
    path('register/', views.RegistrationAPIView.as_view(), name='register'),
    path('login/', views.LoginAPIView.as_view(), name='login'),
    path('user-profile/', views.UserProfileView.as_view(), name='user-profile'),
    path('update-profile/', views.UserProfileUpdateView.as_view(), name='user-profile-update'),

    path('users/', views.UserListAPIView.as_view(), name='users'),
    path('user/<int:pk>/', views.UserAPIView.as_view(), name='user-id'),
    path('user/', views.UserAPIView.as_view(), name='user'),
    path('users/<int:pk>/toggle-active/', views.UserToggleActiveView.as_view(), name='toggle-active'),

    path('categories/', views.CategoryListAPIView.as_view(), name='categories'),
    path("category/<int:pk>/", views.CategoryAPIView.as_view(), name="category-id"),
    path("category/", views.CategoryAPIView.as_view(), name="category"),

    path('research-topics/', views.ResearchTopicListAPIView.as_view(), name='research-topics'),
    path("research-topic/<int:pk>/", views.ResearchTopicAPIView.as_view(), name="research-topic-id"),
    path("research-topic/", views.ResearchTopicAPIView.as_view(), name="research-topic"),
]