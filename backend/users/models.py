from django.contrib.auth.models import AbstractUser
from django.db import models
from courses.models import Course

class User(AbstractUser):
    # Dodatkowe pola dla użytkownika, jeśli potrzebne
    pass

class Review(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    course = models.ForeignKey(Course, on_delete=models.CASCADE)
    rating = models.IntegerField()  # Np. ocena 1-5
    comment = models.TextField()

    def __str__(self):
        return f"{self.user.username} - {self.course.name} - {self.rating}/5"
