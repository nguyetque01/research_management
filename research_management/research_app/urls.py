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

    path('academic-profiles/', views.AcademicProfileListAPIView.as_view(), name='academic-profiles'),
    path("academic-profile/<int:pk>/", views.AcademicProfileAPIView.as_view(), name="academic-profile-id"),
    path("academic-profile/", views.AcademicProfileAPIView.as_view(), name="academic-profile"),

    path('academic-years/', views.AcademicYearListAPIView.as_view(), name='academic-years'),
    path("academic-year/<int:pk>/", views.AcademicYearAPIView.as_view(), name="academic-year-id"),
    path("academic-year/", views.AcademicYearAPIView.as_view(), name="academic-year"),

    path('units/', views.UnitListAPIView.as_view(), name='units'),
    path("unit/<int:pk>/", views.UnitAPIView.as_view(), name="unit-id"),
    path("unit/", views.UnitAPIView.as_view(), name="unit"),

    path('lead-units/', views.LeadUnitListAPIView.as_view(), name='lead-units'),
    path("lead-unit/<int:pk>/", views.LeadUnitAPIView.as_view(), name="lead-unit-id"),
    path("lead-unit/", views.LeadUnitAPIView.as_view(), name="lead-unit"),

    path('levels/', views.LevelListAPIView.as_view(), name='levels'),
    path("level/<int:pk>/", views.LevelAPIView.as_view(), name="level-id"),
    path("level/", views.LevelAPIView.as_view(), name="unit"),

    path('research-types/', views.ResearchTypeListAPIView.as_view(), name='research-types'),
    path("research-type/<int:pk>/", views.ResearchTypeAPIView.as_view(), name="research-type-id"),
    path("research-type/", views.ResearchTypeAPIView.as_view(), name="unit"),

    path('research-activities/', views.ResearchActivityListAPIView.as_view(), name='research-activities'),
    path("research-activity/<int:pk>/", views.ResearchActivityAPIView.as_view(), name="research-activity-id"),
    path("research-activity/", views.ResearchActivityAPIView.as_view(), name="research-activity"),

    path('research-activity-categories/', views.ResearchActivityCategoryListAPIView.as_view(), name='research-activity-categories'),
    path("research-activity-category/<int:pk>/", views.ResearchActivityCategoryAPIView.as_view(), name="research-activity-category-id"),
    path("research-activity-category/", views.ResearchActivityCategoryAPIView.as_view(), name="research-activity"),

    path("research-activity-category-by-research-activity/<int:research_activity_id>/", views.ResearchActivityCategoryByResearchActivityAPIView.as_view(), name="research-activity-category-by-research-activity"),

    path('research-topics/', views.ResearchActivityListAPIView.as_view(), name='research-topics'),
    path("research-topic/<int:pk>/", views.ResearchActivityAPIView.as_view(), name="research-topic-id"),
    path("research-topic/", views.ResearchActivityAPIView.as_view(), name="research-topic"),

    path('registration/', views.RegistrationTopicAPIView.as_view(), name='registration'),
]