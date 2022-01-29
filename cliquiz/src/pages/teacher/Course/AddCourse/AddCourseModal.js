import { useState } from 'react';
import { URL } from '../../../../components/url';
import { FaTimes } from 'react-icons/fa';
import axios from 'axios';
import './addCourse.css';
import { useHistory } from 'react-router-dom';

function Modal(props) {
  const history = useHistory();

  const { show, teacher } = props;
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = {
      name: name,
      description: description,
      teacher: teacher.teacher_id,
    };
    const postData = axios
      .post(URL + 'course/', data)
      .then((res) => {
        setName('');
        setDescription('');
        alert('Course Added' + res.data.name);
        history.push('/teacher-home');
      })
      .catch((err) => console.log(err));
  };

  if (show) {
    return (
      <div className='modal'>
        <div className='modal-header'>
          <h1>Add New Course </h1>
          <button
            className='closeModal'
            onClick={() => history.push('/teacher-home')}
          >
            <FaTimes />
          </button>
        </div>

        <form className='courseForm' action='post' onSubmit={handleSubmit}>
          <p>Currently signed in as {teacher.email}</p>
          <br />
          <h3>Details about course</h3>
          <input
            type='text'
            name='title'
            id='name'
            placeholder='Course Name'
            required
            value={name}
            onChange={(e) => {
              setName(e.target.value);
            }}
          />
          <input
            type='text'
            name='description'
            id='desc'
            placeholder='Add Description...'
            maxLength='200'
            required
            value={description}
            onChange={(e) => {
              setDescription(e.target.value);
            }}
          />

          <button type='submit' className='btn'>
            ADD
          </button>
        </form>
      </div>
    );
  } else {
    return <></>;
  }
}

export default Modal;
