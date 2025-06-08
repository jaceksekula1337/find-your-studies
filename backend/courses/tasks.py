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
            "uuid": "3",  # Filmoznawstwo i wiedza o nowych mediach (II st.)
            "traits": {"openness": 4.9, "conscientiousness": 2.9, "extraversion": 4.2, "agreeableness": 3.9, "neuroticism": 4.3},
        },
        {
            "uuid": "4",  # Filmoznawstwo i wiedza o nowych mediach (I st.)
            "traits": {"openness": 5.0, "conscientiousness": 2.6, "extraversion": 4.5, "agreeableness": 4.1, "neuroticism": 4.5},
        },
        {
            "uuid": "5",  # Podistria (eksperymentalny/niszowy)
            "traits": {"openness": 4.8, "conscientiousness": 2.5, "extraversion": 3.9, "agreeableness": 3.8, "neuroticism": 4.6},
        },
        {
            "uuid": "6",  # Architektura (I st.)
            "traits": {"openness": 4.6, "conscientiousness": 4.7, "extraversion": 2.7, "agreeableness": 3.1, "neuroticism": 2.5},
        },
        {
            "uuid": "7",  # Administracja (I st.)
            "traits": {"openness": 2.8, "conscientiousness": 4.2, "extraversion": 3.0, "agreeableness": 3.0, "neuroticism": 3.1},
        },
        {
            "uuid": "9",  # Grafika
            "traits": {"openness": 5.0, "conscientiousness": 2.8, "extraversion": 4.0, "agreeableness": 3.4, "neuroticism": 3.9},
        },
        {
            "uuid": "10",  # Mechanika i budowa maszyn (II st.)
            "traits": {"openness": 2.9, "conscientiousness": 4.8, "extraversion": 2.1, "agreeableness": 2.5, "neuroticism": 1.9},
        },
        {
            "uuid": "11",  # Informatyka (II st.)
            "traits": {"openness": 4.5, "conscientiousness": 4.6, "extraversion": 1.8, "agreeableness": 2.6, "neuroticism": 2.1},
        },
        {
            "uuid": "12",  # Inżynieria danych
            "traits": {"openness": 4.3, "conscientiousness": 4.7, "extraversion": 1.9, "agreeableness": 2.7, "neuroticism": 2.2},
        },
        {
            "uuid": "13",  # Zarządzanie (I st.)
            "traits": {"openness": 3.5, "conscientiousness": 4.0, "extraversion": 3.8, "agreeableness": 3.3, "neuroticism": 3.0},
        },
        {
            "uuid": "15",  # Filologia polska jako obca
            "traits": {"openness": 4.6, "conscientiousness": 3.6, "extraversion": 3.6, "agreeableness": 4.2, "neuroticism": 3.6},
        },
        {
            "uuid": "16",  # Coaching stylu życia
            "traits": {"openness": 4.7, "conscientiousness": 3.8, "extraversion": 4.7, "agreeableness": 4.5, "neuroticism": 4.2},
        },
        {
            "uuid": "17",  # Ekonomia
            "traits": {"openness": 3.6, "conscientiousness": 4.3, "extraversion": 3.5, "agreeableness": 3.0, "neuroticism": 2.8},
        },
        {
            "uuid": "18",  # Położnictwo
            "traits": {"openness": 3.5, "conscientiousness": 4.6, "extraversion": 3.2, "agreeableness": 4.7, "neuroticism": 3.7},
        },
        {
            "uuid": "19",  # Architektura (jednolite magisterskie)
            "traits": {"openness": 4.8, "conscientiousness": 4.7, "extraversion": 2.5, "agreeableness": 3.2, "neuroticism": 2.6},
        },
        {
            "uuid": "20",  # Dietetyka
            "traits": {"openness": 3.8, "conscientiousness": 4.4, "extraversion": 3.5, "agreeableness": 4.4, "neuroticism": 3.3},
        },
        {
            "uuid": "21",  # Orientalistyka - egiptologia
            "traits": {"openness": 4.9, "conscientiousness": 4.2, "extraversion": 2.2, "agreeableness": 3.8, "neuroticism": 3.5},
        },
        {
            "uuid": "22",  # Inżynieria mechaniczna
            "traits": {"openness": 3.2, "conscientiousness": 4.8, "extraversion": 2.3, "agreeableness": 2.9, "neuroticism": 2.0},
        },
        {
            "uuid": "23",  # Matematyka
            "traits": {"openness": 4.2, "conscientiousness": 4.9, "extraversion": 1.9, "agreeableness": 2.8, "neuroticism": 1.8},
        },
        {
            "uuid": "24",  # Informatyka (I st.)
            "traits": {"openness": 4.4, "conscientiousness": 4.0, "extraversion": 2.8, "agreeableness": 3.2, "neuroticism": 2.2},
        },
        {
            "uuid": "25",  # Kierunek lekarski
            "traits": {"openness": 4.0, "conscientiousness": 4.7, "extraversion": 3.5, "agreeableness": 4.3, "neuroticism": 3.1},
        },
        {
            "uuid": "26",  # Energetyka
            "traits": {"openness": 3.9, "conscientiousness": 4.2, "extraversion": 2.9, "agreeableness": 3.0, "neuroticism": 2.4},
        },
        {
            "uuid": "27",  # Pedagogika (rozporządzenie)
            "traits": {"openness": 3.7, "conscientiousness": 4.3, "extraversion": 3.6, "agreeableness": 4.5, "neuroticism": 3.6},
        },
        {
            "uuid": "28",  # Psychologia (j.m.)
            "traits": {"openness": 4.7, "conscientiousness": 3.8, "extraversion": 3.6, "agreeableness": 4.4, "neuroticism": 3.9},
        },
        {
            "uuid": "29",  # Bezpieczeństwo międzynarodowe i dyplomacja
            "traits": {"openness": 4.3, "conscientiousness": 4.4, "extraversion": 4.1, "agreeableness": 3.6, "neuroticism": 3.0},
        },
        {
            "uuid": "30",  # Pedagogika (II st.)
            "traits": {"openness": 4.1, "conscientiousness": 4.3, "extraversion": 3.4, "agreeableness": 4.6, "neuroticism": 3.4},
        },
        {
            "uuid": "31",  # Informatyka (I st.)
            "traits": {"openness": 4.3, "conscientiousness": 4.1, "extraversion": 2.6, "agreeableness": 3.1, "neuroticism": 2.3},
        },
        {
            "uuid": "32",  # Sport
            "traits": {"openness": 3.3, "conscientiousness": 4.2, "extraversion": 4.6, "agreeableness": 3.8, "neuroticism": 2.7},
        },
        {
            "uuid": "33",  # Zarządzanie (I st.)
            "traits": {"openness": 3.8, "conscientiousness": 4.0, "extraversion": 4.0, "agreeableness": 3.3, "neuroticism": 2.9},
        },
        {
            "uuid": "34",  # Pedagogika przedszkolna i wczesnoszkolna (j.m.)
            "traits": {"openness": 3.9, "conscientiousness": 4.5, "extraversion": 4.2, "agreeableness": 4.8, "neuroticism": 3.3},
        },
        {
            "uuid": "35",  # Dziedzictwo kulturowe i przyrodnicze
            "traits": {"openness": 4.6, "conscientiousness": 3.7, "extraversion": 3.4, "agreeableness": 3.9, "neuroticism": 3.5},
        },
        {
            "uuid": "36",  # Informatyka (II st.)
            "traits": {"openness": 4.5, "conscientiousness": 4.2, "extraversion": 2.5, "agreeableness": 3.0, "neuroticism": 2.1},
        },
        {
            "uuid": "37",  # Pielęgniarstwo (II st.)
            "traits": {"openness": 3.5, "conscientiousness": 4.8, "extraversion": 3.0, "agreeableness": 4.6, "neuroticism": 3.2},
        },
        {
            "uuid": "38",  # Pedagogika (I st.)
            "traits": {"openness": 3.7, "conscientiousness": 4.2, "extraversion": 3.3, "agreeableness": 4.5, "neuroticism": 3.5},
        },
        {
            "uuid": "39",  # Zarządzanie (II st.)
            "traits": {"openness": 3.9, "conscientiousness": 4.1, "extraversion": 3.8, "agreeableness": 3.5, "neuroticism": 2.8},
        },
        {
            "uuid": "40",  # Mechatronika
            "traits": {"openness": 4.2, "conscientiousness": 4.5, "extraversion": 2.4, "agreeableness": 3.0, "neuroticism": 2.2},
        },
          {
            "uuid": "41",  # Druk 3D Materiałów Metalicznych
            "traits": {"openness": 4.1, "conscientiousness": 4.7, "extraversion": 2.0, "agreeableness": 2.9, "neuroticism": 1.7},
        },
        {
            "uuid": "42",  # Zarządzanie (I st.)
            "traits": {"openness": 3.6, "conscientiousness": 4.0, "extraversion": 3.9, "agreeableness": 3.2, "neuroticism": 2.7},
        },
        {
            "uuid": "43",  # Pedagogika (II st.)
            "traits": {"openness": 3.9, "conscientiousness": 4.4, "extraversion": 3.3, "agreeableness": 4.5, "neuroticism": 3.4},
        },
        {
            "uuid": "44",  # Administracja (II st.)
            "traits": {"openness": 3.1, "conscientiousness": 4.3, "extraversion": 2.9, "agreeableness": 3.0, "neuroticism": 3.0},
        },
        {
            "uuid": "45",  # Administracja (I st.)
            "traits": {"openness": 2.9, "conscientiousness": 4.0, "extraversion": 3.1, "agreeableness": 3.2, "neuroticism": 2.8},
        },
        {
            "uuid": "46",  # Dietetyka (II st.)
            "traits": {"openness": 4.0, "conscientiousness": 4.5, "extraversion": 3.4, "agreeableness": 4.3, "neuroticism": 3.1},
        },
        {
            "uuid": "47",  # Ekonomia (I st.)
            "traits": {"openness": 3.6, "conscientiousness": 4.2, "extraversion": 3.3, "agreeableness": 3.1, "neuroticism": 2.6},
        },
        {
            "uuid": "48",  # Pedagogika (I st.)
            "traits": {"openness": 3.8, "conscientiousness": 4.1, "extraversion": 3.2, "agreeableness": 4.6, "neuroticism": 3.3},
        },
        {
            "uuid": "49",  # Zarządzanie (II st.)
            "traits": {"openness": 3.7, "conscientiousness": 4.0, "extraversion": 3.6, "agreeableness": 3.4, "neuroticism": 2.7},
        },
        {
            "uuid": "50",  # Finanse i rachunkowość
            "traits": {"openness": 3.6, "conscientiousness": 4.5, "extraversion": 3.2, "agreeableness": 3.1, "neuroticism": 2.7},
        },
        {
            "uuid": "51",  # Transport
            "traits": {"openness": 3.4, "conscientiousness": 4.3, "extraversion": 2.8, "agreeableness": 3.0, "neuroticism": 2.4},
        },
        {
            "uuid": "52",  # Inżynieria materiałowa
            "traits": {"openness": 3.9, "conscientiousness": 4.6, "extraversion": 2.5, "agreeableness": 2.9, "neuroticism": 2.1},
        },
        {
            "uuid": "53",  # Administracja (I st.)
            "traits": {"openness": 3.0, "conscientiousness": 4.1, "extraversion": 3.0, "agreeableness": 3.1, "neuroticism": 2.9},
        },
        {
            "uuid": "54",  # Biotechnologia (II st.)
            "traits": {"openness": 4.4, "conscientiousness": 4.7, "extraversion": 2.7, "agreeableness": 3.3, "neuroticism": 2.6},
        },
        {
            "uuid": "55",  # Pielęgniarstwo (I st.)
            "traits": {"openness": 3.4, "conscientiousness": 4.6, "extraversion": 3.0, "agreeableness": 4.7, "neuroticism": 3.4},
        },
        {
            "uuid": "56",  # Executive MBA
            "traits": {"openness": 4.2, "conscientiousness": 4.9, "extraversion": 4.3, "agreeableness": 3.2, "neuroticism": 2.5},
        },
        {
            "uuid": "57",  # Dziennikarstwo i komunikacja społeczna (I st.)
            "traits": {"openness": 4.6, "conscientiousness": 3.7, "extraversion": 4.5, "agreeableness": 3.9, "neuroticism": 3.3},
        },
        {
            "uuid": "59",  # Bezpieczeństwo wewnętrzne (I st.)
            "traits": {"openness": 3.4, "conscientiousness": 4.3, "extraversion": 3.1, "agreeableness": 3.2, "neuroticism": 3.0},
        },
        {
            "uuid": "60",  # Dziennikarstwo i komunikacja społeczna (II st.)
            "traits": {"openness": 4.7, "conscientiousness": 3.8, "extraversion": 4.4, "agreeableness": 4.0, "neuroticism": 3.2},
        },
                {
            "uuid": "61",  # Logopedia (j.m.)
            "traits": {"openness": 4.2, "conscientiousness": 4.4, "extraversion": 3.8, "agreeableness": 4.7, "neuroticism": 3.3},
        },
        {
            "uuid": "62",  # Pielęgniarstwo (I st.)
            "traits": {"openness": 3.3, "conscientiousness": 4.7, "extraversion": 3.1, "agreeableness": 4.6, "neuroticism": 3.5},
        },
        {
            "uuid": "63",  # Automatyka, robotyka i systemy sterowania
            "traits": {"openness": 4.0, "conscientiousness": 4.8, "extraversion": 2.3, "agreeableness": 2.7, "neuroticism": 2.0},
        },
        {
            "uuid": "64",  # Ekonomia (I st.)
            "traits": {"openness": 3.7, "conscientiousness": 4.2, "extraversion": 3.4, "agreeableness": 3.2, "neuroticism": 2.7},
        },
        {
            "uuid": "65",  # Środki transportu i logistyka (II st.)
            "traits": {"openness": 3.5, "conscientiousness": 4.4, "extraversion": 2.9, "agreeableness": 3.1, "neuroticism": 2.5},
        },
        {
            "uuid": "67",  # Pedagogika przedszkolna i wczesnoszkolna (j.m.)
            "traits": {"openness": 3.8, "conscientiousness": 4.6, "extraversion": 4.1, "agreeableness": 4.9, "neuroticism": 3.4},
        },
        {
            "uuid": "69",  # Wzornictwo (II st.)
            "traits": {"openness": 5.0, "conscientiousness": 3.5, "extraversion": 3.9, "agreeableness": 3.6, "neuroticism": 3.8},
        },
        {
            "uuid": "70",  # Inżynieria Mechaniczna i Materiałowa
            "traits": {"openness": 3.7, "conscientiousness": 4.6, "extraversion": 2.5, "agreeableness": 2.8, "neuroticism": 2.3},
        },
        {
            "uuid": "71",  # Architektura wnętrz (II st.)
            "traits": {"openness": 4.9, "conscientiousness": 3.8, "extraversion": 3.7, "agreeableness": 3.4, "neuroticism": 3.6},
        },
        {
            "uuid": "72",  # Filozofia
            "traits": {"openness": 5.0, "conscientiousness": 3.1, "extraversion": 2.2, "agreeableness": 3.5, "neuroticism": 3.9},
        },
        {
            "uuid": "73",  # Hebraistyka (II st.)
            "traits": {"openness": 4.8, "conscientiousness": 4.0, "extraversion": 2.1, "agreeableness": 3.7, "neuroticism": 3.2},
        },
        {
            "uuid": "74",  # Informatyka w biznesie
            "traits": {"openness": 4.3, "conscientiousness": 4.0, "extraversion": 3.0, "agreeableness": 3.1, "neuroticism": 2.5},
        },
        {
            "uuid": "75",  # Bezpieczeństwo wewnętrzne (I st.)
            "traits": {"openness": 3.5, "conscientiousness": 4.3, "extraversion": 3.2, "agreeableness": 3.2, "neuroticism": 3.0},
        },
        {
            "uuid": "76",  # Aktorstwo (j.m.)
            "traits": {"openness": 5.0, "conscientiousness": 3.2, "extraversion": 5.0, "agreeableness": 4.0, "neuroticism": 4.2},
        },
        {
            "uuid": "77",  # Kierunek lekarsko-dentystyczny (j.m.)
            "traits": {"openness": 4.0, "conscientiousness": 4.9, "extraversion": 3.4, "agreeableness": 4.2, "neuroticism": 3.0},
        },
        {
            "uuid": "78",  # Praca socjalna
            "traits": {"openness": 4.2, "conscientiousness": 4.3, "extraversion": 3.6, "agreeableness": 4.7, "neuroticism": 3.5},
        },
        {
            "uuid": "79",  # Architektura wnętrz (II st.)
            "traits": {"openness": 4.9, "conscientiousness": 3.9, "extraversion": 3.8, "agreeableness": 3.5, "neuroticism": 3.7},
        },
        {
            "uuid": "80",  # Psychologia (j.m.)
            "traits": {"openness": 4.7, "conscientiousness": 3.9, "extraversion": 3.5, "agreeableness": 4.5, "neuroticism": 4.0},
        },
        {
            "uuid": "81",  # Pielęgniarstwo (I st.)
            "traits": {"openness": 3.4, "conscientiousness": 4.6, "extraversion": 3.1, "agreeableness": 4.8, "neuroticism": 3.5},
        },
        {
            "uuid": "82",  # Informatyka w biznesie (II st.)
            "traits": {"openness": 4.4, "conscientiousness": 4.2, "extraversion": 2.9, "agreeableness": 3.2, "neuroticism": 2.4},
        },
        {
            "uuid": "83",  # Humanistyka w szkole – polonistyczno-historyczne...
            "traits": {"openness": 4.6, "conscientiousness": 4.1, "extraversion": 3.3, "agreeableness": 4.4, "neuroticism": 3.6},
        },
        {
            "uuid": "84",  # Produkt i projektowanie dla przyszłości
            "traits": {"openness": 4.9, "conscientiousness": 3.7, "extraversion": 3.8, "agreeableness": 3.6, "neuroticism": 3.4},
        },
        {
            "uuid": "85",  # Geografia wojskowa i zarządzanie kryzysowe
            "traits": {"openness": 4.0, "conscientiousness": 4.6, "extraversion": 3.0, "agreeableness": 3.2, "neuroticism": 2.5},
        },
        {
            "uuid": "86",  # Advanced Biobased and Bioinspired Materials
            "traits": {"openness": 4.8, "conscientiousness": 4.7, "extraversion": 2.1, "agreeableness": 3.3, "neuroticism": 2.0},
        },
        {
            "uuid": "88",  # Fizjoterapia (j.m.)
            "traits": {"openness": 3.9, "conscientiousness": 4.5, "extraversion": 3.6, "agreeableness": 4.4, "neuroticism": 3.3},
        },
        {
            "uuid": "89",  # Fizjoterapia (j.m.)
            "traits": {"openness": 3.9, "conscientiousness": 4.5, "extraversion": 3.6, "agreeableness": 4.4, "neuroticism": 3.3},
        },
        {
            "uuid": "90",  # Psychologia (j.m.)
            "traits": {"openness": 4.7, "conscientiousness": 3.9, "extraversion": 3.5, "agreeableness": 4.5, "neuroticism": 4.0},
        },
        {
            "uuid": "91",  # Studia wschodnie
            "traits": {"openness": 4.6, "conscientiousness": 4.0, "extraversion": 3.0, "agreeableness": 3.7, "neuroticism": 3.1},
        },
        {
            "uuid": "92",  # Administracja (II st.)
            "traits": {"openness": 3.2, "conscientiousness": 4.3, "extraversion": 3.0, "agreeableness": 3.1, "neuroticism": 2.8},
        },
        {
            "uuid": "94",  # Kosmetologia
            "traits": {"openness": 4.1, "conscientiousness": 4.2, "extraversion": 3.9, "agreeableness": 4.1, "neuroticism": 3.6},
        },
        {
            "uuid": "95",  # Budownictwo (II st.)
            "traits": {"openness": 3.6, "conscientiousness": 4.8, "extraversion": 2.4, "agreeableness": 2.9, "neuroticism": 2.3},
        },
        {
            "uuid": "96",  # Inżynieria biomedyczna (II st.)
            "traits": {"openness": 4.2, "conscientiousness": 4.6, "extraversion": 2.8, "agreeableness": 3.4, "neuroticism": 2.7},
        },
        {
            "uuid": "97",  # Wychowanie fizyczne
            "traits": {"openness": 3.4, "conscientiousness": 4.2, "extraversion": 4.6, "agreeableness": 4.0, "neuroticism": 2.9},
        },
        {
            "uuid": "98",  # Rozwój zasobów ludzkich
            "traits": {"openness": 4.3, "conscientiousness": 4.1, "extraversion": 3.8, "agreeableness": 4.3, "neuroticism": 3.2},
        },
        {
            "uuid": "100",  # Budownictwo (II st.)
            "traits": {"openness": 3.5, "conscientiousness": 4.7, "extraversion": 2.3, "agreeableness": 2.8, "neuroticism": 2.1},
        },
        {
            "uuid": "101",  # Pedagogika (I st.)
            "traits": {"openness": 3.7, "conscientiousness": 4.3, "extraversion": 3.4, "agreeableness": 4.6, "neuroticism": 3.3},
        },
        {
            "uuid": "102",  # Wojsko w systemie służb publicznych
            "traits": {"openness": 3.0, "conscientiousness": 4.4, "extraversion": 3.0, "agreeableness": 3.0, "neuroticism": 2.6},
        },
        {
            "uuid": "103",  # Socjologia ekonomiczna
            "traits": {"openness": 4.4, "conscientiousness": 3.9, "extraversion": 3.5, "agreeableness": 3.9, "neuroticism": 3.5},
        },
        {
            "uuid": "104",  # Fizjoterapia (II st.)
            "traits": {"openness": 3.9, "conscientiousness": 4.5, "extraversion": 3.6, "agreeableness": 4.4, "neuroticism": 3.3},
        },
        {
            "uuid": "105",  # Pedagogika przedszkolna i wczesnoszkolna (j.m.)
            "traits": {"openness": 3.9, "conscientiousness": 4.6, "extraversion": 4.1, "agreeableness": 4.9, "neuroticism": 3.4},
        },
        {
            "uuid": "106",  # Filologia niemiecka
            "traits": {"openness": 4.5, "conscientiousness": 4.0, "extraversion": 3.3, "agreeableness": 4.0, "neuroticism": 3.1},
        },
        {
            "uuid": "107",  # Nauki o rodzinie (II st.)
            "traits": {"openness": 4.0, "conscientiousness": 4.3, "extraversion": 3.5, "agreeableness": 4.7, "neuroticism": 3.6},
        },
        {
            "uuid": "108",  # Design i komunikacja społeczna
            "traits": {"openness": 4.9, "conscientiousness": 3.7, "extraversion": 4.0, "agreeableness": 3.6, "neuroticism": 3.8},
        },
        {
            "uuid": "109",  # Zarządzanie (I st.)
            "traits": {"openness": 3.7, "conscientiousness": 4.1, "extraversion": 3.9, "agreeableness": 3.3, "neuroticism": 2.8},
        },
        {
            "uuid": "110",  # Projektowanie społeczne (II st.)
            "traits": {"openness": 4.8, "conscientiousness": 4.2, "extraversion": 3.7, "agreeableness": 4.1, "neuroticism": 3.4},
        },
    ]

    created = 0
    for entry in data:
        try:
            course = Course.objects.get(id=int(entry["uuid"]))
            if not hasattr(course, "trait_profile"):
                CourseTraitProfile.objects.create(
                    course=course,
                    openness=entry["traits"]["openness"],
                    conscientiousness=entry["traits"]["conscientiousness"],
                    extraversion=entry["traits"]["extraversion"],
                    agreeableness=entry["traits"]["agreeableness"],
                    neuroticism=entry["traits"]["neuroticism"],
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
