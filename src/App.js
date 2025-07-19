import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './components/Login';
import PremiumForm from './components/PremiumForm';
import AdminDashboard from './components/AdminDashboard';

<Router>
  <Routes>
    {/* other routes */}
    <Route path="/admin" element={<AdminDashboard />} />
  </Routes>
</Router>




function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/form" element={<PremiumForm />} />
        <Route path="/admin" element={<AdminDashboard />} />
      </Routes>
    </Router>
  );
}

export default App; // ✅ This is required
