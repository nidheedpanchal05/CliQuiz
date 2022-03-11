from django.shortcuts import render

import hashlib
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import serializers, status
from . models import Teacher, Student, Course, Answer, TestQuestion, Test, StudentCourse
from . serializers import AnswerSerializer, QuestionSerializer, RandomQuestionSerializer, StudentCourseSerializer, TeacherSerializer, StudentSerializer, CourseSerializer, TestSerializer, TestQuestionSerializer, CourseTeacherSerializer

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

class StudentCourseList(APIView):
    def get(self, request):
        course = StudentCourse.objects.all()
        serialized = StudentCourseSerializer(course, many=True)
        return Response(serialized.data)

    def post(self, request):
        serialize = StudentCourseSerializer(data=request.data)
        if serialize.is_valid() :
            serialize.save()
            return Response(serialize.data, status=status.HTTP_201_CREATED)
        return Response(serialize.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, courseId, format=None):
        courseId = StudentCourse.objects.get(pk =courseId)
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

class TestList(APIView):

    def get(self,request):
        test = Test.objects.all()
        serializedTest = TestSerializer(test, many = True)
        return Response(serializedTest.data)

    def post(self, request):
        serialize = TestSerializer(data=request.data)
        if serialize.is_valid():
            serialize.save()
            return Response(serialize.data, status=status.HTTP_201_CREATED)
        return Response(serialize.errors, status=status.HTTP_400_BAD_REQUEST)

class AlterTest(APIView):
    def get(self,request, testid):
        test = Test.objects.get(pk=testid)
        serializedTest = TestSerializer(test)
        return Response(serializedTest.data)
 
    def put(self, request, testid, format=None):
        test = Test.objects.get(pk = testid)
        serializer = TestSerializer(test, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, testid, format=None):
        test = Test.objects.get(pk =testid)
        test.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)

class TestQuestionList(APIView):
    def get(self,request):
        testq = TestQuestion.objects.all()
        serializedTest = QuestionSerializer(testq, many = True)
        return Response(serializedTest.data)

    def post(self, request):
        serialize = QuestionSerializer(data=request.data)
        if serialize.is_valid():
            serialize.save()
            return Response(serialize.data, status=status.HTTP_201_CREATED)
        return Response(serialize.errors, status=status.HTTP_400_BAD_REQUEST)


class AnswerList(APIView):
    def get(self,request):
        ans = Answer.objects.all()
        serializedTest = AnswerSerializer(ans, many = True)
        return Response(serializedTest.data)

    def post(self, request):
        serialize = AnswerSerializer(data=request.data)
        if serialize.is_valid():
            serialize.save()
            return Response(serialize.data, status=status.HTTP_201_CREATED)
        return Response(serialize.errors, status=status.HTTP_400_BAD_REQUEST)


class RandomQuestionList(APIView):
    def get(self, request, format=None, **kwargs):
        question = Test.objects.all()
        serializedQues = RandomQuestionSerializer(question, many = True)
        return Response(serializedQues.data)

## Incomplete