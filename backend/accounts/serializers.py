from django.contrib.auth.models import User
from rest_framework import serializers

class RegisterSerializer(serializers.ModelSerializer):
    class Meta:
        model=User
        fields=["username","email","password",]
        extra_kwargs={
            "password":{
                "write_only":True #security ko lagi impr
            }
        }
    def create(self,Validate_data):
        user= User.objects.create_user(
            username= Validate_data["username"],
            email= Validate_data.get("email",""),
            password= Validate_data["password"],
        )
        return user
