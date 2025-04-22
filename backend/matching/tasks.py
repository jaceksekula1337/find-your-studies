from courses.models import Course, CourseFeatureScore

def match_courses(user_answers):
    """
    Dopasowanie kursów na podstawie odpowiedzi użytkownika przekazanych w `user_answers`.
    """
    course_scores = {}
    flagged_courses = {}

    for course in Course.objects.all():
        score = 0
        alerts = []
        course_features = CourseFeatureScore.objects.filter(course=course)

        for course_feature in course_features:
            user_answer = user_answers.get(course_feature.feature.name)  # Pobieramy odpowiedź użytkownika na podstawie nazwy cechy
            if user_answer is not None:
                difference = int(user_answer) - course_feature.points
                if difference == 0:
                    score += 2
                elif abs(difference) == 1:
                    score += 1
                elif abs(difference) == 2:
                    score += 0  # Nie obniżamy punktacji
                    # Dodajemy alert
                    alert = {
                        "feature": course_feature.feature.name,
                        "user_value": user_answer,
                        "course_value": course_feature.points,
                        "message": f"Ten kierunek wymaga '{course_feature.feature.name}' na poziomie {course_feature.points}, ale użytkownik zadeklarował {user_answer}."
                    }
                    alerts.append(alert)

        course_scores[course] = score
        if alerts:
            flagged_courses[course.course_name] = alerts

    # Zwracamy wyniki z informacją o alertach
    sorted_courses = sorted(course_scores.items(), key=lambda x: x[1], reverse=True)
    return sorted_courses, flagged_courses
