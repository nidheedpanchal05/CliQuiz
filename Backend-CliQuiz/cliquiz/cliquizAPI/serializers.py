from django.db.models import fields
from rest_framework import serializers
from . models import Teacher, Student, Course, TestQuestion, Test, StudentCourse
class TeacherSerializer(serializers.ModelSerializer):
    class Meta:
        model = Teacher
        fields = '__all__'

class CourseSerializer(serializers.ModelSerializer):
    class Meta:
        model = Course
        fields = '__all__'

class StudentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Student
        fields = '__all__'

class TestSerializer(serializers.ModelSerializer):
    class Meta:
        model = Test
        fields = '__all__'

class TestQuestionSerializer(serializers.ModelSerializer):
    class Meta:
        model = TestQuestion
        fields = '__all__'



class CourseTeacherSerializer(serializers.ModelSerializer):
    teacher = TeacherSerializer()

    class Meta:
        model = Course
        fields = ('course_id', 'name', 'description', 'course_code', 'teacher')

class StudentCourseSerializer(serializers.ModelSerializer):
    class Meta:
        model = StudentCourse
        fields = '__all__'