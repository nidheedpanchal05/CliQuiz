import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router';
import { useHistory } from 'react-router-dom';
import { FaArrowRight } from 'react-icons/fa';
import { URL } from '../../../../components/url';
import axios from 'axios';
import './createTest.css';

function CreateTest() {
  const history = useHistory();
  const [course, setCourse] = useState({});
  const [name, setName] = useState();
  const [detail, setDetail] = useState();
  const [type, setType] = useState();
  const [startDate, setStartDate] = useState();
  const [endDate, setEndDate] = useState();
  const { id } = useParams();

  useEffect(() => {
    const getCourse = axios
      .get(URL + 'course/')
      .then((res) =>
        setCourse(res.data.find((c) => c.course_id === parseInt(id)))
      );
  }, [id]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = {
      title: name,
      description: detail,
      test_type: type,
      start_at: startDate,
      end_at: endDate,
      max_grade: 10,
      course: course.course_id,
    };

    axios
      .post(URL + 'tests/', data)
      .then((res) => {
        console.log(res.data);
        alert('Test Created ', res.data.title);
        history.push(`${course.course_id}/${res.data.test_id}/questions`);
      })
      .catch((err) => alert('Failed to create! Provide valid details'));
  };

  return (
    <main className='create-test'>
      <header>
        <h1 className='header'>Create Test </h1>
        <h2 className='info'> Course: {course.name}</h2>
      </header>
      <div className='container'>
        <h1>Start creating new test by adding details</h1>
        <form action='' className='form' onSubmit={(e) => handleSubmit(e)}>
          <label className='form-elem' htmlFor='title'>
            Add a Title for Test
            <input
              type='text'
              name='title'
              id='title'
              placeholder='E.g. Unit Test 1'
              required
              value={name}
              onChange={(e) => {
                setName(e.target.value);
              }}
            />
          </label>
          <label className='form-elem' htmlFor='detail'>
            Add Details/Insructions
            <textarea
              className='detail-text'
              name='detail'
              cols='4'
              id='detail'
              placeholder='E.g. 1. Attempt All Questions. '
              maxLength='200'
              required
              value={detail}
              onChange={(e) => {
                setDetail(e.target.value);
              }}
            ></textarea>
          </label>
          <label htmlFor='type' className='form-elem'>
            Test Type
            <input
              type='text'
              name='type'
              id='type'
              placeholder='E.g. Objective/Subjective '
              required
              value={type}
              onChange={(e) => {
                setType(e.target.value);
              }}
            />
          </label>
          <label htmlFor='start-date' className='form-elem'>
            Start Date and Time
            <input
              type='datetime-local'
              value={startDate}
              name='start-date'
              id='start-date'
              onChange={(e) => setStartDate(e.target.value)}
            />
          </label>
          <label htmlFor='end-date' className='form-elem'>
            Due Date and Time
            <input
              type='datetime-local'
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              name='end-date'
              id='end-date'
            />
          </label>
          <button className='btn' type='submit'>
            Proceed <FaArrowRight />
          </button>
        </form>
      </div>
    </main>
  );
}

export default CreateTest;
