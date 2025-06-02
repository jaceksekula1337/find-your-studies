from django.urls import path
from . import views
from .views import SubmitFeedbackView
urlpatterns = [
    path('course-recommendations/', views.get_course_recommendations, name='course_recommendations'),
    path("submit-feedback/", SubmitFeedbackView.as_view(), name="submit-feedback"),
]
