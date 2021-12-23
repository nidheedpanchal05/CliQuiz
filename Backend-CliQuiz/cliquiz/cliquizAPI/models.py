from django.db import models
from django.db.models.fields.related import ForeignKey
import random
import string
import time

def unique_course_code():
    course_code = "".join(random.sample( "".join(random.choices(string.ascii_uppercase + string.digits, k=4)) + str(time.time())[-2:], k=6))
    return course_code

class Teacher(models.Model):
    teacher_id = models.AutoField(auto_created=True, primary_key=True)
    name = models.CharField(max_length=80)
    email = models.EmailField(max_length=30, unique=True)
    password = models.CharField(max_length=20)
    t_avtar = models.ImageField(name='teacher_avtar')
    date_joined = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.name

class Course(models.Model):
    course_id = models.AutoField(auto_created=True, primary_key=True)
    name = models.CharField(max_length=80)
    description = models.CharField(max_length=255)
    course_code = models.CharField(max_length=10 ,default=unique_course_code, editable=False, unique=True)
    teacher = ForeignKey(Teacher, on_delete=models.CASCADE, related_name='teacher')

    def __unicode__(self):
        return self.course_code

    def get_absolute_url(self):
        return reverse("course:details", kwargs={"course_id": self.course_id})
    
    def __str__(self):
        return self.name

class Student(models.Model):
    student_id = models.AutoField(auto_created=True,primary_key=True)
    name = models.CharField(max_length=80)
    email = models.EmailField(max_length=30, unique=True)
    password = models.CharField(max_length=20)
    s_avtar = models.ImageField(name='student_avtar')
    date_joined = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.name

class Test(models.Model):
    test_id = models.AutoField(auto_created=True, primary_key=True)
    title = models.CharField(max_length=40)
    description = models.CharField(max_length=200)
    test_type = models.CharField(max_length=15)
    date_created = models.DateTimeField(auto_now_add=True)
    start_at = models.DateTimeField()
    end_at = models.DateTimeField()
    max_grade = models.IntegerField()
    course = models.ForeignKey(Course, on_delete=models.CASCADE)

    class Meta:
        ordering = ('-date_created',)

    def __str__(self):
        return self.title

class TestQuestion(models.Model):
    ques_id = models.AutoField(auto_created=True, primary_key=True)
    ques = models.TextField()
    ques_type = models.CharField(max_length=30, )
    correct_answer = models.TextField()
    grade = models.IntegerField()
    test_id = models.ForeignKey(Test, on_delete=models.CASCADE)

    def __str__(self):
        return self.ques

