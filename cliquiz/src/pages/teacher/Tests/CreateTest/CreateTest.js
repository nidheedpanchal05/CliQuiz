import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router';
import { useHistory } from 'react-router-dom';
import { FaStepBackward } from 'react-icons/fa';
import { URL } from '../../../../components/url';
import AddQuestion from '../AddQuestions/AddQuestion';
import axios from 'axios';
import './createTest.css';

function CreateTest() {
  const history = useHistory();
  const [toggle, setToggle] = useState(false);
  const [course, setCourse] = useState({});
  const [name, setName] = useState('');
  const [detail, setDetail] = useState('');
  const [type, setType] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [validateDateTime, setValidateDateTime] = useState(false);
  const [timeLimit, setTimeLimit] = useState('');
  const [testData, setTestData] = useState({});
  const { id } = useParams();

  useEffect(() => {
    const getCourse = axios
      .get(URL + 'course/')
      .then((res) =>
        setCourse(res.data.find((c) => c.course_id === parseInt(id)))
      );
    if (startDate < endDate) {
      let currDate = new Date().toLocaleString();

      console.log(startDate, currDate, startDate > currDate);
      setValidateDateTime(true);
    } else {
      setValidateDateTime(false);
    }
  }, [id, startDate, endDate, timeLimit]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setTestData({
      title: name,
      description: detail,
      duration: timeLimit,
      test_type: type,
      start_at: startDate,
      end_at: endDate,
      max_grade: 0,
      course: course.course_id,
    });
    setToggle(true);
  };

  if (!toggle) {
    return (
      <main className='create-test'>
        <button className='back' onClick={() => history.goBack()}>
          <FaStepBackward />
        </button>
        <header className='header'>
          <h1 className='title'>Create Test </h1>
          <h2> {course.name}</h2>
        </header>
        <div className='container'>
          <h1 className='info'>Start by adding test information</h1>
          <form action='' className='form' onSubmit={handleSubmit}>
            <label className='form-elem' htmlFor='title'>
              <p>
                Add a Title for Test <span className='required'>*</span>
              </p>
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
              <p>
                Add Details/Insructions <span className='required'>*</span>
              </p>
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
              <p>
                Test Type <span className='required'>*</span>
              </p>
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

            <h1 className='info'>Set Duration of Test</h1>
            <label htmlFor='start-date' className='form-elem'>
              <p>
                Active From <span className='required'>*</span>
              </p>
              <span className='form-validation-text'>
                Enter Start Date and Time (Click on the yellow button provided
                to activate date time picker)
              </span>
              <input
                type='datetime-local'
                value={startDate}
                min=''
                required
                name='start-date'
                id='start-date'
                onChange={(e) => setStartDate(e.target.value)}
              />
            </label>

            <label htmlFor='end-date' className='form-elem'>
              <p>
                Due At <span className='required'>*</span>
              </p>
              <span className='form-validation-text'>
                End Time must be greater than Start Time (Click on the yellow
                button provided to activate date time picker)
              </span>
              <input
                type='datetime-local'
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                name='end-date'
                id='end-date'
              />
            </label>

            <label htmlFor='time-limit' className='form-elem'>
              <p>
                Set Time Limit <span className='required'>*</span>
              </p>
              <span className='form-validation-text'>
                Set Duartion in minutes only. For e.g. you can add 1.5 hours as
                90 minutes
              </span>
              <input
                type='number'
                min='5'
                required
                value={timeLimit}
                onChange={(e) => setTimeLimit(e.target.value)}
                placeholder='E.g. 90'
              />
            </label>

            <button
              className='btn'
              disabled={
                !name || !type || !detail || !validateDateTime || !timeLimit
              }
              type='submit'
            >
              <p className='tooltip'>
                Cannot proceed. Make sure you enter all required details.
              </p>
              Proceed
            </button>
          </form>
        </div>
      </main>
    );
  } else {
    return <AddQuestion testDetails={testData} />;
  }
}

export default CreateTest;
