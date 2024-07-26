import React, { useState, useEffect } from 'react';
import axios from 'axios';
import SearchBar from './components/SearchBar';
import WeatherInfo from './components/WeatherInfo';
import Map from './components/Map';
import 'leaflet/dist/leaflet.css';
import SourceMessage from './components/SourceMessage'
// import SquareContainer from './components/SquareContainer';

const containerStyle = {
  display: 'flex',
  height: '100vh', // Full viewport height
  margin: 0, // Remove default margin
  padding: 0, // Remove default padding
  border: 'none',
};

const weatherInfoStyle = {
  flex: '0 0 30%', // Adjust width as needed, here it takes 30% of the container width
  overflowY: 'auto', // Allows scrolling if content overflows
  padding: 0, // Optional padding
};

const mapStyle = {
  flex: '1', // Takes up the remaining space in the container
  overflow: 'hidden', // Ensures no overflow
  padding: 0, // Optional padding
};

const App = () => {
  const [city, setCity] = useState('Amravati');
  const [weather, setWeather] = useState(null);
  const [mapCenter, setMapCenter] = useState([20.9374, 77.7796]); // Default coordinates for Amravati
  const [zoom, setZoom] = useState(13); // Default zoom level

  useEffect(() => {
    handleSearch('Amravati');
  }, []);

  const handleSearch = async (city) => {
    setCity(city);

    const apiKey = '5BdKp6TUdkvhZrCAu06NDANmP384uRQS';
    const locationUrl = `https://dataservice.accuweather.com/locations/v1/cities/search?apikey=${apiKey}&q=${city}`;

    try {
      // Fetch the location key for the city
      const locationResponse = await axios.get(locationUrl);
      if (locationResponse.data.length === 0) {
        console.error('No location found for the city');
        return;
      }

      const locationData = locationResponse.data[0];
      const latitude = locationData.GeoPosition.Latitude;
      const longitude = locationData.GeoPosition.Longitude;

      // Set map center to the location's coordinates and zoom in
      setMapCenter([latitude, longitude]);
      setZoom(13); // Adjust zoom level if needed

      // Fetch the weather data for the next 5 days
      const locationKey = locationData.Key;
      const weatherUrl = `https://dataservice.accuweather.com/forecasts/v1/daily/5day/${locationKey}?apikey=${apiKey}`;
      const weatherResponse = await axios.get(weatherUrl);
      const weatherData = weatherResponse.data.DailyForecasts;

      // Extract weather data for yesterday, today, and tomorrow
      const extractedWeather = {
        yesterday: weatherData[0], // First day's data
        today: weatherData[1], // Second day's data
        tomorrow: weatherData[2], // Third day's data
      };

      console.log('Extracted Weather:', extractedWeather);
      setWeather(extractedWeather);
    } catch (error) {
      console.error('Error fetching weather data:', error);
    }
  };

  return (
    <div className='frameApp'>
      <div className="App">
      <center><h1>Weather Dashboard</h1></center>
      <SearchBar onSearch={handleSearch} defaultValue={city} />
      <div style={containerStyle} className="content">
        <div style={weatherInfoStyle} className="weather-info">
          <WeatherInfo weather={weather} />
        </div>
        <div style={mapStyle} className="map">
          <Map center={mapCenter} zoom={zoom} />
        </div>
      </div>
    </div>
    </div>
  );
};

export default App;
