import React, { useState } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { Link } from 'react-router-dom';
import Modal from './CourseList/AddCourse/AddCourseModal';
import CourseList from './CourseList/CourseList';
import './teacherHome.css';

const TeacherHome = () => {
  const teacherLogin = localStorage.getItem('login');
  const teacher = JSON.parse(teacherLogin);
  const [show, setShow] = useState(false);

  const showModal = () => {
    setShow(true);
  };

  return (
    <div className='main'>
      <Router>
        <div>
          <ul className='vertical-nav-container'>
            <li>
              <Link to='/teacherHome'>Courses</Link>
            </li>
            <li>
              <Link to='/create-test'> Create Test</Link>
            </li>
            <li>
              <Link to='/result'>Declare Results</Link>
            </li>
            <li>
              <Link to='/manual-assessment'>Manual Accessment</Link>
            </li>

            <li>
              <Link to='/share'>Share</Link>
            </li>
          </ul>
        </div>
        <div>
          <Switch>
            <Route exact path='/teacherHome'>
              <CourseList teacher={teacher} />
            </Route>
            <Route path='/teacherHome/add-course'>
              <Modal show={showModal} teacher={teacher.teacher_id} />
            </Route>
          </Switch>
        </div>
      </Router>
    </div>
  );
};

export default TeacherHome;
