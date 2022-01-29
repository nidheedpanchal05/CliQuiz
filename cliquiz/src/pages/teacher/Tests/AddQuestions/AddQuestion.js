import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { URL } from '../../../../components/url';
import axios from 'axios';

function AddQuestion() {
  const { test_id } = useParams();
  const [test, setTest] = useState();
  const [questionList, setQuestionList] = useState([]);

  useEffect(() => {
    const getTest = axios.get(URL + 'tests/').then((res) => {
      setTest(res.data.find((t) => t.test_id === parseInt(test_id)));
    });
  }, [test_id]);

  const NewQuestion = () => {
    const removeField = (id) => {
      console.log('remove');
    };

    const newQues = (
      <div>
        <label htmlFor='ques' className='form-elem'>
          Add New Question
          <input type='text' name='ques' placeholder='Question' />
        </label>
        <button
          className='btn'
          type='button'
          /*onClick={() => removeField(newQues)}*/
        >
          Remove
        </button>
      </div>
    );
    setQuestionList([...questionList, { newQues: newQues }]);
  };

  return (
    <main className='main'>
      <header className='header'>Add Questions </header>
      <div>
        <button className='btn' type='button' onClick={() => NewQuestion()}>
          Add Question
        </button>
        {questionList.map((e, index) => {
          return (
            <div className='form'>
              {e.newQues} {index}
            </div>
          );
        })}
      </div>
    </main>
  );
}

export default AddQuestion;
