import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import './App.css';
import AppHeader from './components/Header';
import SignUp from './components/SignUp';
import SignIn from './components/SignIn';
import NewsArticles from './components/NewsArticles';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const handleLogin = () => {
    setIsAuthenticated(true);
  };

  return (
    <Router>
      <div className="App">
        <AppHeader />
        <Routes>
          <Route path="/" element={<Navigate to="/signup" />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/signin" element={<SignIn onLogin={handleLogin} />} />
          <Route
            path="/articles"
            element={
              isAuthenticated ? <NewsArticles /> : <Navigate to="/signin" />
            }
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
