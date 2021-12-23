import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useFetch } from '../../hooks/useFetch';
import { URL, IMAGE_BASE_URL } from '../../components/url';
import placeholder from './placeholder-avatar.png';
import { FaUserGraduate, FaArrowAltCircleRight } from 'react-icons/fa';
import '../register/Register.css';

const Register = () => {
  const { tLoading, item } = useFetch(URL + 'teacher/');
  //const { sLoading, student } = useFetch(URL + 'student/');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [repassword, setRePassword] = useState('');
  const [role, setRole] = useState('');
  let defaultAvatar = {
    src: '',
    alt: '',
    image: null,
  };

  const [avatar, setAvatar] = useState(defaultAvatar);

  const handleImg = (e) => {
    if (e.target.files[0]) {
      setAvatar({
        src: window.URL.createObjectURL(e.target.files[0]),
        alt: e.target.files[0].name,
        image: e.target.files[0],
      });
    }
    console.log(e.target.files[0]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (role === 'TEACHER') {
      const teacherExists = item.find((teacher) => teacher.email === email);
      if (teacherExists) {
        console.log(teacherExists, 'exists');
        alert('Teacher with this email already exists');
      } else if (avatar.src === '') {
        alert('Image not selected');
      } else {
        console.log(avatar);
        let form_data = new FormData();
        form_data.append('name', name);
        form_data.append('email', email);
        form_data.append('password', password);
        form_data.append('teacher_avtar', avatar.image);
        axios
          .post('http://127.0.0.1:8000/teacher/', form_data)
          .then((res) => {
            console.log(res);
            if (res.status === 201) {
              alert('Registration Successful');
              setName('');
              setEmail('');
              setPassword('');
              setRePassword('');
              setRole('');
              setAvatar(defaultAvatar);
            }
          })
          .catch((err) => console.log(err));
      }
    }
  };

  return (
    <div className='container'>
      <form
        className='form-container'
        action='post'
        onSubmit={(e) => handleSubmit(e)}
        autoComplete='off'
      >
        <h1>
          <span>
            <FaUserGraduate />
          </span>
          Sign Up
        </h1>
        <div className='form-part1'>
          <input
            type='text'
            name='username'
            value={name}
            onChange={(e) => setName(e.target.value)}
            id='username'
            placeholder='User Name'
            required
          />

          <input
            type='email'
            name='email'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            id='email'
            placeholder='Email'
            required
          />
        </div>
        {name && email.match(/^\S+@\S+\.\S+$/) ? (
          <div className='form-part2'>
            <input
              type='password'
              name='set-password'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              id='set-password'
              placeholder='Set New Password'
              autoComplete='off'
              required
            />
            <input
              type='password'
              name='confirm-password'
              value={repassword}
              onChange={(e) => setRePassword(e.target.value)}
              id='confirm-password'
              placeholder='Confirm Password'
              autoComplete='off'
              required
            />
            {password && repassword && password === repassword ? (
              <div className='form-part3'>
                <ul>
                  Register as a:
                  <li>
                    <input
                      type='radio'
                      value='TEACHER'
                      name='role'
                      id='teacher'
                      onChange={(e) => setRole(e.target.value)}
                      required
                    />
                    <label htmlFor='teacher'>Teacher</label>
                  </li>
                  <li>
                    <input
                      type='radio'
                      value='STUDENT'
                      name='role'
                      id='student'
                      onChange={(e) => setRole(e.target.value)}
                      required
                    />
                    <label htmlFor='student'>Student</label>
                  </li>
                </ul>
                <label className='image-selector' htmlFor='avatar'>
                  Select Image
                  <img
                    src={avatar.src ? avatar.src : placeholder}
                    alt={avatar.alt ? 'Upload Image' : 'Default'}
                    className='avatar'
                  />
                </label>
                <input
                  className='avatar-upload'
                  onChange={handleImg}
                  type='file'
                  accept='.png, .jpg, .jpeg'
                  name='avatar'
                  id='avatar'
                  autoComplete='off'
                />

                <button type='submit' className='signup-btn'>
                  SIGN UP
                </button>
              </div>
            ) : (
              <span className='message'>
                <FaArrowAltCircleRight />
                New password and Confirm Password should match.
              </span>
            )}
          </div>
        ) : (
          <span className='message'>
            <FaArrowAltCircleRight />
            Enter Valid Username and Email to Proceed
          </span>
        )}
        <hr
          style={{
            border: '1px whitesmoke solid',
            padding: '0px',
            margin: '0px',
          }}
        />
        <p className='switch'>
          Already Registered ?<Link to='/'>Login</Link>
        </p>
      </form>
    </div>
  );
};

export default Register;
