import React from 'react';

function FavoriteCities({ favorites, onSelectCity }) {
  if (favorites.length === 0) return null;

  return (
    <div className="mb-6">
      <h2 className="text-xl font-bold mb-2">Favorite Cities</h2>
      <div className="flex flex-wrap gap-2">
        {favorites.map(city => (
          <button
            key={city}
            onClick={() => onSelectCity(city)}
            className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full hover:bg-blue-200 focus:outline-none"
          >
            {city}
          </button>
        ))}
      </div>
    </div>
  );
}

export default FavoriteCities;