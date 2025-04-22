from rest_framework.response import Response
from rest_framework.decorators import api_view
from .tasks import match_courses

@api_view(['POST'])
def get_course_recommendations(request):
    user_answers = request.data.get("answers", {})
    
    if not user_answers:
        return Response({"error": "No answers provided"}, status=400)

    sorted_courses, flagged_courses = match_courses(user_answers)
    
    # Formatowanie danych do JSON
    response_data = {
        "recommended_courses": [
            {
                "course_name": course[0].course_name,
                "score": course[1],
                "alerts": flagged_courses.get(course[0].course_name, [])
            }
            for course in sorted_courses
        ]
    }

    return Response(response_data)
