import React from 'react';
import Card from './Card';
import './WeatherInfo.css';

const WeatherInfo = ({ weather }) => {
  if (!weather) return null;

  return (
    <div className="weather-info">
      <Card day="Yesterday" weather={weather.yesterday} />
      <Card day="Today" weather={weather.today} />
      <Card day="Tomorrow" weather={weather.tomorrow} />
    </div>
  );
};

export default WeatherInfo;
