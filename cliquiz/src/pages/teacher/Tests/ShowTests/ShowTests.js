import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { FaEye, FaTrash } from 'react-icons/fa';
import { URL } from '../../../../components/url';
import { useFetch } from '../../../../hooks/useFetch';
import Loading from '../../../../helpers/Loading';
import './showTest.css';

function ShowTests() {
  const { id } = useParams();
  const { item, loading, getItems } = useFetch(URL + 'test-details/');
  const [test, setTest] = useState([]);
  const [course, setCourse] = useState({});

  const status = { 0: 'active', 1: 'hidden', 2: 'deactive' };

  useEffect(() => {
    axios.get(URL + 'course/').then((res) => {
      setCourse(res.data.find((e) => e.course_id === parseInt(id)));
    });

    setTest(item.filter((test) => test.course === parseInt(id)));
  }, [id, item]);

  if (loading) {
    return <Loading loadingText='Loading...' />;
  } else
    return test.length === 0 ? (
      <p className='header'>No Tests Scheduled</p>
    ) : (
      <main>
        <header className='header'>
          <h1 className='title'>Tests</h1>
          <h2>{course.name}</h2>
        </header>
        <div className='container'>
          <table className='test-list' cellPadding='10px' cellSpacing='10px'>
            <thead>
              <tr>
                <th>Sr No.</th>
                <th>Title</th>
                <th>Start Date</th>
                <th>Start Time</th>

                <th>Due Date</th>
                <th>Due Time</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {test.map((singleTest, index) => {
                if (
                  singleTest.test_status === 0 &&
                  singleTest.status === 1 &&
                  new Date() > new Date(singleTest.start_at)
                ) {
                  let updateStatus = {
                    title: singleTest.title,
                    description: singleTest.description,
                    start_at: singleTest.start_at,
                    end_at: singleTest.end_at,
                    max_grade: singleTest.max_grade,
                    course: course.course_id,
                    test_status: 2,
                  };
                  axios
                    .put(URL + 'alter-test/' + singleTest.testid, updateStatus)
                    .then((res) => {
                      getItems();
                    });
                }

                return (
                  <tr key={singleTest.testid}>
                    <td>{index + 1}</td>
                    <td>{singleTest.title}</td>
                    <td>
                      {new Date(singleTest.start_at).toLocaleDateString()}
                    </td>
                    <td>
                      {new Date(singleTest.start_at).toLocaleTimeString()}
                    </td>
                    <td>{new Date(singleTest.end_at).toLocaleDateString()}</td>
                    <td>{new Date(singleTest.end_at).toLocaleTimeString()}</td>

                    <td>
                      {singleTest.test_status}{' '}
                      {status[singleTest.test_status].toUpperCase()}
                    </td>
                    <td>
                      <FaEye /> <FaTrash />
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </main>
    );
}

export default ShowTests;
