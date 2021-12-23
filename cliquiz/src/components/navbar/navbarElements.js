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
    window.location.reload();
  };

  const LoggedInLinks = [
    <Link to='/teacher-profile'>Profile</Link>,
    <Link to='/teacherHome' onClick={handleLogout}>
      Logout
    </Link>,
  ];

  const LoggedOutLinks = [
    <Link to='/signup'>Register</Link>,
    <Link to='/'>Login</Link>,
  ];

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
          {localStorage.getItem('login')
            ? (history.push('/teacherHome'),
              LoggedInLinks.map((elem, index) => {
                return (
                  <li key={index} className='nav-list-item'>
                    {elem}
                  </li>
                );
              }))
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
