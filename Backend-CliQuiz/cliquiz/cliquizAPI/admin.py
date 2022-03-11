from django.contrib import admin
from .models import Answer, StudentCourse, Teacher, Course, Student, Test, TestQuestion
# Register your models here.

admin.site.register(Teacher)
admin.site.register(Course)
admin.site.register(Student)
admin.site.register(Test)
admin.site.register(TestQuestion)
admin.site.register(StudentCourse)
admin.site.register(Answer)