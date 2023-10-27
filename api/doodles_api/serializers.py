from rest_framework import serializers
from .models import Doodles
from django.contrib.auth import get_user_model
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework.validators import ValidationError

UserModel = get_user_model()

class SignUpSerializer(serializers.ModelSerializer):
    username = serializers.CharField(max_length=45)
    password = serializers.CharField(min_length=8, write_only=True)

    class Meta:
        model = UserModel
        fields = ["username", "password"]

    def validate(self, attrs):
        username_exists = UserModel.objects.filter(username=attrs["username"]).exists()
        if username_exists:
            raise ValidationError("Username has already been used")
        return super().validate(attrs)

    def create(self, validated_data):
        password = validated_data.pop("password")
        user = super().create(validated_data)
        user.set_password(password)
        user.save()
        return user

class DoodlesSerializer(serializers.ModelSerializer):
    class Meta:
        model = Doodles
        fields = ["id", "image", "user", "timestamp"]

class CustomTokenObtainPairSerializer(TokenObtainPairSerializer):
    def validate(self, attrs):
        data = super(CustomTokenObtainPairSerializer, self).validate(attrs)
        data.update({'uid': self.user.id})
        return data
