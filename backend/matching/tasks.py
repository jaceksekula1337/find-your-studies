from courses.models import CourseTraitProfile


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


def match_courses_by_traits(user_profile):
    matches = []

    for trait_profile in CourseTraitProfile.objects.select_related("course").all():
        score = 0
        for trait in user_profile:
            course_value = getattr(trait_profile, trait)
            user_value = user_profile[trait]
            diff = abs(user_value - course_value)
            score += (4 - diff)  # Im mniejsza różnica, tym większy wynik

        max_score = 5 * len(user_profile)
        normalized_score = round((score / max_score) * 100, 2)

        matches.append({
            "course": trait_profile.course,
            "score": normalized_score,
            "alerts": []
        })

    matches.sort(key=lambda x: x["score"], reverse=True)
    return matches, user_profile
