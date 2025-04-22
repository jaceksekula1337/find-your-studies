import requests
from .models import Course
from django.utils import timezone
from courses.models import Course, Feature, CourseFeatureScore, Category


categories_features = {
    "Technical Skills": ["Analytical Thinking", "Technology", "Precision"],
    "Creativity and Arts": ["Creativity", "Art", "Language Skills"],
    "Social Interaction": ["Empathy", "Communication Skills", "Social Knowledge", "Openness to Others"],
    "Personal Traits": ["Independence", "Critical Thinking", "Stress Resilience", "Entrepreneurship", "Teamwork Skills"]
}

def add_categories_and_features():
    for category_name, features in categories_features.items():
        category, created = Category.objects.get_or_create(name=category_name)
        for feature_name in features:
            Feature.objects.get_or_create(name=feature_name, category=category)



from courses.models import Course, Feature, CourseFeatureScore

def assign_feature_scores():
    # Dane wejściowe: UUID kursów oraz przypisane punkty do cech
    course_features_data = {
        "fd3ea9ae-3af8-4c66-af9a-7337b8436645": {  # Podistria
            "Analytical Thinking": 0,
            "Technology": 0,
            "Precision": 1,
            "Creativity": 2,
            "Art": 1,
            "Language Skills": 2,
            "Empathy": 2,
            "Communication Skills": 2,
            "Social Knowledge": 1,
            "Openness to Others": 2,
            "Independence": 1,
            "Critical Thinking": 0,
            "Stress Resilience": 1,
            "Entrepreneurship": 1,
            "Teamwork Skills": 1,
        },
        "05a709a0-6f7f-420c-963f-6d51c9f0aa21": {  # Architektura
            "Analytical Thinking": 2,
            "Technology": 2,
            "Precision": 2,
            "Creativity": 2,
            "Art": 1,
            "Language Skills": 0,
            "Empathy": 0,
            "Communication Skills": 1,
            "Social Knowledge": 0,
            "Openness to Others": 1,
            "Independence": 1,
            "Critical Thinking": 1,
            "Stress Resilience": 2,
            "Entrepreneurship": 1,
            "Teamwork Skills": 1,
        },
        "6c534c56-9c5f-4e5f-9aab-04c295ed9352": {  # Administracja
            "Analytical Thinking": 2,
            "Technology": 1,
            "Precision": 1,
            "Creativity": 1,
            "Art": 0,
            "Language Skills": 2,
            "Empathy": 1,
            "Communication Skills": 2,
            "Social Knowledge": 2,
            "Openness to Others": 1,
            "Independence": 1,
            "Critical Thinking": 2,
            "Stress Resilience": 1,
            "Entrepreneurship": 1,
            "Teamwork Skills": 2,
        }
    }

    for course_uuid, features in course_features_data.items():
        try:
            course = Course.objects.get(course_uuid=course_uuid)  # Pobieramy kurs na podstawie UUID
            for feature_name, points in features.items():
                feature = Feature.objects.filter(name=feature_name).first()  # Pobieramy cechę
                if feature:
                    CourseFeatureScore.objects.update_or_create(
                        course=course,
                        feature=feature,
                        defaults={'points': points}
                    )
                else:
                    print(f"Cechy '{feature_name}' nie znaleziono w bazie danych.")
            print(f"Punkty dla kursu o UUID '{course_uuid}' zostały przypisane.")
        except Course.DoesNotExist:
            print(f"Kurs o UUID '{course_uuid}' nie istnieje w bazie danych.")


API_URL = 'https://radon.nauka.gov.pl/opendata/polon/courses?resultNumbers=100'

def fetch_courses():
    token = None
    while True:
        params = {'resultNumbers': 100}
        if token:
            params['token'] = token

        response = requests.get(API_URL, params=params)

        if response.status_code != 200:
            print(f"Błąd przy pobieraniu danych: {response.status_code}")
            break

        data = response.json()

        for item in data.get('results', []):
            is_active = item.get('currentStatusName') == 'prowadzone'
            course, created = Course.objects.update_or_create(
                course_uuid=item.get('courseUuid'),
                    defaults={
                        'course_name': item.get('courseName', ''),
                        'leading_institution_name': item.get('leadingInstitutionName', ''),
                        'level_name': item.get('levelName', ''),
                        'institution_kind': item.get('mainInstitutionKind', ''),
                        'city': item.get('leadingInstitutionCity', ''),
                        'voivodeship': item.get('leadingInstitutionVoivodeship', ''),
                        'current_status_name': item.get('currentStatusName', ''),
                    }
            )

        token = data.get('token')
        if not token:
            break
