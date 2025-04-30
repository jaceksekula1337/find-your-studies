from django.db import models
from django.contrib.auth.models import User

class Course(models.Model):
    course_uuid = models.UUIDField(unique=True)
    course_name = models.CharField(max_length=255)
    leading_institution_name = models.CharField(max_length=255)
    level_name = models.CharField(max_length=100)
    institution_kind = models.CharField(max_length=100, null=True, blank=True)
    city = models.CharField(max_length=255, null=True, blank=True)
    voivodeship = models.CharField(max_length=255, null=True, blank=True)
    current_status_name = models.CharField(max_length=255, null=True, blank=True)

    def __str__(self):
        return f"{self.course_name} - {self.leading_institution_name}"


class Question(models.Model):
    identifier = models.CharField(max_length=50, unique=True, null=True, blank=True)  # <- zmiana
    text = models.TextField()
    category = models.CharField(max_length=20)

    def __str__(self):
        return f"{self.identifier} - {self.category}"


class CourseQuestionScore(models.Model):
    course = models.ForeignKey(Course, on_delete=models.CASCADE)
    question = models.ForeignKey(Question, on_delete=models.CASCADE)
    score = models.IntegerField()

    def __str__(self):
        return f"{self.course.course_name} - {self.question.identifier} - {self.score}"
