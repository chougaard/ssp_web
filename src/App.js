import React, { useState } from 'react';
import './App.css';
import Sidebar from './components/Sidebar';
import AssetsSection from './components/AssetsSection';
import MapSection from './components/MapSection';
import AssetDetail from './components/AssetDetail';
import { assetsData } from './data/assetsData';

function App() {
  const [assets, setAssets] = useState(assetsData);
  const [filteredAssets, setFilteredAssets] = useState(assetsData);
  const [selectedAsset, setSelectedAsset] = useState(null);
  const [currentFilter, setCurrentFilter] = useState('all');
  const [showAssetDetail, setShowAssetDetail] = useState(false);

  const handleFilterChange = (filter) => {
    setCurrentFilter(filter);
    let filtered;
    
    if (filter === 'all') {
      filtered = assets;
    } else {
      filtered = assets.filter(asset => asset.status === filter);
    }
    
    setFilteredAssets(filtered);
  };

  const handleAssetSelect = (asset) => {
    setSelectedAsset(asset);
    setShowAssetDetail(true);
  };

  const handleBackToList = () => {
    setShowAssetDetail(false);
    setSelectedAsset(null);
  };

  const handleNewAsset = () => {
    alert('New Asset functionality would be implemented here');
  };

  return (
    <div className="app-container">
      <Sidebar />
      <main className="main-content">
        {showAssetDetail && selectedAsset ? (
          <AssetDetail 
            asset={selectedAsset} 
            onBack={handleBackToList}
          />
        ) : (
          <div className="content-wrapper">
            <AssetsSection
              assets={filteredAssets}
              currentFilter={currentFilter}
              onFilterChange={handleFilterChange}
              onAssetSelect={handleAssetSelect}
              onNewAsset={handleNewAsset}
              selectedAsset={selectedAsset}
            />
            <MapSection
              assets={filteredAssets}
              selectedAsset={selectedAsset}
              onAssetSelect={handleAssetSelect}
            />
          </div>
        )}
      </main>
    </div>
  );
}

export default App; 