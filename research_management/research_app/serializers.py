from rest_framework import serializers
from .models import User, AcademicProfile, AcademicYear, Unit, LeadUnit, Level, ResearchType, ResearchActivity, ResearchActivityCategory, ResearchTopic

##### USERS #####

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = '__all__'

################################################################################################

##### Academic Profile #####

class AcademicProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = AcademicProfile
        fields = '__all__'

################################################################################################

##### Academic Year #####

class AcademicYearSerializer(serializers.ModelSerializer):
    class Meta:
        model = AcademicYear
        fields = '__all__'

###############################################################################################

##### Unit #####

class UnitSerializer(serializers.ModelSerializer):
    class Meta:
        model = Unit
        fields = '__all__'


###############################################################################################

##### LeadUnit #####

class LeadUnitSerializer(serializers.ModelSerializer):
    class Meta:
        model = LeadUnit
        fields = '__all__'

###############################################################################################

##### Level #####

class LevelSerializer(serializers.ModelSerializer):
    class Meta:
        model = Level
        fields = '__all__'


###############################################################################################

##### ResearchType #####

class ResearchTypeSerializer(serializers.ModelSerializer):
    class Meta:
        model = ResearchType
        fields = '__all__'

###############################################################################################

##### Research Activity #####

class ResearchActivitySerializer(serializers.ModelSerializer):
    class Meta:
        model = ResearchActivity
        fields = '__all__'

###############################################################################################

##### Research Activity Category #####

class ResearchActivityCategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = ResearchActivityCategory
        fields = '__all__'

###############################################################################################

##### Research Topic #####

class ResearchTopicSerializer(serializers.ModelSerializer):
    class Meta:
        model = ResearchTopic
        fields = '__all__'

###############################################################################################

