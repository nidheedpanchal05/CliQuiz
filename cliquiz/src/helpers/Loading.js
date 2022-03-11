import React from 'react';
import './loading.css';

function Loading({ loadingText }) {
  return (
    <div className='loading'>
      <p className='loading-text'>{loadingText}</p>
      <div className='loading-inner'></div>
    </div>
  );
}

export default Loading;
