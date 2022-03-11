import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import StudentCourse from './student-course/StudentCourse';
import Course from './course/Course';
import Test from './Test/Test';

function StudentHome() {
  const student = JSON.parse(localStorage.getItem('student-login'));
  return (
    <Router>
      {/*           
            <ul className='vertical-nav-container'>
              <li>
                <Link to='/student'>Courses</Link>
              </li>
              <li>
                <Link to='/result'>Results</Link>
              </li>
              <li>
                <Link to='/dashboard'>Dashboard</Link>
              </li>

              <li>
                <Link to='/share'></Link>
              </li>
            </ul>
          </div>
           <div>
           
           */}
      <Switch>
        <Route exact path='/student/'>
          <StudentCourse student={student} />
        </Route>
        <Route path='/student/course/:id'>
          <Course />
        </Route>
        <Route path='/student/test/:testid'>
          <Test />
        </Route>
      </Switch>
    </Router>
  );
}

export default StudentHome;
