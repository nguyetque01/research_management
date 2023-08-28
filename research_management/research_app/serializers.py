from rest_framework import serializers
from .models import CustomUser

class RegistrationSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True)
    print(password)

    class Meta:
        model = CustomUser
        fields = ['username', 'password', 
                  'first_name', 'last_name', 
                  'birth_date', 'gender', 
                  'degree', 'phone', 
                  'email', 'address'
                ]

    def validate(self, data):
        # Kiểm tra xác thực cho từng trường dữ liệu
        if len(data['password']) < 8:
            raise serializers.ValidationError("Mật khẩu phải có ít nhất 8 ký tự.")
        
        # Thêm các kiểm tra khác tùy theo yêu cầu của bạn
        
        return data

    def create(self, validated_data):
        password = validated_data.pop('password')
        user = CustomUser(**validated_data)
        user.set_password(password)
        
        user.save()
        return user
    
class LoginSerializer(serializers.Serializer):
    username = serializers.CharField()
    password = serializers.CharField(write_only=True)

class CustomUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = CustomUser
        fields = '__all__'