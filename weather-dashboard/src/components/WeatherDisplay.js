import React from 'react';

function WeatherDisplay({ data, isFavorite, onToggleFavorite, darkMode }) {
  const getWeatherIcon = (iconCode) => {
    return `http://openweathermap.org/img/wn/${iconCode}@2x.png`;
  };

  return (
    <div className={`${darkMode ? 'bg-gray-800' : 'bg-white'} shadow-lg rounded-lg p-6 mb-6`}>
      <div className="flex justify-between items-start">
        <div>
          <h2 className="text-3xl font-bold mb-2">{data.name}, {data.sys.country}</h2>
          <div className="flex items-center">
            <img 
              src={getWeatherIcon(data.weather[0].icon)} 
              alt={data.weather[0].description} 
              className="w-16 h-16 mr-2"
            />
            <p className="text-xl">{data.weather[0].description}</p>
          </div>
        </div>
        <button
          onClick={onToggleFavorite}
          className={`text-2xl focus:outline-none ${isFavorite ? 'text-yellow-500' : 'text-gray-400'}`}
        >
          ★
        </button>
      </div>
      <div className="grid grid-cols-2 gap-4 mt-4">
        <div>
          <p className="text-5xl font-bold">{Math.round(data.main.temp)}°C</p>
          <p className={`${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>Feels like {Math.round(data.main.feels_like)}°C</p>
        </div>
        <div>
          <p>Humidity: {data.main.humidity}%</p>
          <p>Wind: {data.wind.speed} m/s</p>
          <p>Pressure: {data.main.pressure} hPa</p>
        </div>
      </div>
    </div>
  );
}

export default WeatherDisplay;