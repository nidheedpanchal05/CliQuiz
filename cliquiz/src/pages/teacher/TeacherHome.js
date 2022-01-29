import React, { useState } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { Link } from 'react-router-dom';
import Modal from './Course/AddCourse/AddCourseModal';
import CourseList from './Course/CourseHome/CourseList';
import CreateTest from './Tests/CreateTest/CreateTest';
import SingleCourse from './Course/SingleCourse/SingleCourse';
import './teacherHome.css';
import AddQuestion from './Tests/AddQuestions/AddQuestion';

const TeacherHome = () => {
  const teacherLogin = localStorage.getItem('teacher-login');
  const teacher = JSON.parse(teacherLogin);
  const [show, setShow] = useState(false);

  const showModal = () => {
    setShow(true);
  };

  return (
    <Router>
      {/*
          
          
        <div>
          <ul className='vertical-nav-container'>
            <li>
              <Link to='/teacher-home'>Courses</Link>
            </li>
            <li>
              <Link to='/teacher-home/result'>Declare Results</Link>
            </li>
            <li>
              <Link to='/teacher-home/manual-assessment'>
                Manual Accessment
              </Link>
            </li>
            <li>
              <Link to='/teacher-home/share'>Share</Link>
            </li>
          </ul>
        </div>
        */}
      <div>
        <Switch>
          <Route exact path='/teacher-home'>
            <CourseList teacher={teacher} />
          </Route>
          <Route path='/teacher-home/add-course'>
            <Modal show={showModal} teacher={teacher} />
          </Route>
          <Route
            exact
            path='/teacher-home/course/:id'
            children={<SingleCourse />}
          />
          <Route
            exact
            path='/teacher-home/create-test/:id'
            children={<CreateTest />}
          />
          <Route
            exact
            path='/teacher-home/create-test/:id/:test_id/questions'
            children={<AddQuestion />}
          />

          <Route path='*'>
            <h1>Error</h1>
          </Route>
        </Switch>
      </div>
    </Router>
  );
};

export default TeacherHome;
