import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Register from '../../pages/register/Register';
import TeacherHome from '../../pages/teacher/TeacherHome';
import StudentHome from '../../pages/student/StudentHome';
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
        <Route path='/profile'>
          <Profile />
        </Route>
        <Route path='/teacher-home'>
          <TeacherHome />
        </Route>
        <Route path='/student'>
          <StudentHome />
        </Route>
      </Switch>
    </Router>
  );
};

export default index;
