import React from 'react';
import ServiceTabs from './ServiceTabs';
import AssetsTable from './AssetsTable';

const AssetsSection = ({ 
  assets, 
  currentFilter, 
  onFilterChange, 
  onAssetSelect, 
  onNewAsset, 
  selectedAsset 
}) => {
  return (
    <div className="assets-section">
      <div className="section-header">
        <h1>Assets</h1>
        <button className="btn-primary" onClick={onNewAsset}>
          <i className="fas fa-plus"></i>
          New Asset
        </button>
      </div>

      <ServiceTabs 
        currentFilter={currentFilter}
        onFilterChange={onFilterChange}
      />

      <AssetsTable 
        assets={assets}
        onAssetSelect={onAssetSelect}
        selectedAsset={selectedAsset}
      />
    </div>
  );
};

export default AssetsSection; 