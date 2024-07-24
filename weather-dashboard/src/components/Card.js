import React from 'react';
import './Card.css';

const Card = ({ day, weather }) => {
  if (!weather) return null;

  const { Temperature, Day, Night } = weather;
  const { Maximum, Minimum } = Temperature;

  // Convert Fahrenheit to Celsius
  const convertToCelsius = (fahrenheit) => ((fahrenheit - 32) * 5) / 9;

  const maxTempCelsius = convertToCelsius(Maximum.Value).toFixed(1);
  const minTempCelsius = convertToCelsius(Minimum.Value).toFixed(1);

  // Handle missing Wind data gracefully
  const windSpeed = Day.Wind ? `${Day.Wind.Speed.Value} ${Day.Wind.Speed.Unit}` : 'N/A';
  const humidity = Day.HasPrecipitation ? `${Day.PrecipitationIntensity}` : 'N/A';
  const rainfall = Day.HasPrecipitation ? `${Day.PrecipitationType}` : 'N/A';

  return (
    <div className="card">
      <h3>{day}</h3>
      <p>Wind: {windSpeed}</p>
      <p>Temperature: {maxTempCelsius} °C (High) - {minTempCelsius} °C (Low)</p>
      <p>High-Low: {maxTempCelsius} °C - {minTempCelsius} °C</p>
      <p>Humidity: {humidity}</p>
      <p>Rainfall: {rainfall}</p>
    </div>
  );
};

export default Card;
