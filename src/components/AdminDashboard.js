import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './AdminDashboard.css';

const AdminDashboard = () => {
  const [plans, setPlans] = useState([]);
  const [newPlan, setNewPlan] = useState({ name: '', description: '', baseRate: '', features: '' });

  const fetchPlans = async () => {
    const res = await axios.get('http://localhost:4000/api/admin/plans');
    setPlans(res.data);
  };

  useEffect(() => {
    fetchPlans();
  }, []);

  const handleChange = (e) => {
    setNewPlan({ ...newPlan, [e.target.name]: e.target.value });
  };

  const addPlan = async () => {
    const featuresArray = newPlan.features.split(',').map(f => f.trim());
    await axios.post('http://localhost:4000/api/admin/plans', { ...newPlan, baseRate: Number(newPlan.baseRate), features: featuresArray });
    setNewPlan({ name: '', description: '', baseRate: '', features: '' });
    fetchPlans();
  };

  const deletePlan = async (id) => {
    await axios.delete(`http://localhost:4000/api/admin/plans/${id}`);
    fetchPlans();
  };

  return (
    <div className="admin-dashboard">
      <h2>Admin: Manage Policy Plans</h2>
      <div className="add-form">
        <input name="name" placeholder="Plan Name" value={newPlan.name} onChange={handleChange} />
        <input name="description" placeholder="Description" value={newPlan.description} onChange={handleChange} />
        <input name="baseRate" placeholder="Base Rate" value={newPlan.baseRate} onChange={handleChange} type="number" />
        <input name="features" placeholder="Features (comma separated)" value={newPlan.features} onChange={handleChange} />
        <button onClick={addPlan}>Add Plan</button>
      </div>

      <h3>Available Plans</h3>
      <ul>
        {plans.map((plan) => (
          <li key={plan._id}>
            <strong>{plan.name}</strong> - ₹{plan.baseRate} <br />
            {plan.description} <br />
            <em>Features:</em> {plan.features.join(', ')}
            <br />
            <button onClick={() => deletePlan(plan._id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AdminDashboard;
