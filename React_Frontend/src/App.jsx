// src/App.jsx
import React from 'react';
import '@adminkit/core/dist/js/app.js';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import Login from './pages/Login';
import MainComponent from './components/MainComponent';
import Company from './pages/Company';
import PrivateRouteNew from './utils/PrivateRouteNew';
import Analytics from './pages/Analytics';
import Config from './utils/Config';
import LogoutComponent from './pages/LogoutComponet';
import MedicineAdd from './pages/MedicineAdd';

function App() {
  return (
    <Router>
       <Toaster position="top-center" reverseOrder={false} />
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path={Config.logoutUrl} element={<LogoutComponent/>} />
        <Route path="/home" element={<PrivateRouteNew page={Analytics} additionalProp="value" />} />
        <Route path="/company" element={<PrivateRouteNew page={Company} additionalProp="value" />} />
        <Route path="/add-medicine" element={<PrivateRouteNew page={MedicineAdd} additionalProp="value" />} />
      </Routes>
    </Router>
  );
}

export default App;