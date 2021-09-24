import React, { useEffect } from 'react';
import { connect } from 'react-redux';

const MidRound = () => {
  useEffect(() => {
    console.log('in dummy');
  }, []);

  return (
    <div>
      <button>START ROUND</button>
      <button>CHECK</button>
      <button>SKIP</button>
    </div>
  );
};

const mapState = (state) => {
  return { state };
};

export default connect(mapState)(MidRound);
