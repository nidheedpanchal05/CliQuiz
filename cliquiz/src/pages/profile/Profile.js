import React from 'react';
import { useHistory } from 'react-router-dom';
import { IMAGE_BASE_URL } from '../../components/url';
import './profile.css';

function Profile() {
  const history = useHistory();
  const person = JSON.parse(
    localStorage.getItem('teacher-login') ||
      localStorage.getItem('student-login')
  );
  if (!person) {
    history.push('/');
    return null;
  }
  return (
    <div className='profile-main'>
      <div className='profile-head'>
        <h3> Logged in as {person.teacher_id ? 'Teacher' : 'Student'}</h3>
        <img
          className='profile-avatar'
          src={IMAGE_BASE_URL + (person.teacher_avtar || person.student_avtar)}
          alt={person.name}
        />
      </div>

      <table>
        <tbody>
          <tr>
            <th colSpan='2'>Your Profile</th>
          </tr>
          <tr>
            <td className='field-name'> Name</td>
            <td className='field-value'>
              <input type='text' name='name' value={person.name} disabled />
            </td>
          </tr>
          <tr>
            <td className='field-name'>Email</td>
            <td className='field-value'>
              <input type='text' name='email' value={person.email} disabled />
            </td>
          </tr>
          <tr>
            <td>
              <button className='profile-btn'>Edit</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

export default Profile;
