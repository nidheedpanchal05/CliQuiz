import React, { useState, useEffect } from 'react';
import { useParams, useHistory } from 'react-router';
import { URL } from '../../../components/url';
import Loading from '../../../helpers/Loading';
import { useFetch } from '../../../hooks/useFetch';
import './test.css';

function Test() {
  const history = useHistory();
  const { testid } = useParams();
  const { item, loading } = useFetch(URL + 'test-question/');
  const [test, setTest] = useState({});
  const [minutes, setMinutes] = useState(10);
  const [seconds, setSeconds] = useState(0);
  const [timer, setTimer] = useState(false);

  useEffect(() => {
    setTest(item.find((t) => t.testid === parseInt(testid)));
  });
  useEffect(() => {
    let myInterval = setInterval(() => {
      if (seconds > 0) {
        setSeconds(seconds - 1);
      }
      if (seconds === 0) {
        if (minutes === 0) {
          clearInterval(myInterval);
        } else {
          setMinutes(minutes - 1);
          setSeconds(59);
        }
      }
    }, 1000);
    return () => {
      clearInterval(myInterval);
    };
  });

  if (timer) {
    return (
      <div>
        <button className='btn' onClick={() => history.goBack()}>
          Back to course
        </button>
        <Loading loadingText='No Test' />
      </div>
    );
  } else
    return (
      <main>
        {loading ? (
          <Loading loadingText='Loading...' />
        ) : (
          <div className='main'>
            <header>
              <h1 className='header'>{test.title}</h1>
              <p className='info'>{test.description}</p>
            </header>
            <div>
              <h2>
                Time Limit :
                <div>
                  {minutes === 0 && seconds === 0 ? (
                    setTimer(true)
                  ) : (
                    <h1>
                      {minutes}:{seconds < 10 ? `0${seconds}` : seconds}
                    </h1>
                  )}
                </div>
              </h2>
              <hr />
              <form className='test-form'>
                {test.question.length === 0 ? (
                  <p className='info'>No Questions Uploaded</p>
                ) : (
                  test.question.map((ques, index) => {
                    return (
                      <div key={ques.ques_id} className='question-wrapper'>
                        <div className='question'>
                          <h3>
                            <span>Q.{index + 1} </span>
                            {ques.question}
                          </h3>
                          <p style={{ float: 'right' }}>
                            Marks (Weightage) : {ques.grade}
                          </p>
                        </div>

                        <ul className='option-wrapper'>
                          {ques.answer.map((options, index) => {
                            return (
                              <li key={index}>
                                <label>
                                  <input
                                    type='radio'
                                    id={options.answer_text}
                                    name={ques.question}
                                    value={options.answer_text}
                                  />{' '}
                                  {options.answer_text}
                                </label>
                              </li>
                            );
                          })}
                        </ul>
                      </div>
                    );
                  })
                )}
                <button type='submit' className='btn'>
                  Submit
                </button>
              </form>
            </div>
          </div>
        )}
      </main>
    );
}

export default Test;
