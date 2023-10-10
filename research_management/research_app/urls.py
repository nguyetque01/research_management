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
    path('academic-profile/<int:pk>/', views.AcademicProfileAPIView.as_view(), name='academic-profile-id'),
    path('academic-profile/', views.AcademicProfileAPIView.as_view(), name='academic-profile'),

    path('academic-years/', views.AcademicYearListAPIView.as_view(), name='academic-years'),
    path('academic-year/<int:pk>/', views.AcademicYearAPIView.as_view(), name='academic-year-id'),
    path('academic-year/', views.AcademicYearAPIView.as_view(), name='academic-year'),

    path('units/', views.UnitListAPIView.as_view(), name='units'),
    path('unit/<int:pk>/', views.UnitAPIView.as_view(), name='unit-id'),
    path('unit/', views.UnitAPIView.as_view(), name='unit'),

    path('lead-units/', views.LeadUnitListAPIView.as_view(), name='lead-units'),
    path('lead-unit/<int:pk>/', views.LeadUnitAPIView.as_view(), name='lead-unit-id'),
    path('lead-unit/', views.LeadUnitAPIView.as_view(), name='lead-unit'),

    path('levels/', views.LevelListAPIView.as_view(), name='levels'),
    path('level/<int:pk>/', views.LevelAPIView.as_view(), name='level-id'),
    path('level/', views.LevelAPIView.as_view(), name='unit'),

    path('research-types/', views.ResearchTypeListAPIView.as_view(), name='research-types'),
    path('research-type/<int:pk>/', views.ResearchTypeAPIView.as_view(), name='research-type-id'),
    path('research-type/', views.ResearchTypeAPIView.as_view(), name='unit'),

    path('research-activities/', views.ResearchActivityListAPIView.as_view(), name='research-activities'),
    path('research-activity/<int:pk>/', views.ResearchActivityAPIView.as_view(), name='research-activity-id'),
    path('research-activity/', views.ResearchActivityAPIView.as_view(), name='research-activity'),

    path('research-activity-categories/', views.ResearchActivityCategoryListAPIView.as_view(), name='research-activity-categories'),
    path('research-activity-category/<int:pk>/', views.ResearchActivityCategoryAPIView.as_view(), name='research-activity-category-id'),
    path('research-activity-category/', views.ResearchActivityCategoryAPIView.as_view(), name='research-activity-category'),

    path('research-activity-details/', views.ResearchActivityDetailListAPIView.as_view(), name='research-activity-details'),
    path('research-activity-detail/<int:pk>/', views.ResearchActivityDetailAPIView.as_view(), name='research-activity-detail-id'),
    path('research-activity-detail/', views.ResearchActivityDetailAPIView.as_view(), name='research-activity-detail'),

    path('research-topics/', views.ResearchTopicListAPIView.as_view(), name='research-topics'),
    path('research-topic/<int:pk>/', views.ResearchTopicAPIView.as_view(), name='research-topic-id'),
    path('research-topic/', views.ResearchTopicAPIView.as_view(), name='research-topic'),

    path('research-topic-registrations/', views.ResearchTopicRegistrationListAPIView.as_view(), name='research-topic-registrations'),
    path('research-topic-registration/<int:pk>/', views.ResearchTopicRegistrationAPIView.as_view(), name='research-topic-registration-id'),
    path('research-topic-registration/', views.ResearchTopicRegistrationAPIView.as_view(), name='research-topic-registration'),
    
    path('research-topic-submissions/', views.ResearchTopicSubmissionListAPIView.as_view(), name='research-topic-submissions'),
    path('research-topic-submission/<int:pk>/', views.ResearchTopicSubmissionAPIView.as_view(), name='research-topic-submission-id'),
    path('research-topic-submission/', views.ResearchTopicSubmissionAPIView.as_view(), name='research-topic-submission'),

    path('research-resources/', views.ResearchResourceListAPIView.as_view(), name='research-resources'),
    path('research-resource/<int:pk>/', views.ResearchResourceAPIView.as_view(), name='research-resource-id'),
    path('research-resource/', views.ResearchResourceAPIView.as_view(), name='research-resource'),

    path('articles/', views.ArticleListAPIView.as_view(), name='articles'),
    path('article/<int:pk>/', views.ArticleAPIView.as_view(), name='article-id'),
    path('article/', views.ArticleAPIView.as_view(), name='article'),

    path('technology-transfer-projects/', views.TechnologyTransferProjectListAPIView.as_view(), name='technology-transfer-projects'),
    path('technology-transfer-project/<int:pk>/', views.TechnologyTransferProjectAPIView.as_view(), name='technology-transfer-project-id'),
    path('technology-transfer-project/', views.TechnologyTransferProjectAPIView.as_view(), name='technology-transfer-project'),

    path('published-books/', views.PublishedBookListAPIView.as_view(), name='published-books'),
    path('published-book/<int:pk>/', views.PublishedBookAPIView.as_view(), name='published-book-id'),
    path('published-book/', views.PublishedBookAPIView.as_view(), name='published-book'),

    path('research-awards/', views.ResearchAwardListAPIView.as_view(), name='research-awards'),
    path('research-award/<int:pk>/', views.ResearchAwardAPIView.as_view(), name='research-award-id'),
    path('research-award/', views.ResearchAwardAPIView.as_view(), name='research-award'),

    path('api/upload_pdf/', views.UploadPDFView.as_view(), name='upload_pdf'),
]