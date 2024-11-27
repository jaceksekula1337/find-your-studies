# courses/models.py

from django.db import models
from django.contrib.auth.models import User
class Course(models.Model):
    course_uuid = models.UUIDField(unique=True)  # Unikalny identyfikator kursu
    course_name = models.CharField(max_length=255)  # Nazwa kierunku
    leading_institution_name = models.CharField(max_length=255)  # Instytucja prowadząca
    level_name = models.CharField(max_length=100)  # Poziom studiów (np. pierwszego stopnia, drugiego stopnia)
    institution_kind = models.CharField(max_length=100, null=True, blank=True)  # Rodzaj uczelni (publiczna/prywatna)
    city = models.CharField(max_length=255, null=True, blank=True)  # Miasto
    voivodeship = models.CharField(max_length=255, null=True, blank=True)  # Województwo
    current_status_name = models.CharField(max_length=255, null=True, blank=True)  # Status kierunku (np. "prowadzone")

    
    def __str__(self):
        return f"{self.course_name} - {self.leading_institution_name}"
# Kategorie cech
class Category(models.Model):
    name = models.CharField(max_length=255)  # Nazwa kategorii (np. "Umiejętności", "Zainteresowania", "Relacje międzyludzkie")

    def __str__(self):
        return self.name


# Cechy (np. otwartość, analityczność)
class Feature(models.Model):
    name = models.CharField(max_length=255)  # Nazwa cechy (np. "otwartość", "analityczność")
    category = models.ForeignKey(Category, on_delete=models.CASCADE)  # Powiązanie cechy z kategorią

    def __str__(self):
        return self.name


# Przypisanie punktów do cech na kierunku
class CourseFeatureScore(models.Model):
    course = models.ForeignKey(Course, on_delete=models.CASCADE)  # Powiązanie z kursem
    feature = models.ForeignKey(Feature, on_delete=models.CASCADE)  # Powiązanie z cechą
    points = models.IntegerField()  # Punkty dla cechy (np. 0, 1, 2)

    def __str__(self):
        return f"{self.course.course_name} - {self.feature.name}: {self.points}"


# Odpowiedzi użytkownika
class UserQuizAnswer(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)  # Użytkownik
    feature = models.ForeignKey(Feature, on_delete=models.CASCADE)  # Cecha, na którą odpowiada
    answer = models.IntegerField()  # Odpowiedź użytkownika (0, 1, 2)

    def __str__(self):
        return f"{self.user.username} - {self.feature.name}: {self.answer}"