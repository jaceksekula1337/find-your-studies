# courses/models.py

from django.db import models

class Course(models.Model):
    course_uuid = models.UUIDField(unique=True)  # Unikalny identyfikator kursu
    course_name = models.CharField(max_length=255)  # Nazwa kursu
    leading_institution_name = models.CharField(max_length=255)  # Instytucja prowadząca
    level_name = models.CharField(max_length=100)  # Poziom studiów

    def __str__(self):
        return self.course_name
