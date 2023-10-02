import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import CardContainer from './components/CardContainer/CardContainer';
import LogIn from './components/LogIn/LogIn';
import Register from './components/Register/Register';
import React from 'react';
import './App.css';

function App() {
  const isUserLoogedIn = Boolean(localStorage.getItem('token'));

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            isUserLoogedIn ? <CardContainer /> : <Navigate to="/login" />
          }
        />
        <Route
          path="/login"
          element={isUserLoogedIn ? <Navigate to="/" /> : <LogIn />}
        />
        <Route
          path="/signup" element={ <Register />}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
