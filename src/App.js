// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Navbar from './components/Navbar';
import HeroSection from './components/HeroSection';
import HealthTopics from './components/HealthTopics';
import DietPlanner from './components/DietPlanner';
import PremiumForm from './components/PremiumForm'; // ✅ your calculator

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route
          path="/"
          element={
            <>
              <HeroSection />
              <HealthTopics />
              <DietPlanner />
            </>
          }
        />
        <Route path="/premium" element={<PremiumForm />} />
      </Routes>
    </Router>
  );
}

export default App;
