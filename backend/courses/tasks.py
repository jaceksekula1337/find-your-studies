import requests
from django.utils import timezone
from courses.models import Course, Question

# Dodanie pytań Big Five
def add_big5_questions():
    questions_data = [
        # EXTRAVERSION
        ("E_life_party", "I am the life of the party.", "extraversion", False),
        ("E_dont_talk", "I don’t talk a lot.", "extraversion", True),
        ("E_party_talker", "I talk to a lot of different people at parties.", "extraversion", False),
        ("E_background", "I keep in the background.", "extraversion", True),

        # AGREEABLENESS
        ("A_sympathize", "I sympathize with others’ feelings.", "agreeableness", False),
        ("A_not_interested", "I am not interested in other people’s problems.", "agreeableness", True),
        ("A_feel_emotions", "I feel others’ emotions.", "agreeableness", False),
        ("A_dont_care", "I am not really interested in others.", "agreeableness", True),

        # CONSCIENTIOUSNESS
        ("C_chores_done", "I get chores done right away.", "conscientiousness", False),
        ("C_forget_stuff", "I often forget to put things back in their proper place.", "conscientiousness", True),
        ("C_order", "I like order.", "conscientiousness", False),
        ("C_mess", "I make a mess of things.", "conscientiousness", True),

        # NEUROTICISM
        ("N_mood_swings", "I have frequent mood swings.", "neuroticism", False),
        ("N_relaxed", "I am relaxed most of the time.", "neuroticism", True),
        ("N_upset", "I get upset easily.", "neuroticism", False),
        ("N_seldom_blue", "I seldom feel blue.", "neuroticism", True),

        # OPENNESS
        ("O_imagination", "I have a vivid imagination.", "openness", False),
        ("O_no_abstract", "I am not interested in abstract ideas.", "openness", True),
        ("O_difficulty_abstract", "I have difficulty understanding abstract ideas.", "openness", True),
        ("O_no_imagination", "I do not have a good imagination.", "openness", True),
    ]

    for ident, text, cat, rev in questions_data:
        Question.objects.update_or_create(
            identifier=ident,
            defaults={"text": text, "category": cat, "reverse_scored": rev}
        )

    print("✅ Dodano nowe pytania Mini-IPIP.")

from courses.models import Course, CourseTraitProfile
from uuid import UUID

def seed_course_trait_profiles():
    data = [
        {
            "uuid": "11",  # Informatyka (II st.)
            "traits": {"openness": 4.5, "conscientiousness": 4.2, "extraversion": 2.5, "agreeableness": 3.0, "neuroticism": 2.0},
        },
        {
            "uuid": "24",  # Informatyka (I st.)
            "traits": {"openness": 4.4, "conscientiousness": 4.0, "extraversion": 2.8, "agreeableness": 3.2, "neuroticism": 2.2},
        },
        {
            "uuid": "28",  # Psychologia
            "traits": {"openness": 4.7, "conscientiousness": 3.8, "extraversion": 3.6, "agreeableness": 4.4, "neuroticism": 3.9},
        },
        {
            "uuid": "25",  # Kierunek lekarski
            "traits": {"openness": 4.0, "conscientiousness": 4.7, "extraversion": 3.5, "agreeableness": 4.3, "neuroticism": 3.1},
        },
        {
            "uuid": "9",  # Grafika
            "traits": {"openness": 4.9, "conscientiousness": 3.3, "extraversion": 3.8, "agreeableness": 3.5, "neuroticism": 3.0},
        },
        {
            "uuid": "17",  # Ekonomia
            "traits": {"openness": 3.8, "conscientiousness": 4.1, "extraversion": 3.4, "agreeableness": 3.2, "neuroticism": 2.9},
        },
        {
            "uuid": "74",  # Informatyka w biznesie
            "traits": {"openness": 4.3, "conscientiousness": 4.0, "extraversion": 3.0, "agreeableness": 3.1, "neuroticism": 2.5},
        },
        {
            "uuid": "57",  # Dziennikarstwo
            "traits": {"openness": 4.6, "conscientiousness": 3.7, "extraversion": 4.5, "agreeableness": 3.9, "neuroticism": 3.3},
        },
        {
            "uuid": "26",  # Energetyka
            "traits": {"openness": 3.9, "conscientiousness": 4.2, "extraversion": 2.9, "agreeableness": 3.0, "neuroticism": 2.4},
        },
        {
            "uuid": "50",  # Finanse i rachunkowość
            "traits": {"openness": 3.6, "conscientiousness": 4.5, "extraversion": 3.2, "agreeableness": 3.1, "neuroticism": 2.7},
        },
    ]

    created = 0
    for entry in data:
        try:
            course = Course.objects.get(id=int(entry["uuid"]))
            if not hasattr(course, "trait_profile"):
                CourseTraitProfile.objects.create(
                    course=course,
                    **entry["traits"]
                )
                created += 1
        except Course.DoesNotExist:
            print(f"⚠️ Nie znaleziono kierunku ID: {entry['uuid']}")
        except Exception as e:
            print(f"❌ Błąd przy ID {entry['uuid']}: {e}")

    print(f"✅ Dodano {created} profili kierunków.")

