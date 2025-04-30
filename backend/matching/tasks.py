from courses.models import Course, Question, CourseQuestionScore

def match_courses(user_answers):
    course_scores = {}
    flagged_courses = {}

    for course in Course.objects.all():
        score = 0
        alerts = []
        question_scores = CourseQuestionScore.objects.filter(course=course)

        for course_question in question_scores:
            question_identifier = course_question.question.identifier
            course_score = course_question.score
            user_score = user_answers.get(question_identifier)

            if user_score is not None:
                difference = int(user_score) - course_score
                if difference == 0:
                    score += 2
                elif abs(difference) == 1:
                    score += 1
                elif abs(difference) >= 2:
                    alerts.append({
                        "question": course_question.question.text,
                        "user_value": user_score,
                        "course_value": course_score,
                        "message": f"Duża różnica w pytaniu: \"{course_question.question.text}\" – kierunek oczekuje poziomu {course_score}, a użytkownik zadeklarował {user_score}."
                    })

        course_scores[course] = score
        if alerts:
            flagged_courses[course.course_name] = alerts

    sorted_courses = sorted(course_scores.items(), key=lambda x: x[1], reverse=True)
    return sorted_courses, flagged_courses
