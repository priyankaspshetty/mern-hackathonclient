import React, { useState } from 'react';
import axios from 'axios';
import './PremiumForm.css';

const PremiumForm = () => {
  const [formData, setFormData] = useState({
    age: '',
    gender: '',
    smoking: '',
    conditions: '',
    sumInsured: '',
    tenure: '',
    addons: [],
  });

  const [premiumResult, setPremiumResult] = useState(null);
  const [breakdown, setBreakdown] = useState(null); 
  const [recommendations, setRecommendations] = useState([]);
  

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleAddonChange = (e) => {
    const { value, checked } = e.target;
    setFormData((prev) => {
      const updatedAddons = checked
        ? [...prev.addons, value]
        : prev.addons.filter((addon) => addon !== value);
      return { ...prev, addons: updatedAddons };
    });
  };

  const handleSubmit = async (e) => {
  e.preventDefault();
  const email = localStorage.getItem("userEmail");

  if (!email) {
    alert("User email not found. Please log in again.");
    return;
  }

  try {
    const res = await axios.post('http://localhost:4000/api/premium/calculate', {
      ...formData,
      email,
    });

    setPremiumResult(res.data.premium);
    setBreakdown(res.data.breakdown);
    setRecommendations(res.data.recommendations || []);
  } catch (error) {
    console.error('Error calculating premium:', error);
    setPremiumResult(null);
    setBreakdown(null);
    setRecommendations([]);
  }
};
  return (
    <div className="premium-form-container">
      <h2>Health Insurance Premium Calculator</h2>
      <form onSubmit={handleSubmit}>
        <input type="number" name="age" placeholder="Age" onChange={handleChange} required />

        <select name="gender" onChange={handleChange} required>
          <option value="">Select Gender</option>
          <option value="male">Male</option>
          <option value="female">Female</option>
          <option value="other">Other</option>
        </select>

        <select name="smoking" onChange={handleChange} required>
          <option value="">Smoking Habit</option>
          <option value="yes">Yes</option>
          <option value="no">No</option>
        </select>

        <input name="conditions" placeholder="Pre-existing Conditions" onChange={handleChange} />

        <input type="number" name="sumInsured" placeholder="Sum Insured (₹)" onChange={handleChange} required />

        <input type="number" name="tenure" placeholder="Policy Tenure (Years)" onChange={handleChange} required />

        <label>Add-on Covers:</label>
        <div className="addon-group">
          <label>
            <input type="checkbox" value="maternity" onChange={handleAddonChange} /> Maternity
          </label>
          <label>
            <input type="checkbox" value="critical" onChange={handleAddonChange} /> Critical Illness
          </label>
        </div>

        <button type="submit">Calculate Premium</button>
      </form>

      {premiumResult && (
        <div className="premium-result-card">
          <h3>Estimated Premium</h3>
          <p><strong>Total:</strong> ₹{premiumResult}</p>

          {breakdown && (
            <>
              <h4>Breakdown:</h4>
              <ul>
                <li><strong>Base Premium:</strong> ₹{breakdown.base}</li>
                <li><strong>Age Adjustment:</strong> ₹{breakdown.ageAdjustment}</li>
                <li><strong>Smoking Adjustment:</strong> ₹{breakdown.smokingAdjustment}</li>
                <li><strong>Conditions Adjustment:</strong> ₹{breakdown.conditionsAdjustment}</li>
                <li><strong>Add-ons Adjustment:</strong> ₹{breakdown.addonsAdjustment}</li>
                <li><strong>Annual Premium:</strong> ₹{breakdown.annualPremium}</li>
                <li><strong>Tenure:</strong> {breakdown.tenure} year(s)</li>
              </ul>
            </>
          )}

         
{recommendations.length > 0 && (
  <div className="recommendations">
    <h3>Recommended Plans for You</h3>
    <ul>
      {recommendations.map(plan => (
        <li key={plan._id}>
          <strong>{plan.name}</strong> - ₹{plan.baseRate}
          <p>{plan.description}</p>
          <em>Features: {plan.features.join(', ')}</em>
        </li>
      ))}
    </ul>
  </div>
)}
        </div>
      )}
    </div>
  );
};

export default PremiumForm;
