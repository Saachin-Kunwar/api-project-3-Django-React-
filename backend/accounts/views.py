from django.contrib.auth import authenticate, login, logout

from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView

from rest_framework import generics
from .serializers import RegisterSerializer


class RegisterView(generics.CreateAPIView):
    serializer_class = RegisterSerializer


class LoginView(APIView):

    def post(self, request):

        username = request.data.get("username")
        password = request.data.get("password")

        user = authenticate(
            username=username,
            password=password
        )

        if user is None:
            return Response(
                {"detail": "Invalid username or password."},
                status=status.HTTP_400_BAD_REQUEST
            )

        login(request, user)

        return Response(
            {
                "detail": "Login successful.",
                "username": user.username
            },
            status=status.HTTP_200_OK
        )


class LogoutView(APIView):

    def post(self, request):

        logout(request)

        return Response(
            {
                "detail": "Logout successful."
            },
            status=status.HTTP_200_OK
        )