// App.js

import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LandingPage from './components/Landing.js'
import LoginPage from './components/Login.js';
import DashboardPage from './components/Dashboard.js';
import Addcustomer from './components/Add_Cust.js';
import PaidList from './components/PaidList.js'

const App = () => {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<LandingPage />} />
        <Route exact path="/login" element={<LoginPage />} />
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="/customer-add" element={<Addcustomer />} />
        <Route path="/customer/paid" element={<PaidList />} />
      </Routes>
    </Router>
  );
};

export default App;
