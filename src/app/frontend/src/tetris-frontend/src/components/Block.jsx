import React from 'react';

const Block = ({ shape }) => {
  return (
    <div className={`game-cell ${shape ? 'filled' : 'empty'}`} style={{ backgroundColor: shape || 'transparent', border: '1px solid #ccc' }} />
  );
};

export default Block;
