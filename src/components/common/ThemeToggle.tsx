import React from 'react';
import { Sun, Moon } from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';

export default function ThemeToggle() {
  const { isDark, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className="relative flex items-center justify-center w-14 h-7 rounded-full transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2"
      style={{
        backgroundColor: isDark ? '#334155' : '#e2e8f0',
      }}
      aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
    >
      {/* Sun Icon */}
      <Sun
        className={`absolute left-1.5 w-4 h-4 transition-all duration-300 ${
          isDark ? 'opacity-0 rotate-90 scale-0' : 'opacity-100 rotate-0 scale-100 text-yellow-500'
        }`}
      />
      
      {/* Moon Icon */}
      <Moon
        className={`absolute right-1.5 w-4 h-4 transition-all duration-300 ${
          isDark ? 'opacity-100 rotate-0 scale-100 text-blue-300' : 'opacity-0 -rotate-90 scale-0'
        }`}
      />
      
      {/* Toggle Circle */}
      <div
        className={`absolute w-5 h-5 rounded-full shadow-lg transition-all duration-300 ${
          isDark 
            ? 'translate-x-7 bg-slate-800' 
            : 'translate-x-1 bg-white'
        }`}
        style={{
          boxShadow: isDark 
            ? '0 2px 4px rgba(0, 0, 0, 0.3)' 
            : '0 2px 4px rgba(0, 0, 0, 0.2)',
        }}
      >
        {/* Inner icon in the circle */}
        {isDark ? (
          <Moon className="w-3 h-3 text-blue-300 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
        ) : (
          <Sun className="w-3 h-3 text-yellow-500 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
        )}
      </div>
    </button>
  );
}
