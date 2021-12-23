import React, { useEffect, useState } from 'react';
import { useFetch } from '../../../hooks/useFetch';
import { URL } from '../../../components/url';
import { Link } from 'react-router-dom';
import { FaCopy, FaEdit, FaTrash, FaTimes } from 'react-icons/fa';
import './courseList.css';
import axios from 'axios';

const url = URL + 'course/';
function CourseList(props) {
  const { teacher } = props;
  const { isLoading, item, getItems } = useFetch(url);
  const [name, setName] = useState('');
  const [desc, setDesc] = useState('');
  const [show, setShow] = useState(false);
  const [course, setCourse] = useState('');

  const editCourse = (courseId) => {
    setShow(true);
    const selectedCourse = item.find((course) => course.course_id === courseId);
    setCourse(selectedCourse.course_id);
    setName(selectedCourse.name);
    setDesc(selectedCourse.description);
  };

  const deleteCourse = (courseId) => {
    axios.delete(url + `${courseId}/`, courseId);
    setTimeout(() => {
      getItems();
      console.log('Course Deleted' + courseId);
    }, 500);
  };

  if (isLoading) {
    return <p>Loading</p>;
  } else if (show) {
    const handleUpdate = (e) => {
      e.preventDefault();
      let data = {
        teacher: teacher.teacher_id,
        name: name,
        description: desc,
      };

      axios
        .put(url + `${course}/`, data)
        .then((res) => console.log(res))
        .catch((err) => console.log(err));
      console.log('updated');
      setTimeout(() => {
        setShow(false);
        getItems();
      }, 500);
    };
    return (
      <div className='modal'>
        <div className='modal-header'>
          <h1>Update Course </h1>
          <button className='closeModal' onClick={() => setShow(false)}>
            <FaTimes />
          </button>
        </div>

        <form className='addCourseForm' onSubmit={handleUpdate}>
          <input
            type='text'
            name='title'
            id='name'
            placeholder='Course Name'
            required
            value={name}
            onChange={(e) => {
              setName(e.target.value);
            }}
          />
          <input
            type='text'
            name='description'
            id='desc'
            placeholder='Add Description...'
            maxLength='200'
            required
            value={desc}
            onChange={(e) => {
              setDesc(e.target.value);
            }}
          />
          <button type='submit'>Update</button>
        </form>
      </div>
    );
  }
  return (
    <div className='course-parent'>
      <h1 className='course-header header'>Courses</h1>
      <Link className='course-add' to='/teacherHome/add-course'>
        Add Course
      </Link>

      <div className='course-container'>
        {isLoading
          ? 'Loading...'
          : item
          ? item
              .filter((course) => teacher.teacher_id === course.teacher)
              .map((course) => {
                return (
                  <div className='single-course' key={course.course_id}>
                    <div className='course-title'>
                      <h2>{course.name}</h2>
                      <div className='alter-course'>
                        <FaEdit onClick={() => editCourse(course.course_id)} />
                        <FaTrash
                          onClick={() => deleteCourse(course.course_id)}
                        />
                      </div>
                    </div>

                    <p>{course.description}</p>
                    <p>
                      <span style={{ marginRight: '1rem ' }}>Course Code</span>
                      <button
                        className='course-code'
                        onClick={() => {
                          navigator.clipboard.writeText(course.course_code);
                          console.log('Copied');
                        }}
                      >
                        {course.course_code}
                        <FaCopy />
                      </button>
                    </p>
                  </div>
                );
              })
          : 'No Course Added'}
      </div>
    </div>
  );
}

export default CourseList;
