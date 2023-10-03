import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import CardContainer from './components/CardContainer/CardContainer';
import LogIn from './components/LogIn/LogIn';
import Register from './components/Register/Register';
import React from 'react';
import './App.css';
import { PaymentResult } from './components/PaymentResult/PaymentResult';

function App() {
  const isUserLoogedIn = Boolean(localStorage.getItem('token'));

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path='/'
          element={
            isUserLoogedIn ? <CardContainer /> : <Navigate to='/login' />
          }
        />
        <Route
          path='/login'
          element={isUserLoogedIn ? <Navigate to='/' /> : <LogIn />}
        />
        <Route path='/signup' element={<Register />} />
        <Route path='/success' element={<PaymentResult />} />
        <Route path='/cancel' element={<PaymentResult />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
