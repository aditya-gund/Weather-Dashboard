import React from 'react';
import Card from './Card'; // Import the Card component
import './WeatherInfo.css'; // Ensure this line correctly references WeatherInfo.css

const WeatherInfo = ({ weather }) => {
  if (!weather) return <div>No weather data available</div>;

  return (
    <div className="weather-cards">
      <Card day="Yesterday" weather={weather.yesterday} />
      <Card day="Today" weather={weather.today} />
      <Card day="Tomorrow" weather={weather.tomorrow} />
    </div>
  );
};

export default WeatherInfo;
