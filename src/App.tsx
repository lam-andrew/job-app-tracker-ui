// src/App.tsx
import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import MainPage from './pages/MainPage';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/mainpage" element={<MainPage />} />
          <Route path="/" element={<LoginPage onSuccess={handleLoginSuccess} onError={handleLoginError} />} />
        </Routes>
      </div>
    </Router>
  );
}

function handleLoginSuccess(response: any) {
  console.log('Login successful:', response);
  // Here you would typically handle the login success, e.g., store the token, redirect to the homepage, etc.
  window.location.href = '/mainpage';
}

function handleLoginError(error: any) {
  console.error('Login failed:', error);
  // Handle login error, e.g., show a notification to the user
}

export default App;
