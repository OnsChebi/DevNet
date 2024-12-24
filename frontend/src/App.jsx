import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Feed from './components/Feed';
import Registration from './components/Registration';
import Login from './components/Login';
import Navbar from './components/Navbar'; 
import UserProfile from './components/UserProfile';

function App() {
  // Theme state and toggle logic
  const [theme, setTheme] = useState(localStorage.getItem('theme') || 'light');

  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    localStorage.setItem('theme', theme); // Save theme preference
  }, [theme]);

  const handleThemeSwitch = () => {
    setTheme((prevTheme) => (prevTheme === 'light' ? 'dark' : 'light'));
  };

  return (
    <Router>
      <Navbar theme={theme} onThemeToggle={handleThemeSwitch} />
      <div className="app-container">
        <Routes>
          <Route path="/" element={<Feed/>} />
          <Route path="/register" element={<Registration />} />
          <Route path="/login" element={<Login />} />
          <Route path="/profile" element={<UserProfile/>} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