# # Przypisanie punktów do pytań względem kierunków
# def assign_question_scores():
#     question_scores_data = {
#         "fd3ea9ae-3af8-4c66-af9a-7337b8436645": {  # Podistria
#             "O_try_new_things": 2,
#             "O_art_culture": 2,
#             "O_creative_thinking": 2,
#             "C_task_completion": 1,
#             "C_organized": 0,
#             "C_time_management": 1,
#             "E_attention_seeker": 1,
#             "E_social_energy": 2,
#             "E_teamwork": 2,
#             "A_helping_others": 2,
#             "A_easy_connecting": 2,
#             "A_forgiving": 1,
#             "N_stress_prone": 1,
#             "N_unwarranted_worry": 1,
#             "N_low_resilience": 1,
#         },
#         "05a709a0-6f7f-420c-963f-6d51c9f0aa21": {  # Architektura
#             "O_try_new_things": 2,
#             "O_art_culture": 2,
#             "O_creative_thinking": 2,
#             "C_task_completion": 2,
#             "C_organized": 2,
#             "C_time_management": 1,
#             "E_attention_seeker": 1,
#             "E_social_energy": 1,
#             "E_teamwork": 1,
#             "A_helping_others": 0,
#             "A_easy_connecting": 0,
#             "A_forgiving": 1,
#             "N_stress_prone": 1,
#             "N_unwarranted_worry": 1,
#             "N_low_resilience": 2,
#         },
#         "6c534c56-9c5f-4e5f-9aab-04c295ed9352": {  # Administracja
#             "O_try_new_things": 1,
#             "O_art_culture": 1,
#             "O_creative_thinking": 1,
#             "C_task_completion": 2,
#             "C_organized": 2,
#             "C_time_management": 2,
#             "E_attention_seeker": 1,
#             "E_social_energy": 2,
#             "E_teamwork": 2,
#             "A_helping_others": 2,
#             "A_easy_connecting": 2,
#             "A_forgiving": 2,
#             "N_stress_prone": 1,
#             "N_unwarranted_worry": 1,
#             "N_low_resilience": 1,
#         },
#     }

#     for course_uuid, question_data in question_scores_data.items():
#         course = Course.objects.filter(course_uuid=course_uuid).first()
#         if not course:
#             print(f"⛔ Kurs {course_uuid} nie znaleziony.")
#             continue

#         for identifier, score in question_data.items():
#             question = Question.objects.filter(identifier=identifier).first()
#             if not question:
#                 print(f"⚠️ Pytanie {identifier} nie znalezione.")
#                 continue

#             CourseQuestionScore.objects.update_or_create(
#                 course=course,
#                 question=question,
#                 defaults={"score": score}
#             )
#     print("✅ Przypisano dopasowania pytań do kierunków.")

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
