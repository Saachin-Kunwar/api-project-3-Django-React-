from django.shortcuts import render
from .serializers import RegisterSerializer
from rest_framework import generics
# Create your views here.

class RegisterView(generics.CreateAPIView):
    serializer_class= RegisterSerializer

