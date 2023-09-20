from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status, generics
from rest_framework.authtoken.models import Token
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.authentication import TokenAuthentication
from django.contrib.auth import authenticate
from .models import CustomUser, ResearchTopic, ResearchTopicRegistrationForm
from .serializers import UserSerializer, UserUpdateSerializer, ResearchTopicSerializer, ResearchTopicRegistrationSerializer

##### LOGIN #####

from django.contrib.auth import authenticate, login

class LoginAPIView(APIView):
    permission_classes = (AllowAny,)

    def post(self, request):
        username = request.data.get('username')
        password = request.data.get('password')

        # Kiểm tra tên đăng nhập và mật khẩu thủ công
        try:
            user = CustomUser.objects.get(username=username)
            if user.password == password:
                # Đăng nhập thành công
                login(request, user)
                token, created = Token.objects.get_or_create(user=user)  # Tạo hoặc lấy token

                return Response(
                    {
                        'message': 'Đăng nhập thành công',
                        'token': token.key  # Trả về token cho client
                    },
                    status=status.HTTP_200_OK
                )
            else:
                # Sai mật khẩu
                return Response({'message': 'Sai mật khẩu'}, status=status.HTTP_401_UNAUTHORIZED)
        except CustomUser.DoesNotExist:
            # Tài khoản không tồn tại
            return Response({'message': 'Tài khoản không tồn tại'}, status=status.HTTP_401_UNAUTHORIZED)


    
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

########################################################################

class ResearchTopicRegistrationListAPIView(APIView):
    permission_classes = (AllowAny,) 
    def get(self, request):
        research_topics = ResearchTopicRegistrationForm.objects.all()
        serializer = ResearchTopicRegistrationSerializer(research_topics, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

class ResearchTopicRegistrationAPIView(APIView):
    permission_classes = (AllowAny,)

    def get_object(self, pk):
        try:
            return ResearchTopicRegistrationForm.objects.get(pk=pk)
        except ResearchTopicRegistrationForm.DoesNotExist:
            return None

    # Thay đổi phần gọi phương thức get
    def get(self, request, pk):
        research_topic = self.get_object(pk)
        if not research_topic:
            return Response(
                {"message": "Research Topic not found"},
                status=status.HTTP_404_NOT_FOUND,
            )
        serializer = ResearchTopicRegistrationSerializer(research_topic)
        return Response(serializer.data, status=status.HTTP_200_OK)
    
    def post(self, request):
        serializer = ResearchTopicRegistrationSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def put(self, request, pk):
        research_topic = self.get_object(pk)
        if not research_topic:
            return Response(
                {"message": "ResearchTopicRegistration not found"},
                status=status.HTTP_404_NOT_FOUND,
            )
        serializer = ResearchTopicRegistrationSerializer(research_topic, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, pk):
        research_topic = self.get_object(pk)
        if not research_topic:
            return Response(
                {"message": "ResearchTopicRegistration not found"},
                status=status.HTTP_404_NOT_FOUND,
            )
        research_topic.delete()
        return Response(
            {"message": "ResearchTopicRegistration deleted successfully"},
            status=status.HTTP_204_NO_CONTENT,
        )
    



class RegistrationTopicAPIView(APIView):
    permission_classes = (AllowAny,)


    def post(self, request):
        selected_topics = request.data.get('selected_topics', [])
        try:
            # Thực hiện hành động đăng ký với các đề tài đã chọn (selected_topics)
            for topic_id in selected_topics:
                try:
                    topic = ResearchTopic.objects.get(id=topic_id)
                    topic.selected = True
                    topic.save()
                except ResearchTopic.DoesNotExist:
                    pass

            return Response({"message": "Đăng ký thành công!"})
        except Exception as e:
            return Response({"message": "Đăng ký thất bại!", "error": str(e)}, status=status.HTTP_400_BAD_REQUEST)