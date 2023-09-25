from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status, generics
from rest_framework.authtoken.models import Token
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.authentication import TokenAuthentication
from django.contrib.auth import authenticate, login
from .models import User, AcademicProfile, AcademicYear, Unit, LeadUnit, Level, ResearchType, ResearchActivity, ResearchActivityCategory, ResearchTopic
from .serializers import UserSerializer, AcademicProfileSerializer, AcademicYearSerializer, UnitSerializer, LeadUnitSerializer, LevelSerializer, ResearchTypeSerializer, ResearchActivitySerializer,ResearchActivityCategorySerializer, ResearchTopicSerializer

# COMMON API VIEW
class CommonAPIView(APIView):
    permission_classes = (AllowAny,)

    def get_object(self, model, pk):
        try:
            return model.objects.get(pk=pk)
        except model.DoesNotExist:
            return None

    def get(self, request, model, serializer_class, pk=None):
        if pk:
            instance = self.get_object(model, pk)
            if not instance:
                return Response(
                    {"message": f"{model.__name__} not found"},
                    status=status.HTTP_404_NOT_FOUND,
                )
            serializer = serializer_class(instance)
            return Response(serializer.data, status=status.HTTP_200_OK)
        else:
            queryset = model.objects.all()
            serializer = serializer_class(queryset, many=True)
            return Response(serializer.data, status=status.HTTP_200_OK)

    def post(self, request, model, serializer_class):
        serializer = serializer_class(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def put(self, request, model, serializer_class, pk):
        instance = self.get_object(model, pk)
        if not instance:
            return Response(
                {"message": f"{model.__name__} not found"},
                status=status.HTTP_404_NOT_FOUND,
            )
        serializer = serializer_class(instance, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, model, pk):
        instance = self.get_object(model, pk)
        if not instance:
            return Response(
                {"message": f"{model.__name__} not found"},
                status=status.HTTP_404_NOT_FOUND,
            )
        instance.delete()
        return Response(
            {"message": f"{model.__name__} deleted successfully"},
            status=status.HTTP_204_NO_CONTENT,
        )

##### LOGIN #####

class LoginAPIView(APIView):
    permission_classes = (AllowAny,)

    def post(self, request):
        username = request.data.get('username')
        password = request.data.get('password')

        # Kiểm tra tên đăng nhập và mật khẩu thủ công
        try:
            user = User.objects.get(username=username)
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
        except User.DoesNotExist:
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
    serializer_class = UserSerializer
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
    
class UserListAPIView(CommonAPIView):
    model = User
    serializer_class = UserSerializer

    def get(self, request):
        return super().get(request, self.model, self.serializer_class)

class UserAPIView(CommonAPIView):
    model = User
    serializer_class = UserSerializer

    def get(self, request, pk):
        return super().get(request, self.model, self.serializer_class, pk)

    def put(self, request, pk):
        return super().put(request, self.model, self.serializer_class, pk)

    def delete(self, request, pk):
        return super().delete(request, self.model, pk)

    def post(self, request):
        return super().post(request, self.model, self.serializer_class)
    

class UserToggleActiveView(APIView):
    permission_classes = (AllowAny,) 
    
    def patch(self, request, pk):
        try:
            user = User.objects.get(pk=pk)
            user.is_active = not user.is_active  # Đảo ngược trạng thái
            user.save()
            serializer = UserSerializer(user)
            return Response(serializer.data, status=status.HTTP_200_OK)
        except User.DoesNotExist:
            return Response({"message": "Người dùng không tồn tại"}, status=status.HTTP_404_NOT_FOUND)


 ########################################################################

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

########################################################################

##### Academic Profile #####

class AcademicProfileListAPIView(CommonAPIView):
    model = AcademicProfile
    serializer_class = AcademicProfileSerializer

    def get(self, request):
        return super().get(request, self.model, self.serializer_class)

class AcademicProfileAPIView(CommonAPIView):
    model = AcademicProfile
    serializer_class = AcademicProfileSerializer

    def get(self, request, pk):
        return super().get(request, self.model, self.serializer_class, pk)

    def put(self, request, pk):
        return super().put(request, self.model, self.serializer_class, pk)

    def delete(self, request, pk):
        return super().delete(request, self.model, pk)
    
    def post(self, request):
        return super().post(request, self.model, self.serializer_class)


########################################################################

##### Academic Year #####

class AcademicYearListAPIView(CommonAPIView):
    model = AcademicYear
    serializer_class = AcademicYearSerializer

    def get(self, request):
        return super().get(request, self.model, self.serializer_class)

class AcademicYearAPIView(CommonAPIView):
    model = AcademicYear
    serializer_class = AcademicYearSerializer

    def get(self, request, pk):
        return super().get(request, self.model, self.serializer_class, pk)

    def put(self, request, pk):
        return super().put(request, self.model, self.serializer_class, pk)

    def delete(self, request, pk):
        return super().delete(request, self.model, pk)
    
    def post(self, request):
        return super().post(request, self.model, self.serializer_class)

########################################################################

##### Unit #####

class UnitListAPIView(CommonAPIView):
    model = Unit
    serializer_class = UnitSerializer

    def get(self, request):
        return super().get(request, self.model, self.serializer_class)

class UnitAPIView(CommonAPIView):
    model = Unit
    serializer_class = UnitSerializer

    def get(self, request, pk):
        return super().get(request, self.model, self.serializer_class, pk)

    def put(self, request, pk):
        return super().put(request, self.model, self.serializer_class, pk)

    def delete(self, request, pk):
        return super().delete(request, self.model, pk)
    
    def post(self, request):
        return super().post(request, self.model, self.serializer_class)

########################################################################

##### Level #####

class LevelListAPIView(CommonAPIView):
    model = Level
    serializer_class = LevelSerializer

    def get(self, request):
        return super().get(request, self.model, self.serializer_class)

class LevelAPIView(CommonAPIView):
    model = Level
    serializer_class = LevelSerializer

    def get(self, request, pk):
        return super().get(request, self.model, self.serializer_class, pk)

    def put(self, request, pk):
        return super().put(request, self.model, self.serializer_class, pk)

    def delete(self, request, pk):
        return super().delete(request, self.model, pk)
    
    def post(self, request):
        return super().post(request, self.model, self.serializer_class)

########################################################################
##### ResearchType #####

class ResearchTypeListAPIView(CommonAPIView):
    model = ResearchType
    serializer_class = ResearchTypeSerializer

    def get(self, request):
        return super().get(request, self.model, self.serializer_class)

class ResearchTypeAPIView(CommonAPIView):
    model = ResearchType
    serializer_class = ResearchTypeSerializer

    def get(self, request, pk):
        return super().get(request, self.model, self.serializer_class, pk)

    def put(self, request, pk):
        return super().put(request, self.model, self.serializer_class, pk)

    def delete(self, request, pk):
        return super().delete(request, self.model, pk)
    
    def post(self, request):
        return super().post(request, self.model, self.serializer_class)

########################################################################

##### LeadUnit #####

class LeadUnitListAPIView(CommonAPIView):
    model = LeadUnit
    serializer_class = LeadUnitSerializer

    def get(self, request):
        return super().get(request, self.model, self.serializer_class)

class LeadUnitAPIView(CommonAPIView):
    model = LeadUnit
    serializer_class = LeadUnitSerializer

    def get(self, request, pk):
        return super().get(request, self.model, self.serializer_class, pk)

    def put(self, request, pk):
        return super().put(request, self.model, self.serializer_class, pk)

    def delete(self, request, pk):
        return super().delete(request, self.model, pk)
    
    def post(self, request):
        return super().post(request, self.model, self.serializer_class)

########################################################################

##### Research Activity #####

class ResearchActivityListAPIView(CommonAPIView):
    model = ResearchActivity
    serializer_class = ResearchActivitySerializer

    def get(self, request):
        return super().get(request, self.model, self.serializer_class)

class ResearchActivityAPIView(CommonAPIView):
    model = ResearchActivity
    serializer_class = ResearchActivitySerializer

    def get(self, request, pk):
        return super().get(request, self.model, self.serializer_class, pk)

    def put(self, request, pk):
        return super().put(request, self.model, self.serializer_class, pk)

    def delete(self, request, pk):
        return super().delete(request, self.model, pk)
    
    def post(self, request):
        return super().post(request, self.model, self.serializer_class)


########################################################################

##### Research ActivityCategory #####

class ResearchActivityCategoryListAPIView(CommonAPIView):
    model = ResearchActivityCategory
    serializer_class = ResearchActivityCategorySerializer

    def get(self, request):
        return super().get(request, self.model, self.serializer_class)

class ResearchActivityCategoryAPIView(CommonAPIView):
    model = ResearchActivityCategory
    serializer_class = ResearchActivityCategorySerializer

    def get(self, request, pk):
        return super().get(request, self.model, self.serializer_class, pk)

    def put(self, request, pk):
        return super().put(request, self.model, self.serializer_class, pk)

    def delete(self, request, pk):
        return super().delete(request, self.model, pk)
    
    def post(self, request):
        return super().post(request, self.model, self.serializer_class)
    

########################################################################

##### Research Activity Category By Research Activity #####

class ResearchActivityCategoryByResearchActivityAPIView(APIView):
    """
    API view to retrieve ResearchActivityCategories by ResearchActivity.
    """

    def get(self, request, research_activity_id):
        try:
            # Lấy ra các ResearchActivityCategory dựa trên research_activity_id
            categories = ResearchActivityCategory.objects.filter(research_activity__id=research_activity_id)
            
            # Serialize dữ liệu
            serializer = ResearchActivityCategorySerializer(categories, many=True)
            
            return Response(serializer.data, status=status.HTTP_200_OK)
        except ResearchActivityCategory.DoesNotExist:
            return Response({"detail": "ResearchActivityCategory not found"}, status=status.HTTP_404_NOT_FOUND)
    
########################################################################

##### Research Topic #####
class ResearchTopicListAPIView(CommonAPIView):
    model = ResearchTopic
    serializer_class = ResearchTopicSerializer

    def get(self, request):
        return super().get(request, self.model, self.serializer_class)

class ResearchTopicAPIView(CommonAPIView):
    model = ResearchTopic
    serializer_class = ResearchTopicSerializer

    def get(self, request, pk):
        return super().get(request, self.model, self.serializer_class, pk)

    def put(self, request, pk):
        return super().put(request, self.model, self.serializer_class, pk)

    def delete(self, request, pk):
        return super().delete(request, self.model, pk)

    def post(self, request):
        return super().post(request, self.model, self.serializer_class)