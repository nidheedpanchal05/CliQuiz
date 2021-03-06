import axios from 'axios';
import { URL } from '../../../../components/url';
import React, { useState, useEffect } from 'react';
import { FaCopy, FaTimes, FaTrash, FaStepBackward } from 'react-icons/fa';
import { Link, useHistory, useParams } from 'react-router-dom';
import { useFetch } from '../../../../hooks/useFetch';
import './SingleCourse.css';

function SingleCourse() {
  const history = useHistory();
  const { id } = useParams();
  const [course, setCourse] = useState([]);
  const { item, getItems } = useFetch(URL + 'student/');
  const [enroledStudents, setEnroledStudents] = useState([]);
  const [email, setEmail] = useState('');
  const [showList, setShowList] = useState(false);

  useEffect(() => {
    axios.get(URL + 'course/').then((res) => {
      setCourse(res.data.find((course) => course.course_id === parseInt(id)));
    });

    axios.get(URL + 'courses-enrolled/').then((res) => {
      setEnroledStudents(res.data);
    });
  }, [showList, email, item]);

  if (showList) {
    const studentList = () => {
      let newList = [];
      item.map((s) => {
        return enroledStudents.map((elem) => {
          if (
            elem.course === course.course_id &&
            s.student_id === elem.student
          ) {
            newList.push(s);
          }
        });
      });
      return newList;
    };

    studentList();

    const handleSubmit = (e) => {
      e.preventDefault();
      const newStudent = item.find((s) => s.email === email);

      if (newStudent !== '' && newStudent !== undefined) {
        const newData = {
          status: 'active',
          course: course.course_id,
          student: newStudent.student_id,
        };
        axios
          .post(URL + 'courses-enrolled/', newData)
          .then((res) => alert('Successfully added' + newStudent.name))
          .catch((err) => {
            console.log(err);
            alert('Already Enrolled');
          });
        setEmail('');
        getItems();
      } else {
        alert('Please check and verify Email id correct');
      }
      setEmail('');
    };

    const removeStudent = (student) => {
      // find student to remove
      const selectedStudent = enroledStudents.find(
        (s) => s.student === student.student_id
      );

      if (window.confirm('Remove Student ' + student.name + '? ')) {
        axios
          .delete(
            URL + `courses-enrolled/${selectedStudent.id}`,
            selectedStudent.id
          )
          .then((res) => {
            getItems();
            studentList();
          })
          .catch((err) => alert('Failed'));
      }
    };

    return (
      <div className='modal'>
        <div className='modal-header'>
          <h1>Students Enrolled </h1>
          <button className='closeModal' onClick={() => setShowList(false)}>
            <FaTimes />
          </button>
        </div>
        <div className='modal-main'>
          <h3 className='info'>Ask student for the email address </h3>
          <form className='form' onSubmit={(e) => handleSubmit(e)}>
            <input
              type='email'
              name='studentemail'
              id='studentemail'
              placeholder='Student Email'
              className='name'
              value={email}
              required
              onChange={(e) => setEmail(e.target.value)}
            />
            <button type='submit' className='btn'>
              Add
            </button>
          </form>
          <ul>
            {studentList().length === 0 ? (
              <p className='info'>No Student Enrolled</p>
            ) : (
              studentList().map((stud) => {
                return (
                  <li key={stud.student_id}>
                    {stud.name}
                    <button className='trash'>
                      <FaTrash onClick={() => removeStudent(stud)} />
                    </button>
                  </li>
                );
              })
            )}
          </ul>
        </div>
      </div>
    );
  }

  return (
    <div className='course-main'>
      <button className='back' onClick={() => history.goBack()}>
        <FaStepBackward />
      </button>
      <div className='course-actions'>
        <Link
          className='btn'
          to={`/teacher-home/create-test/${course.course_id}`}
        >
          Create Test
        </Link>

        <button onClick={() => setShowList(true)} className='btn'>
          Students
        </button>
        <Link to={`/teacher-home/tests/${course.course_id}`} className='btn'>
          Scheduled Tests
        </Link>
      </div>
      <div className='course-details'>
        <h1 className='title'>{course.name}</h1>

        <blockquote className='info'>
          About Course: {course.description}
        </blockquote>

        <p>
          Invite Students to enroll via Course Code. Click on the Course Code
          below to copy
        </p>
        <button
          className='course-code'
          onClick={() => {
            navigator.clipboard.writeText(course.course_code);
          }}
        >
          {course.course_code} <FaCopy />
        </button>
      </div>
    </div>
  );
}

export default SingleCourse;
