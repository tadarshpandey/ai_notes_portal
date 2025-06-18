from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework import status
from django.conf import settings
import openai

openai.api_key = settings.OPENAI_API_KEY  # Make sure it's set in settings.py

# @api_view(['POST'])
# @permission_classes([IsAuthenticated])
# def summarize_note(request):
#     try:
#         text = request.data.get("text", "")
#         if not text:
#             return Response({"error": "No input text provided."}, status=status.HTTP_400_BAD_REQUEST)

#         response = openai.ChatCompletion.create(
#             model="gpt-3.5-turbo",
#             messages=[
#                 {"role": "system", "content": "You are a helpful assistant that summarizes notes."},
#                 {"role": "user", "content": f"Summarize the following:\n{text}"}
#             ],
#             temperature=0.5,
#             max_tokens=150,
#         )

#         summary = response.choices[0].message['content'].strip()
#         return Response({"summary": summary}, status=status.HTTP_200_OK)

#     except Exception as e:
#         return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

# this code is for temporary use make sure checkout this once before going to all done

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def summarize_note(request):
    try:
        text = request.data.get("text", "")
        print("INPUT TEXT:", text)  # ✅ debug
        if not text:
            return Response({"error": "No input text provided."}, status=status.HTTP_400_BAD_REQUEST)

        response = openai.ChatCompletion.create(
            model="gpt-3.5-turbo",
            messages=[
                {"role": "system", "content": "You are a helpful assistant that summarizes notes."},
                {"role": "user", "content": f"Summarize the following:\n{text}"}
            ],
            temperature=0.5,
            max_tokens=150,
        )

        summary = response.choices[0].message['content'].strip()
        return Response({"summary": summary}, status=status.HTTP_200_OK)

    except Exception as e:
        print("Not working summarizer views code for ai summarizer")
        print("ERROR:", str(e))  # ✅ debug
        return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
