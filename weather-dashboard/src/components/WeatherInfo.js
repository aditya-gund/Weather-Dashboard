import React from 'react';
import Card from './Card';
import './WeatherInfo.css';
import NotInFreeServiceCard from './NotInFreeServiceCard';
import SourceMessage from './SourceMessage';

const WeatherInfo = ({ weather }) => {
  if (!weather) return null;

  return (
    <div className="weather-info">
      <SourceMessage/>
      <Card day="Yesterday" weather={weather.yesterday} />
      <Card day="Today" weather={weather.today} />
      <Card day="Tomorrow" weather={weather.tomorrow} />
      <NotInFreeServiceCard title="Last 15 Days forecasts" />
      <NotInFreeServiceCard title="Future 15 Days forecasts" />
    </div>
  );
};

export default WeatherInfo;
