from django.shortcuts import render

import hashlib
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from . models import Teacher, Student, Course, TestQuestion, Test
from . serializers import TeacherSerializer, StudentSerializer, CourseSerializer, TestSerializer, TestQuestionSerializer, CourseTeacherSerializer

# from rest_framework.generics import ListAPIView
# from rest_framework.filters import OrderingFilter

class TeacherList(APIView):

    def get(self, request):
        teacher = Teacher.objects.all()
        serialized = TeacherSerializer(teacher, many=True)
        return Response(serialized.data)

    def post(self, request):
        serialize = TeacherSerializer(data=request.data)
        if serialize.is_valid():
            pre_passwd = serialize.validated_data.get('password')
            enc_pwd = hashlib.sha256(pre_passwd.encode()).hexdigest()
            serialize.validated_data['password'] = enc_pwd
            serialize.save()
            return Response( serialize.data, status=status.HTTP_201_CREATED)
        return Response(serialize.errors, status=status.HTTP_400_BAD_REQUEST)

class CourseAlter(APIView):

    def put(self, request, courseId, format=None):
        course = Course.objects.get(pk = courseId)
        serializer = CourseSerializer(course, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, courseId, format=None):
        courseId = Course.objects.get(pk =courseId)
        courseId.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)


class CourseList(APIView):

    def get(self, request):
        course = Course.objects.all()
        serialized = CourseSerializer(course, many=True)
        return Response(serialized.data)

    def post(self, request):
        serialize = CourseSerializer(data=request.data)
        if serialize.is_valid():
            serialize.save()
            return Response(serialize.data, status=status.HTTP_201_CREATED)
        return Response(serialize.errors, status=status.HTTP_400_BAD_REQUEST)

class StudentList(APIView):

    def get(self, request):
        student = Student.objects.all()
        serialized = StudentSerializer(student, many=True)
        return Response(serialized.data)

    def post(self, request):
        serialize = StudentSerializer(data=request.data)
        if serialize.is_valid():
            serialize.save()
            return Response(serialize.data, status=status.HTTP_201_CREATED)
        return Response(serialize.errors, status=status.HTTP_400_BAD_REQUEST)

class CourseTeacher(APIView):

    def get(self, request):
        course = Course.objects.all()
        serialized = CourseTeacherSerializer(course, many=True)
        return Response(serialized.data)

class Test(APIView):

    def get(self,request):
        test = Test.objects.all()
        serializedTest = TestSerializer(test, many = True)
        return Response(serializedTest.data)

## Incomplete