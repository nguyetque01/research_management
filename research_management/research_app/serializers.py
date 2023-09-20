from rest_framework import serializers
from .models import CustomUser, ResearchTopic, ResearchTopicRegistrationForm

##### USERS #####

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = CustomUser
        fields = '__all__'

class UserUpdateSerializer(serializers.ModelSerializer):
    class Meta:
        model = CustomUser
        fields = '__all__'


################################################################################################

##### RESEARCH TOPICS #####

class ResearchTopicSerializer(serializers.ModelSerializer):
    class Meta:
        model = ResearchTopic
        fields = '__all__'

################################################################################################

##### RESEARCH TOPICS #####

class ResearchTopicRegistrationSerializer(serializers.ModelSerializer):
    class Meta:
        model = ResearchTopicRegistrationForm
        fields = '__all__'

################################################################################################