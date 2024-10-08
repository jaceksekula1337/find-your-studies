import requests
from .models import Course
from django.utils import timezone

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

        # Przetwarzanie wyników
        for item in data.get('results', []):
            # Tylko wybrane dane: courseUuid, courseName, leadingInstitutionName, levelName
            course, created = Course.objects.update_or_create(
                course_uuid=item.get('courseUuid'),
                defaults={
                    'course_name': item.get('courseName', ''),
                    'leading_institution_name': item.get('leadingInstitutionName', ''),
                    'level_name': item.get('levelName', ''),
                }
            )

        # Sprawdzenie, czy jest token do kolejnej strony
        token = data.get('token')
        if not token:
            break
