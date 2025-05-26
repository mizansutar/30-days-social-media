import React from 'react';
import { ToastContainer,toast } from 'react-toastify';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import LoginRegister from './componets/loginreg';
import LandingPage from './componets/landingPage';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LoginRegister />} />
        <Route path="/landing" element={<LandingPage />} />
      </Routes>
      <ToastContainer />
    </BrowserRouter>
  );
}

export default App;
