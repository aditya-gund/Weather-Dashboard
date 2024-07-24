import React, { useState } from 'react';
import axios from 'axios';
import SearchBar from './components/SearchBar';
import WeatherInfo from './components/WeatherInfo';
import Map from './components/Map';
import './App.css';

const App = () => {
  const [city, setCity] = useState('');
  const [weather, setWeather] = useState(null);

  const handleSearch = async (city) => {
    setCity(city);

    const apiKey = 'YOUR_ACCUWEATHER_API_KEY';
    const locationUrl = `https://dataservice.accuweather.com/locations/v1/cities/search?apikey=${apiKey}&q=${city}`;

    try {
      const response = await axios.get(locationUrl);
      const locationKey = response.data[0].Key;

      const weatherUrl = `https://dataservice.accuweather.com/currentconditions/v1/${locationKey}?apikey=${apiKey}`;

      const weatherResponse = await axios.get(weatherUrl);
      const weatherData = weatherResponse.data[0];

      const extractedWeather = {
        wind: weatherData.Wind.Speed.Metric.Value,
        temp: weatherData.Temperature.Metric.Value,
        highLow: `${weatherData.TemperatureSummary.Past24HourRange.Maximum.Metric.Value} - ${weatherData.TemperatureSummary.Past24HourRange.Minimum.Metric.Value}`,
        humidity: weatherData.RelativeHumidity,
        rainFall: weatherData.PrecipitationSummary.Precipitation.Metric.Value,
      };

      setWeather(extractedWeather);
    } catch (error) {
      console.error('Error fetching weather data:', error);
    }
  };

  return (
    <div className="App">
      <h1>Weather Dashboard</h1>
      <SearchBar onSearch={handleSearch} />
      <div className="content">
        <div className="weather-info">
          <WeatherInfo weather={weather} />
        </div>
        <div className="map">
          <Map city={city} />
        </div>
      </div>
    </div>
  );
};

export default App;
