"""cliquiz URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/3.2/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path, include
from . cliquizAPI import views
# from rest_framework.authtoken.views import obtain_auth_token

urlpatterns = [
    path('admin/', admin.site.urls),
    path('teacher/', views.TeacherList.as_view()),
    path('course/', views.CourseList.as_view()),
    path('teacher-course/', views.CourseTeacher.as_view()),
    path('student/', views.StudentList.as_view()),
    path('course/<int:courseId>/', views.CourseAlter.as_view())
    # path('auth/', obtain_auth_token),
    ]
