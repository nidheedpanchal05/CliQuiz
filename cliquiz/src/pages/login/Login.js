import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { FaUserGraduate } from 'react-icons/fa';
import { URL } from '../../components/url';
import { useFetch } from '../../hooks/useFetch';
import './Login.css';

const Login = () => {
  const history = useHistory();
  const { loading, item } = useFetch(URL + 'teacher/');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');

  useEffect(() => {
    if (localStorage.getItem('login')) {
      let retrivedData = JSON.parse(localStorage.getItem('login'));
      history.push('/teacherHome');
    }
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    const existingUser = item.find((teacher) => teacher.email === email);
    console.log(existingUser);
    if (email && password) {
      if (existingUser && existingUser.email && existingUser.password) {
        if (existingUser.email === email) {
          if (existingUser.password === password) {
            history.push('/teacherHome');
            localStorage.setItem('login', JSON.stringify(existingUser));
            window.location.reload(true);
            alert('Login Success:  ' + existingUser.name);
          } else {
            alert('Password Invalid');
          }
        }
      } else {
        alert('Invalid Credentials');
      }
    }
  };

  return (
    <div className='container'>
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
