import React, { useState } from 'react';
import axios from 'axios';

function WeatherApp() {
  const [city, setCity] = useState('');
  const [weatherData, setWeatherData] = useState(null);

  const handleCityChange = (event) => {
    setCity(event.target.value);
  };

  const handleWeatherData = (data) => {
    setWeatherData(data);
  };

  const getWeatherData = async () => {
    const apiKey = 'your-api-key'; 
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
    
    try {
      const response = await axios.get(apiUrl);
      const weatherData = response.data;
      handleWeatherData(weatherData);
    } catch (error) {
      console.error(error);
      handleWeatherData(null);
    }
  };

  return (
    <div>
      <h1>Weather App</h1>
      <input type="text" value={city} onChange={handleCityChange} placeholder="Enter city name" />
      <button onClick={getWeatherData}>Get Weather</button>

      {weatherData && (
        <div>
          <p>Temperature: {weatherData.main.temp} °C</p>
          <p>Description: {weatherData.weather[0].description}</p>
          <p>Humidity: {weatherData.main.humidity}%</p>
        </div>
      )}

      {!weatherData && city && <p>No weather data found for {city}</p>}
    </div>
  );
}

export default WeatherApp;
