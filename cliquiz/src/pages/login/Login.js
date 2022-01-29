import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { FaUserGraduate } from 'react-icons/fa';
import { URL } from '../../components/url';
import axios from 'axios';
import image from '../../assets/Images/handImage.png';
import './Login.css';

const Login = () => {
  const history = useHistory();
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [studentList, setStudents] = useState([]);
  const [teacherList, setTeachers] = useState([]);

  useEffect(() => {
    const getStudent = axios.get(URL + 'student/').then((res) => {
      setStudents(res.data);
    });
    const getTeacher = axios.get(URL + 'teacher/').then((res) => {
      setTeachers(res.data);
    });

    if (localStorage.getItem('teacher-login')) {
      let teacherLogged = JSON.parse(localStorage.getItem('teacher-login'));
      history.push('/teacher-home');
    }

    if (localStorage.getItem('student-login')) {
      let studentLogged = JSON.parse(localStorage.getItem('teacher-login'));
      history.push('/student');
    }
  }, [email, password]);

  const handleSubmit = (e) => {
    e.preventDefault();

    // Teacher Login
    const existingTeacher = teacherList.find(
      (teacher) => teacher.email === email
    );
    if (email && password) {
      if (
        existingTeacher &&
        existingTeacher.email &&
        existingTeacher.password
      ) {
        if (existingTeacher.email === email) {
          if (existingTeacher.password === password) {
            history.push('/teacher-home');
            localStorage.setItem(
              'teacher-login',
              JSON.stringify(existingTeacher)
            );
            window.location.reload(true);
            alert('Teacher Login Success:  ' + existingTeacher.name);
          } else {
            alert('Password Invalid');
          }
        }
      } else {
        // Student Login
        const existingStudent = studentList.find(
          (teacher) => teacher.email === email
        );
        if (email && password) {
          if (
            existingStudent &&
            existingStudent.email &&
            existingStudent.password
          ) {
            if (existingStudent.email === email) {
              if (existingStudent.password === password) {
                history.push('/student');
                localStorage.setItem(
                  'student-login',
                  JSON.stringify(existingStudent)
                );
                window.location.reload(true);
                alert('Student Login Success:  ' + existingStudent.name);
              } else {
                alert('Password Invalid');
              }
            }
          } else {
            alert('Invalid Credentials');
          }
        }
      }
    }
  };

  return (
    <div className='container'>
      <div className='img-container'>
        <img className='img-illustration' src={image} alt='Hand' srcset='' />
      </div>
      <form className='signin-form-container' onSubmit={handleSubmit}>
        <h1>
          <span>
            <FaUserGraduate />
          </span>
          Sign In
        </h1>
        <div className='fields'>
          <input
            type='email'
            name='email'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            id='email'
            placeholder='Email'
            required
          />
          <input
            type='password'
            name='password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder='Password'
            required
          />
          <button type='submit' className='signin-btn'>
            SIGN IN
          </button>
        </div>
        <hr
          style={{
            border: '1px whitesmoke solid',
            padding: '0px',
            margin: '0px',
          }}
        />
        <p className='switch'>
          Not Registered ?<Link to='/signup'>Create account</Link>
        </p>
      </form>
    </div>
  );
};

export default Login;
