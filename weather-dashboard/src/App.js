import React, { useState } from 'react';
import axios from 'axios';
import SearchBar from './components/SearchBar';
import WeatherInfo from './components/WeatherInfo';
import Map from './components/Map';
import 'leaflet/dist/leaflet.css';

const App = () => {
  const [city, setCity] = useState('Amravati');
  const [weather, setWeather] = useState(null);
  const [mapCenter, setMapCenter] = useState([20.5937, 78.9629]); // Default coordinates
  const [zoom, setZoom] = useState(13); // Default zoom level

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
        tomorrow: weatherData[2] // Third day's data
      };

      console.log('Extracted Weather:', extractedWeather);
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
          <Map center={mapCenter} zoom={zoom} /> {/* Pass center and zoom as props */}
        </div>
      </div>
    </div>
  );
};

export default App;
