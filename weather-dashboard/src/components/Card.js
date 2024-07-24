import React from 'react';
import './Card.css';

const Card = ({ day, weather }) => {
  if (!weather) return null;

  const { wind, temp, highLow, humidity, rainFall } = weather;

  return (
    <div className="card">
      <h3>{day}</h3>
      <p>Wind: {wind} km/h</p>
      <p>Temperature: {temp} °C</p>
      <p>High-Low: {highLow} °C</p>
      <p>Humidity: {humidity} %</p>
      <p>Rainfall: {rainFall} mm</p>
    </div>
  );
};

export default Card;
