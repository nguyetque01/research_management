from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.authtoken.models import Token
from rest_framework.permissions import AllowAny, IsAuthenticated
from django.contrib.auth import authenticate
from .models import CustomUser, ResearchTopic
from .serializers import RegistrationSerializer, LoginSerializer, CustomUserSerializer, ResearchTopicSerializer
from rest_framework.authentication import TokenAuthentication

class RegistrationAPIView(APIView):
    permission_classes = (AllowAny,)

    def post(self, request):
        serializer = RegistrationSerializer(data=request.data)
        if serializer.is_valid():
            user = serializer.save()
            if user:
                token, created = Token.objects.get_or_create(user=user)
                return Response({'token': token.key}, status=status.HTTP_201_CREATED)
        
        errors = serializer.errors
        if "username" in errors and "custom user with this username already exists." in errors["username"]:
            return Response({"error": "Tên đăng nhập đã tồn tại"}, status=status.HTTP_400_BAD_REQUEST)
        if "email" in errors and "custom user with this email already exists." in errors["email"]:
            return Response({"error": "Email đã tồn tại"}, status=status.HTTP_400_BAD_REQUEST)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class LoginAPIView(APIView):
    permission_classes = (AllowAny,)

    def post(self, request):
        serializer = LoginSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)

        user = authenticate(username=serializer.validated_data['username'],
                            password=serializer.validated_data['password'])

        if user:
            token, created = Token.objects.get_or_create(user=user)
            return Response({'token': token.key}, status=status.HTTP_200_OK)
            
        return Response({'error': 'Invalid credentials'}, status=status.HTTP_401_UNAUTHORIZED)

class ListUsersAPIView(APIView):
    # permission_classes = (IsAuthenticated,)  # Đảm bảo chỉ người dùng đã đăng nhập mới có thể truy cập
    permission_classes = (AllowAny,)  # Đảm bảo chỉ người dùng đã đăng nhập mới có thể truy cập

    def get(self, request):
        users = CustomUser.objects.all()
        serializer = CustomUserSerializer(users, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)
    
class ResearchTopicListAPIView(APIView):
    def get(self, request):
        research_topics = ResearchTopic.objects.all()
        serializer = ResearchTopicSerializer(research_topics, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)
    
class UserProfileView(APIView):
    authentication_classes = [TokenAuthentication]
    permission_classes = [IsAuthenticated]
    def get(self, request):
        user = request.user
        serializer = CustomUserSerializer(user)
        print(user)
        return Response(serializer.data, status=status.HTTP_200_OK)