import requests
from django.utils import timezone
from courses.models import Course, Question, CourseQuestionScore

# Dodanie pytań Big Five
def add_big5_questions():
    questions_data = [
        # OPENNESS
        ("O_try_new_things", "Lubię próbować nowych rzeczy.", "openness"),
        ("O_art_culture", "Interesuję się sztuką i kulturą.", "openness"),
        ("O_creative_thinking", "Lubię myśleć w nieszablonowy sposób.", "openness"),

        # CONSCIENTIOUSNESS
        ("C_task_completion", "Zawsze kończę rozpoczęte zadania.", "conscientiousness"),
        ("C_organized", "Jestem dobrze zorganizowany/a.", "conscientiousness"),
        ("C_time_management", "Potrafię zarządzać swoim czasem efektywnie.", "conscientiousness"),

        # EXTRAVERSION
        ("E_attention_seeker", "Lubię być w centrum uwagi.", "extraversion"),
        ("E_social_energy", "Czerpię energię z kontaktów z ludźmi.", "extraversion"),
        ("E_teamwork", "Lubię pracę zespołową.", "extraversion"),

        # AGREEABLENESS
        ("A_helping_others", "Pomaganie innym sprawia mi radość.", "agreeableness"),
        ("A_easy_connecting", "Łatwo nawiązuję kontakt z innymi ludźmi.", "agreeableness"),
        ("A_forgiving", "Jestem wyrozumiały/a wobec błędów innych.", "agreeableness"),

        # NEUROTICISM
        ("N_stress_prone", "Często się stresuję.", "neuroticism"),
        ("N_unwarranted_worry", "Zdarza mi się martwić bez powodu.", "neuroticism"),
        ("N_low_resilience", "Mam problemy z utrzymaniem spokoju w trudnych sytuacjach.", "neuroticism"),
    ]

    for identifier, text, category in questions_data:
        Question.objects.update_or_create(
            identifier=identifier,
            defaults={"text": text, "category": category}
        )
    print("✅ Dodano pytania Big Five do bazy.")

# Przypisanie punktów do pytań względem kierunków
def assign_question_scores():
    question_scores_data = {
        "fd3ea9ae-3af8-4c66-af9a-7337b8436645": {  # Podistria
            "O_try_new_things": 2,
            "O_art_culture": 2,
            "O_creative_thinking": 2,
            "C_task_completion": 1,
            "C_organized": 0,
            "C_time_management": 1,
            "E_attention_seeker": 1,
            "E_social_energy": 2,
            "E_teamwork": 2,
            "A_helping_others": 2,
            "A_easy_connecting": 2,
            "A_forgiving": 1,
            "N_stress_prone": 1,
            "N_unwarranted_worry": 1,
            "N_low_resilience": 1,
        },
        "05a709a0-6f7f-420c-963f-6d51c9f0aa21": {  # Architektura
            "O_try_new_things": 2,
            "O_art_culture": 2,
            "O_creative_thinking": 2,
            "C_task_completion": 2,
            "C_organized": 2,
            "C_time_management": 1,
            "E_attention_seeker": 1,
            "E_social_energy": 1,
            "E_teamwork": 1,
            "A_helping_others": 0,
            "A_easy_connecting": 0,
            "A_forgiving": 1,
            "N_stress_prone": 1,
            "N_unwarranted_worry": 1,
            "N_low_resilience": 2,
        },
        "6c534c56-9c5f-4e5f-9aab-04c295ed9352": {  # Administracja
            "O_try_new_things": 1,
            "O_art_culture": 1,
            "O_creative_thinking": 1,
            "C_task_completion": 2,
            "C_organized": 2,
            "C_time_management": 2,
            "E_attention_seeker": 1,
            "E_social_energy": 2,
            "E_teamwork": 2,
            "A_helping_others": 2,
            "A_easy_connecting": 2,
            "A_forgiving": 2,
            "N_stress_prone": 1,
            "N_unwarranted_worry": 1,
            "N_low_resilience": 1,
        },
    }

    for course_uuid, question_data in question_scores_data.items():
        course = Course.objects.filter(course_uuid=course_uuid).first()
        if not course:
            print(f"⛔ Kurs {course_uuid} nie znaleziony.")
            continue

        for identifier, score in question_data.items():
            question = Question.objects.filter(identifier=identifier).first()
            if not question:
                print(f"⚠️ Pytanie {identifier} nie znalezione.")
                continue

            CourseQuestionScore.objects.update_or_create(
                course=course,
                question=question,
                defaults={"score": score}
            )
    print("✅ Przypisano dopasowania pytań do kierunków.")

# Pobranie kursów z API
API_URL = 'https://radon.nauka.gov.pl/opendata/polon/courses?resultNumbers=100'

def fetch_courses():
    token = None
    while True:
        params = {'resultNumbers': 100}
        if token:
            params['token'] = token

        response = requests.get(API_URL, params=params)

        if response.status_code != 200:
            print(f"⛔ Błąd przy pobieraniu danych: {response.status_code}")
            break

        data = response.json()

        for item in data.get('results', []):
            is_active = item.get('currentStatusName') == 'prowadzone'
            Course.objects.update_or_create(
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
    print("✅ Zaktualizowano listę kursów.")
