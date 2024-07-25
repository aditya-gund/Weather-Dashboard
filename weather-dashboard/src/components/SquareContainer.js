// SquareContainer.js
import React from 'react';
import './SquareContainer.css'; // Import the CSS file for styling

const SquareContainer = ({ children }) => {
  return (
    <div className="square-container">
      {children}
    </div>
  );
};

export default SquareContainer;
