from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status

from .tasks import calculate_user_profile, match_courses_by_traits
from .serializers import UserFeedbackSerializer
from .tasks import describe_trait

@api_view(['POST'])
def get_course_recommendations(request):
    raw_answers = request.data.get("answers", {})
    if not raw_answers:
        return Response({"error": "Brak odpowiedzi użytkownika"}, status=400)

    user_profile = calculate_user_profile(raw_answers)
    matches, profile = match_courses_by_traits(user_profile)
    trait_descriptions = {
    trait: describe_trait(trait, value)
    for trait, value in user_profile.items()
}
    response_data = {
    "recommended_courses": [
        {
            "course_name": match["course"].course_name,
            "score": match["score"],
            "alerts": match["alerts"]
        }
        for match in matches
    ],
    "user_profile": profile,
    "trait_descriptions": trait_descriptions
    }

    return Response(response_data)


# zostawiamy tę klasę do zapisu feedbacku
from rest_framework.views import APIView


class SubmitFeedbackView(APIView):
    def post(self, request):
        serializer = UserFeedbackSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response({"message": "Feedback saved."}, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
