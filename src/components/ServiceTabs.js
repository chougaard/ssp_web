import React from 'react';

const ServiceTabs = ({ currentFilter, onFilterChange }) => {
  const tabs = [
    { key: 'all', label: 'Service' },
    { key: 'not-operational', label: 'Not operational' },
    { key: 'missing-metadata', label: 'Missing Metadata' },
    { key: 'high-priority', label: 'High op.h. • No SLA' }
  ];

  return (
    <div className="service-tabs">
      {tabs.map(tab => (
        <button
          key={tab.key}
          className={`tab-btn ${currentFilter === tab.key ? 'active' : ''}`}
          onClick={() => onFilterChange(tab.key)}
        >
          {tab.label}
        </button>
      ))}
    </div>
  );
};

export default ServiceTabs; 