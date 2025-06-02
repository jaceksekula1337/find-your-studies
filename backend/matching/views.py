from rest_framework.response import Response
from rest_framework.decorators import api_view
from .tasks import match_courses


from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .serializers import UserFeedbackSerializer

class SubmitFeedbackView(APIView):
    def post(self, request):
        serializer = UserFeedbackSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response({"message": "Feedback saved."}, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['POST'])
def get_course_recommendations(request):
    # Pobierz dane przesłane z frontendu
    raw_answers = request.data.get("answers", {})

    if not raw_answers:
        return Response({"error": "Brak odpowiedzi użytkownika"}, status=400)

    # Oczekujemy odpowiedzi w formacie: {"O_try_new_things": 2, "C_task_completion": 1, ...}
    sorted_courses, flagged_courses = match_courses(raw_answers)

    response_data = {
        "recommended_courses": [
            {
                "course_name": course[0].course_name,
                "score": course[1],
                "alerts": flagged_courses.get(course[0].course_name, [])
            }
            for course in sorted_courses[:5]  # np. tylko Top 5
        ]
    }

    return Response(response_data)
