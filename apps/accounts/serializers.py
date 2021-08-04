from rest_framework import serializers
from apps.accounts.helpers import functions as help_funcs
from apps.accounts import models


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.User
        fields = ('id', 'username', 'password')
        extra_kwargs = {'password': {'write_only': True}}

    @help_funcs.hash_password_decorator
    def create(self, validated_data):
        return super().create(validated_data)

    @help_funcs.hash_password_decorator
    def update(self, instance, validated_data):
        return super().update(instance, validated_data)


class UserCourseSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.UserCourse
        fields = '__all__'


class UserWeekSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.UserWeek
        fields = '__all__'


class UserDaySerializer(serializers.ModelSerializer):
    class Meta:
        model = models.UserDay
        fields = '__all__'
