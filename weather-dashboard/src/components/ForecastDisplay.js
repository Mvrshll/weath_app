import React from 'react';

function ForecastDisplay({ data, darkMode }) {
  const groupedForecast = data.list.reduce((acc, item) => {
    const date = new Date(item.dt * 1000).toLocaleDateString();
    if (!acc[date]) {
      acc[date] = [];
    }
    acc[date].push(item);
    return acc;
  }, {});

  const getWeatherIcon = (iconCode) => {
    return `http://openweathermap.org/img/wn/${iconCode}@2x.png`;
  };

  return (
    <div className={`${darkMode ? 'bg-gray-800' : 'bg-white'} shadow-lg rounded-lg p-6`}>
      <h2 className="text-2xl font-bold mb-4">5-Day Forecast</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
        {Object.entries(groupedForecast).slice(0, 5).map(([date, forecasts]) => {
          const midDayForecast = forecasts[Math.floor(forecasts.length / 2)];
          return (
            <div key={date} className={`${darkMode ? 'bg-gray-700' : 'bg-gray-100'} rounded p-3`}>
              <h3 className="font-bold mb-2">{new Date(date).toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' })}</h3>
              <div className="flex items-center justify-center mb-2">
                <img 
                  src={getWeatherIcon(midDayForecast.weather[0].icon)} 
                  alt={midDayForecast.weather[0].description} 
                  className="w-12 h-12"
                />
              </div>
              <p className="text-xl font-bold mb-1">{Math.round(forecasts.reduce((sum, f) => sum + f.main.temp, 0) / forecasts.length)}°C</p>
              <p>{midDayForecast.weather[0].description}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default ForecastDisplay;