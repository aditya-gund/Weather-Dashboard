import React from 'react';
import './SourceMessage.css';

const SourceMessage = () => {
  return (
    <div className="source-message">
      Weather data sourced from <a href="https://www.accuweather.com/" target="_blank" rel="noopener noreferrer">AccuWeather</a>.
    and <a href="https://openweathermap.org/" target="_blank" rel="noopener noreferrer">openweather</a></div>
  );
}


export default SourceMessage;
