import React from 'react';

const Controls = ({ moveLeft, moveRight, rotate, drop }) => {
  return (
    <div className="controls">
      <button onClick={moveLeft}>Left</button>
      <button onClick={rotate}>Rotate</button>
      <button onClick={moveRight}>Right</button>
      <button onClick={drop}>Drop</button>
    </div>
  );
};

export default Controls;
