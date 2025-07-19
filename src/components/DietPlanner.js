import React from 'react';
import { useNavigate } from 'react-router-dom';

const DietPlanner = () => {
  const navigate = useNavigate();

  const goToPremium = () => {
    navigate('/premium');
  };

  return (
    <section className="diet-planner">
      <h2>Personalized Diet Planner</h2>
      {/* your existing planner inputs */}

      <button onClick={goToPremium} className="primary-btn">
        Check Health Insurance Premium
      </button>
    </section>
  );
};

export default DietPlanner;