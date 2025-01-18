import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Card, Typography } from '@mui/material';
import './Widgets.css'

function Widgets() {
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchWeather = async () => {
      const API_KEY = 'b06dbf910c042bb9bbc5e47d7afdadb4';
      const url = `https://api.openweathermap.org/data/2.5/weather?q=Phoenix&units=imperial&appid=${API_KEY}`;

      try {
        const response = await axios.get(url);
        console.log('API Response:', response.data);
        setWeather({
          location: { name: response.data.name },
          current: { temperature: response.data.main.temp },
        });
      } catch (error) {
        console.error('Error fetching weather data:', error);
        setError('Failed to fetch weather data. Please try again.');
      }
    };

    fetchWeather();
  }, []);

  return (
    <div className="widget-page">
      {error ? (
        <Typography className="error-message">{error}</Typography>
      ) : weather ? (
        <Card className="weather-card">
          <Typography className="weather-location">{weather.location.name}</Typography>
          <Typography className="weather-temperature">{Math.round(weather.current.temperature)}°F</Typography>
        </Card>
      ) : (
        <Typography>Loading weather data...</Typography>
      )}
      <Typography className="helper-text">If you can't see the weather, let us know.</Typography>
    </div>
  );
}

export default Widgets;
