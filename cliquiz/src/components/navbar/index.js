import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Register from '../../pages/register/Register';
import TeacherHome from '../../pages/teacher/TeacherHome';
import Login from '../../pages/login/Login';
import NavbarElements from './navbarElements';
import Profile from '../../pages/profile/Profile';

const index = () => {
  return (
    <Router>
      <NavbarElements />
      <Switch>
        <Route exact path='/'>
          <Login />
        </Route>
        <Route path='/signup'>
          <Register />
        </Route>
        <Route path='/teacher-profile'>
          <Profile />
        </Route>
        <Route path='/teacherHome'>
          <TeacherHome />
        </Route>
      </Switch>
    </Router>
  );
};

export default index;
