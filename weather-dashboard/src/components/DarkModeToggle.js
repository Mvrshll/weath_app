import React from 'react';

function DarkModeToggle({ darkMode, setDarkMode }) {
  return (
    <button
      onClick={() => setDarkMode(!darkMode)}
      className="p-2 rounded-full focus:outline-none"
    >
      {darkMode ? '🌞' : '🌙'}
    </button>
  );
}

export default DarkModeToggle;