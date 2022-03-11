import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useHistory } from 'react-router';
import { URL } from '../../../../components/url';
import axios from 'axios';
import './add-question.css';
import { FaTimes, FaTrash } from 'react-icons/fa';
import Preview from '../Preview/Preview';

function AddQuestion(props) {
  const history = useHistory();
  let { testDetails } = props;
  const { id } = useParams();
  const [course, setCourse] = useState({});
  const [showPreview, setShow] = useState(false);
  const [questionList, setQuestionList] = useState([
    { id: 0, question: '', grade: 0, options: [] },
  ]);

  useEffect(() => {
    const getCourse = axios
      .get(URL + 'course/')
      .then((res) =>
        setCourse(res.data.find((c) => c.course_id === parseInt(id)))
      );
  }, [id, questionList]);

  const handleAddQuestion = () => {
    setQuestionList([
      ...questionList,
      {
        id: new Date().getTime().toString(),
        question: '',
        grade: 0,
        options: [],
      },
    ]);
  };

  const handleRemoveQuestion = (index) => {
    const quesList = questionList.filter((ques, i) => i !== index);
    setQuestionList(quesList);
  };

  const handleChange = (e, index) => {
    const { name, value } = e.target;
    const newList = [...questionList];
    newList[index][name] = value;
    setQuestionList(newList);
  };

  // BackEnd Integration
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(testDetails);
    console.log(questionList);

    // Post Test Data
    axios
      .post(URL + 'test-details/', testDetails)
      .then((res) => {
        const tid = res.data.testid;
        let allQuestions = [];
        questionList.forEach((ques) => {
          allQuestions.push({
            test: tid,
            question: ques.question,
            grade: ques.grade,
            answer: ques.options,
          });
        });

        allQuestions.map((question) => {
          axios
            .post(URL + 'question/', question)
            .then((res) => {
              const qid = res.data.ques_id;
              let optionList = [];
              question.answer.forEach((option) => {
                optionList.push({
                  question: qid,
                  answer_text: option.choice,
                  is_right: option.isRight,
                });
              });
              console.log(optionList);
              optionList.map((opt) => {
                axios.post(URL + 'answer/', opt).then((res) => {
                  console.log(res.data);
                  setQuestionList([
                    { id: 0, question: '', grade: 0, options: [] },
                  ]);
                  history.push(`/teacher-home/tests/${parseInt(id)}`);
                });
              });
            })
            .catch((err) => alert(err));
        });
      })
      .catch((err) => alert(err));
  };

  const QuestionForm = (
    <form onSubmit={(e) => handleSubmit(e)} style={{ margin: '1rem' }}>
      {questionList.map((singleQues, index) => {
        // Add Options
        const addOption = () => {
          const newList = [...questionList];
          newList[index].options.push({ choice: '', isRight: false });
          setQuestionList(newList);
        };
        return (
          <div className='main' key={index}>
            <div className='div-1'>
              <div className='ques'>
                Enter Question
                <textarea
                  value={singleQues.question}
                  onChange={(e) => handleChange(e, index)}
                  className='add-question'
                  type='text'
                  name='question'
                  id='ques'
                  rows='2'
                  required
                  placeholder='Add a Question'
                ></textarea>
                <div>
                  Enter Marks(Weightage)
                  <input
                    id='marks'
                    type='number'
                    min='1'
                    name='grade'
                    value={singleQues.grade}
                    onChange={(e) => handleChange(e, index)}
                    placeholder='Marks'
                    className='marks'
                  />
                  {questionList.length > 1 && (
                    <button
                      style={{ float: 'right' }}
                      className='btn-danger'
                      type='button'
                      onClick={() => handleRemoveQuestion(index)}
                    >
                      <FaTrash />
                      <p className='tooltip'>
                        Remove Question? {singleQues.question}
                      </p>
                    </button>
                  )}
                </div>
              </div>

              <table className='option-container'>
                {singleQues.options.length !== 0 ? (
                  <tr>
                    <td>Options</td>
                    <td style={{ textAlign: 'center' }}>Mark Correct</td>
                    <td>Remove</td>
                  </tr>
                ) : null}
                {singleQues.options.map((option, indexOpt) => {
                  // Remove Option
                  const removeOption = (opt) => {
                    const newOptions = singleQues.options.filter(
                      (option, id) => id !== opt
                    );
                    singleQues['options'] = newOptions;
                    let newList = [...questionList];
                    newList[index] = singleQues;
                    setQuestionList(newList);
                  };
                  // HANDLE OPTION CHANGE
                  const handleOption = (e, indexOfOption) => {
                    let { value } = e.target;
                    let newQues = [...questionList];
                    newQues[index].options[indexOfOption].choice = value;

                    setQuestionList(newQues);
                  };

                  const handleCorrect = (optIndex) => {
                    let newList = [...questionList];
                    let answer = newList[index].options;
                    let newAnswerList = answer.map((opt) => {
                      if (answer[optIndex].choice === opt.choice) {
                        opt.isRight = true;
                      } else {
                        opt.isRight = false;
                      }
                      return opt;
                    });
                    newList[index].options = newAnswerList;
                    setQuestionList(newList);
                  };

                  return (
                    <tr className='option-wrapper'>
                      <td>
                        <input
                          type='text'
                          name={singleQues.id}
                          value={option.choice}
                          required
                          onChange={(e) => handleOption(e, indexOpt)}
                        />
                      </td>
                      <td style={{ textAlign: 'center' }}>
                        <input
                          name={singleQues.id}
                          value={option.choice}
                          onClick={() => handleCorrect(indexOpt)}
                          type='radio'
                          required
                        />
                      </td>
                      <td>
                        <button
                          type='button'
                          className='btn-danger'
                          onClick={() => removeOption(indexOpt)}
                        >
                          <FaTimes />
                          <p className='tooltip'>
                            Delete Option? {option.choice}
                          </p>
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </table>
              {singleQues.options.length < 4 &&
              singleQues.options.length >= 0 ? (
                <button className='btn' onClick={addOption}>
                  Add Option
                </button>
              ) : (
                ''
              )}
            </div>
            <div className='division-2'>
              {questionList.length - 1 === index && (
                <button
                  className='btn'
                  type='button'
                  onClick={handleAddQuestion}
                >
                  Add New Question
                </button>
              )}
            </div>
          </div>
        );
      })}
      {showPreview ? (
        <Preview
          questionList={questionList}
          details={testDetails}
          hide={() => setShow(false)}
        />
      ) : (
        <button className='btn' onClick={() => setShow(true)}>
          Show Test Preview
        </button>
      )}
      <br />
      <button type='reset' className='btn-danger'>
        Reset
      </button>
      &nbsp;
      <button type='submit' className='btn'>
        Upload Test
      </button>
    </form>
  );

  if (course) {
    return (
      <main>
        <header className='header'>
          <h1 className='title'>Create Test Questions</h1>
          <h2>{course.name}</h2>
        </header>
        {QuestionForm}
      </main>
    );
  } else {
    return <h1>No Such Test </h1>;
  }
}

export default AddQuestion;
