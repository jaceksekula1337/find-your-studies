from courses.models import CourseTraitProfile
import math
from collections import defaultdict

def calculate_user_profile(user_answers):
    from courses.models import Question

    trait_totals = {
        "extraversion": [],
        "agreeableness": [],
        "conscientiousness": [],
        "neuroticism": [],
        "openness": [],
    }

    for qid, value in user_answers.items():
        question = Question.objects.filter(identifier=qid).first()
        if not question:
            continue

        val = int(value)
        if question.reverse_scored:
            val = 5 - val

        trait_totals[question.category].append(val)

    profile = {}
    for trait, values in trait_totals.items():
        profile[trait] = round(sum(values) / len(values), 2) if values else 0.0

    return profile

def describe_trait(trait, value):
    if trait == "extraversion":
        if value >= 4:
            return "Jesteś osobą towarzyską, rozmowną i pełną energii. Dobrze czujesz się w grupie i lubisz być w centrum uwagi."
        elif value >= 2.5:
            return "Lubisz ludzi, ale potrzebujesz też czasu dla siebie. Zachowujesz równowagę między towarzyskością a introwersją."
        else:
            return "Jesteś raczej introwertyczny/a, cenisz ciszę i spokojniejsze środowisko. Unikasz bycia w centrum uwagi."

    elif trait == "agreeableness":
        if value >= 4:
            return "Jesteś uprzejmy/a, współczujący/a i dobrze dogadujesz się z innymi. Często bierzesz pod uwagę potrzeby innych."
        elif value >= 2.5:
            return "Potrafisz być zarówno bezpośredni/a, jak i empatyczny/a – zależnie od sytuacji."
        else:
            return "Bywasz bezpośredni/a i nie zawsze zgadzasz się z innymi – potrafisz bronić własnego zdania. Jesteś bardziej asertywny/a niż koncyliacyjny/a."

    elif trait == "conscientiousness":
        if value >= 4:
            return "Jesteś zorganizowany/a, sumienny/a i dbasz o szczegóły. Często planujesz z wyprzedzeniem i konsekwentnie dążysz do celu."
        elif value >= 2.5:
            return "Potrafisz być uporządkowany/a, choć nie zawsze. Dostosowujesz się do sytuacji i okoliczności."
        else:
            return "Możesz mieć trudność z organizacją lub systematycznością – cenisz elastyczność i działanie bez sztywnych ram."

    elif trait == "neuroticism":
        if value >= 4:
            return "Masz tendencję do odczuwania stresu i niepokoju częściej niż inni. Możesz być bardziej podatny/a na zmienność nastrojów."
        elif value >= 2.5:
            return "Miewasz emocjonalne wzloty i upadki, ale zazwyczaj zachowujesz spokój."
        else:
            return "Jesteś emocjonalnie stabilny/a i rzadko przeżywasz silne negatywne emocje. Trudno wyprowadzić Cię z równowagi."

    elif trait == "openness":
        if value >= 4:
            return "Jesteś kreatywny/a, otwarty/a na nowe doświadczenia i ciekawy/a świata. Lubisz nowości i niestandardowe podejścia."
        elif value >= 2.5:
            return "Cenisz równowagę między innowacją a praktycznością. Otwartość zależy od kontekstu."
        else:
            return "Wolisz to, co znane i sprawdzone. Nowości i eksperymenty nie zawsze są w Twoim stylu – cenisz tradycję i konkret."

    return "Brak opisu dla tej cechy."


def match_courses_by_traits(user_profile):
    from collections import defaultdict
    from courses.models import CourseTraitProfile

    power = 2.5
    alert_threshold = 2.0
    alert_penalty = 25
    alert_score_penalty = 0.8

    trait_weights = {
        "extraversion": 1.0,
        "agreeableness": 1.0,
        "conscientiousness": 1.0,
        "neuroticism": 1.0,
        "openness": 1.0,
    }

    trait_labels = {
        "extraversion": "towarzyskości",
        "agreeableness": "ugodowości",
        "conscientiousness": "sumienności",
        "neuroticism": "stabilności emocjonalnej",
        "openness": "otwartości na doświadczenia",
    }

    matches = []

    for trait_profile in CourseTraitProfile.objects.select_related("course").all():
        total_penalty = 0.0
        alerts = []

        for trait, weight in trait_weights.items():
            user_value = user_profile[trait]
            course_value = getattr(trait_profile, trait)
            diff = abs(user_value - course_value)

            if diff > alert_threshold:
                direction = "wyższego" if course_value > user_value else "niższego"
                label = trait_labels.get(trait, trait)

                alerts.append({
                    "trait": trait,
                    "user_value": user_value,
                    "course_value": course_value,
                    "message": (
                        f"Ten kierunek wymaga znacznie {direction} poziomu {label} "
                        f"(Twój wynik: {user_value}, wymagany: {course_value})."
                    )
                })
                total_penalty += alert_penalty
            else:
                total_penalty += weight * (diff ** power)

        max_possible_penalty = 5 * (5.0 ** power)
        normalized_penalty = total_penalty / max_possible_penalty
        score = (1 - normalized_penalty) ** 2 * 100

        if len(alerts) >= 3:
            score *= alert_score_penalty

        matches.append({
            "course": trait_profile.course,
            "score": round(max(score, 0), 2),
            "alerts": alerts
        })

    grouped = defaultdict(list)
    for match in matches:
        name = match["course"].course_name.strip().lower()
        grouped[name].append(match)

    deduplicated = []
    for group in grouped.values():
        best = max(group, key=lambda x: x["score"])
        deduplicated.append(best)

    deduplicated.sort(key=lambda x: (len(x["alerts"]), -x["score"]))
    return deduplicated, user_profile
