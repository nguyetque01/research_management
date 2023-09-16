from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status, generics
from rest_framework.authtoken.models import Token
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.authentication import TokenAuthentication
from django.contrib.auth import authenticate
from .models import CustomUser, ResearchTopic, Category
from .serializers import RegistrationSerializer, LoginSerializer, UserSerializer, UserUpdateSerializer, ResearchTopicSerializer, CategorySerializer

##### REGISTRATION, LOGIN #####

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
    
##### USER PROFILE #####

class UserProfileView(APIView):
    authentication_classes = [TokenAuthentication]
    permission_classes = [IsAuthenticated]
    def get(self, request):
        user = request.user
        serializer = UserSerializer(user)
        print(user)
        return Response(serializer.data, status=status.HTTP_200_OK)
    
class UserProfileUpdateView(generics.RetrieveUpdateAPIView):
    serializer_class = UserUpdateSerializer
    permission_classes = [IsAuthenticated]

    def get_object(self):
        # Trả về thông tin cá nhân của người dùng đang đăng nhập
        return self.request.user

    def put(self, request, *args, **kwargs):
        # Gọi hàm cập nhật của lớp cha để thực hiện việc cập nhật dữ liệu
        response = super().update(request, *args, **kwargs)
        
        # Nếu cập nhật thành công, thực hiện xử lý tùy chỉnh trong perform_update
        if response.status_code == status.HTTP_200_OK:
            instance = self.get_object()
            serializer = self.get_serializer(instance, data=request.data)
            serializer.is_valid(raise_exception=True)
            self.perform_update(serializer)
            
            # Lưu dữ liệu vào cơ sở dữ liệu
            serializer.save()
            
            return Response({'message': 'Cập nhật thành công'}, status=status.HTTP_200_OK)
        
        # Nếu cập nhật không thành công, trả về response từ lớp cha
        return response

##### USERS #####
    
class UserListAPIView(APIView):
    permission_classes = (AllowAny,) 
    def get(self, request):
        research_topics = CustomUser.objects.all()
        serializer = UserSerializer(research_topics, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)
    
class UserAPIView(APIView):
    permission_classes = (AllowAny,)

    def get_object(self, pk):
        try:
            return CustomUser.objects.get(pk=pk)
        except CustomUser.DoesNotExist:
            return None

    def get(self, request, pk):
        user = self.get_object(pk)
        if not user:
            return Response(
                {"message": "User not found"},
                status=status.HTTP_404_NOT_FOUND,
            )
        serializer = UserSerializer(user)
        return Response(serializer.data, status=status.HTTP_200_OK)

    def post(self, request):
        serializer = UserSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def put(self, request, pk):
        try:
            user = CustomUser.objects.get(pk=pk)
        except CustomUser.DoesNotExist:
            return Response({"message": "Người dùng không tồn tại"}, status=status.HTTP_404_NOT_FOUND)

        serializer = UserSerializer(user, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, pk):
        try:
            user = CustomUser.objects.get(pk=pk)
            user.delete()
            return Response({"message": "Xóa người dùng thành công"}, status=status.HTTP_204_NO_CONTENT)
        except CustomUser.DoesNotExist:
            return Response({"message": "Người dùng không tồn tại"}, status=status.HTTP_404_NOT_FOUND)

    def patch(self, request, pk):
        try:
            user = CustomUser.objects.get(pk=pk)
            user.is_active = not user.is_active  # Đảo ngược trạng thái
            user.save()
            serializer = UserSerializer(user)
            return Response(serializer.data, status=status.HTTP_200_OK)
        except CustomUser.DoesNotExist:
            return Response({"message": "Người dùng không tồn tại"}, status=status.HTTP_404_NOT_FOUND)

class UserToggleActiveView(APIView):
    permission_classes = (AllowAny,) 
    def patch(self, request, pk):
        try:
            user = CustomUser.objects.get(pk=pk)
            user.is_active = not user.is_active  # Đảo ngược trạng thái
            user.save()
            serializer = UserSerializer(user)
            return Response(serializer.data, status=status.HTTP_200_OK)
        except CustomUser.DoesNotExist:
            return Response({"message": "Người dùng không tồn tại"}, status=status.HTTP_404_NOT_FOUND)

########################################################################

##### Category List #####
class CategoryListAPIView(APIView):
    permission_classes = (AllowAny,) 
    def get(self, request):
        research_topics = Category.objects.all()
        serializer = CategorySerializer(research_topics, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)    

##### Category #####
class CategoryAPIView(APIView):
    permission_classes = (AllowAny,)

    def get_object(self, pk):
        try:
            return Category.objects.get(pk=pk)
        except Category.DoesNotExist:
            return None

    def get(self, request, pk):
        category = self.get_object(pk)
        if not category:
            return Response(
                {"message": "Category not found"},
                status=status.HTTP_404_NOT_FOUND,
            )
        serializer = CategorySerializer(category)
        return Response(serializer.data, status=status.HTTP_200_OK)
    
    def post(self, request):
        serializer = CategorySerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def put(self, request, pk):
        category = self.get_object(pk)
        if not category:
            return Response(
                {"message": "Category not found"},
                status=status.HTTP_404_NOT_FOUND,
            )
        serializer = CategorySerializer(category, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, pk):
        category = self.get_object(pk)
        if not category:
            return Response(
                {"message": "Category not found"},
                status=status.HTTP_404_NOT_FOUND,
            )
        category.delete()
        return Response(
            {"message": "Category deleted successfully"},
            status=status.HTTP_204_NO_CONTENT,
        )
    
########################################################################

##### Research Topic List #####
class ResearchTopicListAPIView(APIView):
    permission_classes = (AllowAny,) 
    def get(self, request):
        research_topics = ResearchTopic.objects.all()
        serializer = ResearchTopicSerializer(research_topics, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)
    
##### Research Topic #####
class ResearchTopicAPIView(APIView):
    permission_classes = (AllowAny,)

    def get_object(self, pk):
        try:
            return ResearchTopic.objects.get(pk=pk)
        except ResearchTopic.DoesNotExist:
            return None

    def get(self, request, pk):
        research_topic = self.get_object(pk)
        if not research_topic:
            return Response(
                {"message": "Research Topic not found"},
                status=status.HTTP_404_NOT_FOUND,
            )
        serializer = ResearchTopicSerializer(research_topic)
        return Response(serializer.data, status=status.HTTP_200_OK)
    
    def post(self, request):
        serializer = ResearchTopicSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def put(self, request, pk):
        research_topic = self.get_object(pk)
        if not research_topic:
            return Response(
                {"message": "ResearchTopic not found"},
                status=status.HTTP_404_NOT_FOUND,
            )
        serializer = ResearchTopicSerializer(research_topic, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, pk):
        research_topic = self.get_object(pk)
        if not research_topic:
            return Response(
                {"message": "ResearchTopic not found"},
                status=status.HTTP_404_NOT_FOUND,
            )
        research_topic.delete()
        return Response(
            {"message": "ResearchTopic deleted successfully"},
            status=status.HTTP_204_NO_CONTENT,
        )
