# matching/tasks.py

from courses.models import Course

def match_courses(user_preferences):
    # Załóżmy, że preferencje użytkownika to słownik z preferencjami
    matched_courses = Course.objects.filter(
        ects_points__gte=user_preferences.get('min_ects', 0),
        duration__lte=user_preferences.get('max_duration', 10)
    )
    return matched_courses
