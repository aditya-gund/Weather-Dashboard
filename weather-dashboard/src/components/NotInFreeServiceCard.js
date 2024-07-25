import React from 'react';
import './NotInFreeServiceCard.css';

const NotInFreeServiceCard = ({ title }) => {
  return (
    <div className="card">
      <h3>{title}</h3>
      <p>Not in free service</p>
    </div>
  );
};

export default NotInFreeServiceCard;
