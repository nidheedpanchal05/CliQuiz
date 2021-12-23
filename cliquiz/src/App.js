import React from 'react';
import Navbar from './components/navbar';

const App = () => {
  const styles = {
    height: '100%',
    width: '100%',
    position: 'relative',
  };
  return (
    <section>
      <div style={styles}>
        <Navbar />
      </div>
    </section>
  );
};

export default App;
