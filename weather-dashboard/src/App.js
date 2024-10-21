import React, { useState, useEffect } from 'react';
import SearchBar from './components/SearchBar';
import WeatherDisplay from './components/WeatherDisplay';
import ForecastDisplay from './components/ForecastDisplay';
import FavoriteCities from './components/FavoriteCities';
import ErrorMessage from './components/ErrorMessage';
import DarkModeToggle from './components/DarkModeToggle';
import axios from 'axios';

function App() {
  const [weatherData, setWeatherData] = useState(null);
  const [forecastData, setForecastData] = useState(null);
  const [favorites, setFavorites] = useState(() => {
    const saved = localStorage.getItem('favorites');
    return saved ? JSON.parse(saved) : [];
  });
  const [error, setError] = useState(null);
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    localStorage.setItem('favorites', JSON.stringify(favorites));
  }, [favorites]);

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          fetchWeatherData(null, position.coords.latitude, position.coords.longitude);
        },
        (err) => {
          console.error("Geolocation error:", err);
          setError("Couldn't get your location. Please search for a city.");
        }
      );
    }
  }, []);

  const fetchWeatherData = async (city, lat, lon) => {
    const API_KEY = process.env.REACT_APP_OPENWEATHERMAP_API_KEY;
    try {
      setError(null);
      let url = `https://api.openweathermap.org/data/2.5/weather?appid=${API_KEY}&units=metric`;
      if (city) {
        url += `&q=${city}`;
      } else {
        url += `&lat=${lat}&lon=${lon}`;
      }
      const weatherResponse = await axios.get(url);
      setWeatherData(weatherResponse.data);

      const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?appid=${API_KEY}&units=metric${city ? `&q=${city}` : `&lat=${lat}&lon=${lon}`}`;
      const forecastResponse = await axios.get(forecastUrl);
      setForecastData(forecastResponse.data);
    } catch (error) {
      console.error('Error fetching weather data:', error);
      setError('Failed to fetch weather data. Please try again.');
    }
  };

  const toggleFavorite = (city) => {
    setFavorites(prevFavorites => 
      prevFavorites.includes(city)
        ? prevFavorites.filter(fav => fav !== city)
        : [...prevFavorites, city]
    );
  };

  return (
    <div className={`min-h-screen py-6 flex flex-col items-center ${darkMode ? 'dark' : ''}`}>
      <div className={`w-full max-w-3xl px-4 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-4xl font-bold">Weather Dashboard</h1>
          <DarkModeToggle darkMode={darkMode} setDarkMode={setDarkMode} />
        </div>
        <SearchBar onSearch={fetchWeatherData} darkMode={darkMode} />
        <FavoriteCities favorites={favorites} onSelectCity={fetchWeatherData} darkMode={darkMode} />
        {error && <ErrorMessage message={error} darkMode={darkMode} />}
        {weatherData && (
          <WeatherDisplay 
            data={weatherData} 
            isFavorite={favorites.includes(weatherData.name)}
            onToggleFavorite={() => toggleFavorite(weatherData.name)}
            darkMode={darkMode}
          />
        )}
        {forecastData && <ForecastDisplay data={forecastData} darkMode={darkMode} />}
      </div>
    </div>
  );
}

export default App;