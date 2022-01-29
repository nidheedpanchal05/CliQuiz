import React from 'react';
import { Link } from 'react-router-dom';
import { useHistory } from 'react-router-dom';
import logo from '../../assets/logo.png';
import './navbar.css';

const NavbarElements = () => {
  const history = useHistory();

  const handleLogout = () => {
    localStorage.clear();
    history.push('/');
    const reloadWindow = window.location.reload();
  };

  const StudentLoggedLinks = [
    <Link to='/profile'>Profile</Link>,
    <Link to='/student' onClick={() => handleLogout()}>
      Logout
    </Link>,
  ];

  const TeacherLoggedLinks = [
    <Link to='/profile'>Profile</Link>,
    <Link to='/teacher-home' onClick={() => handleLogout()}>
      Logout
    </Link>,
  ];

  const LoggedOutLinks = [
    <Link to='/signup'>Register</Link>,
    <Link exact to='/'>
      Login
    </Link>,
  ];

  const teacherLogged = localStorage.getItem('teacher-login');
  const studentLogged = localStorage.getItem('student-login');

  return (
    <div className='nav-container'>
      <nav className='navbar'>
        <ul className='nav-list'>
          <img
            className='logo nav-list-item'
            src={logo}
            alt='Logo'
            onClick={() => history.push('/')}
          />
          {teacherLogged || studentLogged
            ? teacherLogged
              ? TeacherLoggedLinks.map((elem, index) => {
                  return (
                    <li key={index} className='nav-list-item'>
                      {elem}
                    </li>
                  );
                })
              : StudentLoggedLinks.map((elem, index) => {
                  return (
                    <li key={index} className='nav-list-item'>
                      {elem}
                    </li>
                  );
                })
            : LoggedOutLinks.map((elem, index) => {
                return (
                  <li key={index} className='nav-list-item'>
                    {elem}
                  </li>
                );
              })}
        </ul>
      </nav>
    </div>
  );
};

export default NavbarElements;
