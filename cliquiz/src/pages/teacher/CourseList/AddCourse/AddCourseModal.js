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
    const data = { name: name, description: description, teacher: teacher };
    const postData = axios
      .post(URL + 'course/', data)
      .then((res) => {
        console.log('Course added successfully');
        setName('');
        setDescription('');
        alert('Course Added' + res.data.name);
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
            onClick={() => history.push('/teacherHome')}
          >
            <FaTimes />
          </button>
        </div>

        <form className='addCourseForm' action='post' onSubmit={handleSubmit}>
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
          <button type='submit'>Add</button>
        </form>
      </div>
    );
  } else {
    return <></>;
  }
}

export default Modal;
