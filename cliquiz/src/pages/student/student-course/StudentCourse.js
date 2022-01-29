import React, { useEffect, useState } from 'react';
import { FaTimes } from 'react-icons/fa';
import './student-course.css';
import { Link } from 'react-router-dom';

import { useFetch } from '../../../hooks/useFetch';
import { URL } from '../../../components/url';
import axios from 'axios';

const url = URL + 'courses-enrolled/';

function StudentCourse(props) {
  const { item, getItems } = useFetch(url);
  const { student } = props;
  const [courseList, setCourseList] = useState([]);
  const [show, setShow] = useState(false);
  const [code, setCode] = useState('');

  useEffect(() => {
    const data = axios
      .get(URL + 'course/')
      .then((res) => setCourseList(res.data));
  }, [item, url]);

  let enrolledList = () => {
    return item.filter((stud) => stud.student === student.student_id);
  };

  const unenrolStudent = (course) => {
    const c = courseList.find((c) => c.course_id === course.course);
    if (window.confirm('Unenrol from ' + c.name)) {
      const unenrol = axios
        .delete(url + `${course.id}`, course.id)
        .then((res) => window.location.reload())
        .catch((err) => window.location.reload());
    }
  };

  if (show) {
    const handleSubmit = (e) => {
      e.preventDefault();
      const existingCourse = courseList.find(
        (course) => course.course_code === code
      );
      if (existingCourse && code !== '') {
        const enrollmentData = {
          status: 'active',
          course: existingCourse.course_id,
          student: student.student_id,
        };
        const enrolStudent = axios
          .post(url, enrollmentData)
          .then(
            (res) => alert('Successfully Enrolled in ' + existingCourse.name),
            window.location.reload()
          )
          .catch((err) => {
            console.log(err);
            alert('You are Already Enrolled in ' + existingCourse.name);
          });
        setShow(false);
        setCode('');
      } else {
        alert('Please Enter Correct Code');
      }
    };

    return (
      <div className='modal'>
        <header className='modal-header'>
          <h1>Join Course</h1>
          <button onClick={() => setShow(false)}>
            <FaTimes />
          </button>
        </header>
        <form className='join-course' onSubmit={handleSubmit}>
          <h3>Course Code</h3>
          <p>Ask your teacher for the course code, then enter it here.</p>
          <input
            type='text'
            name='code'
            id='code'
            required
            placeholder='Enter Course Code'
            value={code}
            onChange={(e) => setCode(e.target.value)}
          />
          <br />
          <blockquote>
            Course code must consists of 6 Alpha-Numeric characters
          </blockquote>
          <button type='submit' className='btn'>
            JOIN
          </button>
        </form>
      </div>
    );
  }

  return (
    <main className='course-parent main'>
      <h1 className='course-header header'>Courses</h1>
      <section className='container'>
        <button className='course-add btn' onClick={() => setShow(true)}>
          Join Course
        </button>
        <div className='course-container'>
          {enrolledList().map((enrolled) => {
            <p> Courses you are enrolled in</p>;

            const list = courseList.filter(
              (c) => c.course_id === enrolled.course
            );
            return list.map((course) => {
              return (
                <div key={course.course_id} className='single-course'>
                  <header className='course-title'>
                    <Link
                      to={`student/course/${course.course_id}`}
                      className='title'
                    >
                      {course.name}
                    </Link>
                    <strong
                      className='unenrol'
                      onClick={() => unenrolStudent(enrolled)}
                    >
                      Unenrol
                    </strong>
                  </header>
                  <blockquote className='info'>{course.description}</blockquote>
                </div>
              );
            });
          })}
        </div>
      </section>
    </main>
  );
}

export default StudentCourse;
