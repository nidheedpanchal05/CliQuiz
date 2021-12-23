import React from 'react';

function Profile() {
  const person = JSON.parse(localStorage.getItem('login'));
  return (
    <div className='profile-main'>
      <input type='text' value={person.name} />
      <input type='text' value={person.email} />
    </div>
  );
}

export default Profile;
