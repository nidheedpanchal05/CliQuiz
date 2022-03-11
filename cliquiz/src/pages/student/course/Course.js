import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { URL } from '../../../components/url';
import axios from 'axios';
import noTests from '../../../assets/Images/3d-findtest.png';
import { useFetch } from '../../../hooks/useFetch';
import Loading from '../../../helpers/Loading';
import './course.css';

var NoTest = ({ typeOfTest }) => {
  return (
    <div className='image-wrap'>
      <h3 className='header'>No {typeOfTest} Here</h3>
      <img className='no-img' src={noTests} alt='No Tests' />
    </div>
  );
};

function Course() {
  const { id } = useParams();
  const [course, setCourse] = useState({});
  const { item, loading } = useFetch(URL + 'test-details/');
  const [tests, setTests] = useState([]);

  useEffect(() => {
    const getcourse = axios
      .get(URL + 'course')
      .then((res) =>
        setCourse(res.data.find((elem) => elem.course_id === parseInt(id)))
      );

    setTests(item.filter((test) => test.course === parseInt(id)));
  }, [id, item]);

  console.log(
    tests.map((t) => {
      return new Date(t.end_at) + ' ' + new Date();
    })
  );

  let upcomingTests = tests.filter(
    (t) =>
      new Date(t.start_at) <= new Date() &&
      new Date() < new Date(t.end_at) &&
      t.test_status === 0
  );

  console.log(
    tests.filter(
      (t) =>
        new Date() >= new Date(t.start_at) &&
        new Date(t.end_at) > new Date() &&
        t.test_status === 1
    )
  );

  let prevTests = tests.filter(
    (t) => new Date() > new Date(t.start_at) && t.test_status === 2
  );

  if (loading) {
    return <Loading loadingText='Loading...' />;
  }

  return (
    <main className='main'>
      <header>
        <h1 align='center' className='title'>
          {course.name}
        </h1>
      </header>
      {upcomingTests.length === 0 && prevTests.length === 0 ? (
        <NoTest typeOfTest='Tests' />
      ) : (
        <div className='test-container'>
          {upcomingTests.length === 0 ? (
            <NoTest typeOfTest='Scheduled Tests' />
          ) : (
            <div className='upcoming-test'>
              <h2 className='header'>Scheduled Tests</h2>
              {upcomingTests.map((test) => {
                let startDateTime = new Date(test.start_at);
                startDateTime =
                  startDateTime.toLocaleDateString() +
                  ' ' +
                  startDateTime.toLocaleTimeString();
                let endDateTime = new Date(test.end_at);
                endDateTime =
                  endDateTime.toLocaleDateString() +
                  ' ' +
                  endDateTime.toLocaleTimeString();

                return (
                  <div key={test.testid} className='upcoming-question'>
                    <Link
                      to={`/student/test/${test.testid}`}
                      className='navlink'
                    >
                      <h4 className='test-title'>{test.title}</h4>
                      <p className='startDT'>
                        Start Date:
                        {startDateTime}
                      </p>
                      <p className='endDT'>
                        Due Date:
                        {endDateTime}
                      </p>
                      <p>Time Limit : {test.duration} Minutes</p>
                    </Link>
                  </div>
                );
              })}
            </div>
          )}
          {prevTests.length === 0 ? (
            <NoTest typeOfTest='Previous Tests' />
          ) : (
            <div className='previous-test'>
              <h2 className='header'>Previous Tests</h2>
              {prevTests.map((test) => {
                let endDateTime = new Date(test.end_at);
                endDateTime =
                  endDateTime.toLocaleDateString() +
                  ' ' +
                  endDateTime.toLocaleTimeString();
                return (
                  <div className='previous-question'>
                    <h4 className='test-title'>{test.title}</h4>
                    <p>Ended at: {endDateTime}</p>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      )}
    </main>
  );
}

export default Course;
