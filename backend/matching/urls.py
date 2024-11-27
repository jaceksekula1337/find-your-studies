from django.urls import path
from . import views

urlpatterns = [
    path('course-recommendations/', views.get_course_recommendations, name='course_recommendations'),
]
