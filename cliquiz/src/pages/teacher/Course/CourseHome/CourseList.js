import React, { useState } from 'react';
import { useFetch } from '../../../../hooks/useFetch';
import { URL } from '../../../../components/url';
import { Link } from 'react-router-dom';
import { FaEdit, FaTrash, FaTimes } from 'react-icons/fa';
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

  const deleteCourse = (course) => {
    if (window.confirm('Delete course ' + course.name + ' ? ')) {
      axios.delete(url + `${course.course_id}/`, course.course_id);
      setTimeout(() => {
        getItems();
      }, 500);
    }
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

        <form className='courseForm' onSubmit={handleUpdate}>
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
          <button className='btn' type='submit'>
            Update
          </button>
        </form>
      </div>
    );
  }

  return (
    <div className='course-parent'>
      <h1 className='course-header header'>Courses</h1>
      <Link className='btn course-add' to='/teacher-home/add-course'>
        Add New Course
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
                      <Link
                        className='title'
                        to={`/teacher-home/course/${course.course_id}`}
                      >
                        {course.name}
                      </Link>

                      <div className='alter-course'>
                        <FaEdit onClick={() => editCourse(course.course_id)} />
                        <FaTrash onClick={() => deleteCourse(course)} />
                      </div>
                    </div>

                    <blockquote className='info'>
                      {course.description}
                    </blockquote>
                  </div>
                );
              })
          : 'No Course Added'}
      </div>
    </div>
  );
}

export default CourseList;
