import React from 'react';
import { FaCheckCircle, FaTimes } from 'react-icons/fa';
import './preview.css';

function Preview(props) {
  const { questionList, details, hide } = props;
  return (
    <div className='preview-wrapper'>
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <h1 className='title'>Preview</h1>
        <button onClick={hide} className='btn-danger'>
          <FaTimes /> Close
        </button>
      </div>

      {details ? (
        <div>
          <h1>Test Details</h1>
          <table cellSpacing='10px' cellPadding='10px'>
            <tr>
              <td>Title</td>
              <td>{details.title}</td>
            </tr>
            <tr>
              <td>Description</td>
              <td>{details.description}</td>
            </tr>
            <tr>
              <td>Duration</td>
              <td> {details.duration} </td>
            </tr>
            <tr>
              <td>Start Date and Time</td>
              <td>
                {' '}
                {new Date(details.start_at).toLocaleDateString() +
                  ' ' +
                  new Date(details.start_at).toLocaleTimeString()}
              </td>
            </tr>
            <tr>
              <td>End Date and Time</td>
              <td>
                {' '}
                {new Date(details.end_at).toLocaleDateString() +
                  ' ' +
                  new Date(details.end_at).toLocaleTimeString()}
              </td>
            </tr>
          </table>
        </div>
      ) : null}

      {questionList.map((question, index) => {
        return (
          <div key={question.id} className='question-wrapper'>
            <h3 className='prev-question'>
              Q{index + 1}. {question.question}
            </h3>
            <p>Marks (Weightage): {question.grade}</p>
            <ul className='option-list'>
              {question.question
                ? question.options.map((opt, index) => {
                    return (
                      <li key={index} className='prev-choices'>
                        {opt.choice}
                        <span>
                          {opt.isRight === true ? (
                            <FaCheckCircle
                              style={{ color: 'green', marginLeft: '0.5rem' }}
                            />
                          ) : (
                            ''
                          )}
                        </span>
                      </li>
                    );
                  })
                : ''}
            </ul>
          </div>
        );
      })}
    </div>
  );
}

export default Preview;
