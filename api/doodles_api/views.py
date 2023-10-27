from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework import permissions
from .models import Doodles
from .serializers import DoodlesSerializer
from .serializers import CustomTokenObtainPairSerializer
from rest_framework import generics, status
from rest_framework.request import Request
from rest_framework.response import Response
from rest_framework.views import APIView

from .serializers import SignUpSerializer
from rest_framework_simplejwt.views import TokenObtainPairView

class RegisterView(generics.GenericAPIView):
    serializer_class = SignUpSerializer
    permission_classes = []

    def post(self, request: Request):
        data = request.data

        serializer = self.serializer_class(data=data)

        if serializer.is_valid():
            serializer.save()

            response = {"message": "User Created Successfully", "data": serializer.data}

            return Response(data=response, status=status.HTTP_201_CREATED)

        return Response(data=serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class DoodlesApiView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def get(self, request, *args, **kwargs):
        try: 
            cid =request.query_params["coloring"]
            colorings = Doodles.objects.get(id = cid)
            serializer = DoodlesSerializer(colorings)
        except:
            print(request.user)
            colorings = Doodles.objects.filter(user = request.user.id)
            serializer = DoodlesSerializer(colorings, many = True)

        return Response(serializer.data, status = status.HTTP_200_OK)

    def post(self, request, *args, **kwargs):
        data = {
            'image' : request.data.get('coloring'),
            'user' : request.data.get('uid'),
        }
        serializer = DoodlesSerializer(data = data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response(serializer.data, status=status.HTTP_400_BAD_REQUEST)

class CustomTokenObtainPairView(TokenObtainPairView):
    serializer_class = CustomTokenObtainPairSerializer