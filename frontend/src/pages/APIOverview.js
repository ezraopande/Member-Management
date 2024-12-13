import React from 'react';
import { useNavigate } from 'react-router-dom';
import { apiSections } from '../utils/api-endpoints';
import APICard from '../components/APICard';

const APIOverview = () => {
  const navigate = useNavigate();

  return (
    <div className="bg-gray-100">
      <h1 className="text-3xl font-bold mb-6">API Overview</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {apiSections.map((section, index) => (
          <APICard
            key={index}
            name={section.name}
            description={section.description}
            icon={section.icon}
            onClick={() => navigate(`/api-docs/${section.name.toLowerCase().replace(/\s+/g, '-')}`)}
          />
        ))}
      </div>
    </div>
  );  
  
};

export default APIOverview;
