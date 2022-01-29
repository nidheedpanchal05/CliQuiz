import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { URL } from '../../../components/url';
import axios from 'axios';
import { useFetch } from '../../../hooks/useFetch';
import './course.css';

function Course() {
  const { id } = useParams();
  const [course, setCourse] = useState({});
  const { item } = useFetch(URL + 'tests/');

  useEffect(() => {
    const getcourse = axios
      .get(URL + 'course')
      .then((res) =>
        setCourse(res.data.find((elem) => elem.course_id === parseInt(id)))
      );
  }, [id]);

  return (
    <main>
      <header className='header'>
        <h1>{course.name}</h1>
      </header>
      <div>
        <h3>Upcoming Tests</h3>

        {item
          .filter((t) => t.course === course.course_id)
          .map((test) => {
            if (test.start_at) {
            }
            return (
              <div>
                <p className='info'>{test.title}</p>
                <p>Start Date: {test.start_at}</p>
                <p>End Date: {test.end_at}</p>
              </div>
            );
          })}
      </div>
    </main>
  );
}

export default Course;
