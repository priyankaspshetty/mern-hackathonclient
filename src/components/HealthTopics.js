import React from 'react';
import './HealthTopics.css';

const topics = [
  {
    title: 'COVID-19 Update',
    description: 'Stay updated on the latest COVID-19 guidelines and vaccination info.',
  },
  {
    title: 'Heart Health',
    description: 'Discover tips and information for maintaining a healthy heart and cardiovascular system.',
  },
  {
    title: 'Mental Wellness',
    description: 'Explore mental health resources and techniques to support your emotional wellbeing.',
  },
];

const HealthTopics = () => (
  <section className="health-topics">
    <h2>Featured Health Topics</h2>
    <div className="cards">
      {topics.map((topic, idx) => (
        <div key={idx} className="card">
          <h3>{topic.title}</h3>
          <p>{topic.description}</p>
          <button>Learn More</button>
        </div>
      ))}
    </div>
  </section>
);

export default HealthTopics;
