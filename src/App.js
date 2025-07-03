import React, { useState } from 'react';
import './App.css';
import 'leaflet/dist/leaflet.css';
import Sidebar from './components/Sidebar';
import AssetsSection from './components/AssetsSection';
import MapSection from './components/MapSection';
import AssetDetail from './components/AssetDetail';
import TaskOverview from './components/TaskOverview';
import ClientOverview from './components/ClientOverview';
import { assetsData } from './data/assetsData';

function App() {
  const [assets] = useState(assetsData);
  const [filteredAssets, setFilteredAssets] = useState(assetsData);
  const [selectedAsset, setSelectedAsset] = useState(null);
  const [currentFilter, setCurrentFilter] = useState('all');
  const [showAssetDetail, setShowAssetDetail] = useState(false);
  const [currentView, setCurrentView] = useState('assets'); // 'assets', 'tasks', 'clients'

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
    setCurrentView('assets');
  };

  const handleTaskSelect = () => {
    setCurrentView('tasks');
  };

  const handleClientSelect = () => {
    setCurrentView('clients');
  };

  const handleNewAsset = () => {
    alert('New Asset functionality would be implemented here');
  };

  const handleViewChange = (view) => {
    setCurrentView(view);
    setSelectedAsset(null);
    setShowAssetDetail(false);
  };

  const handleBackToAssets = () => {
    setSelectedAsset(null);
    setShowAssetDetail(false);
    setCurrentView('assets');
  };

  const renderCurrentView = () => {
    if (currentView === 'tasks') {
      return <TaskOverview onBack={handleBackToAssets} onTaskSelect={handleTaskSelect} />;
    }

    if (currentView === 'clients') {
      return <ClientOverview onBack={handleBackToAssets} onClientSelect={handleClientSelect} />;
    }

    if (showAssetDetail && selectedAsset) {
      return (
        <AssetDetail 
          asset={selectedAsset} 
          onBack={handleBackToAssets}
        />
      );
    }

    return (
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
    );
  };

  return (
    <div className="app-container">
      <Sidebar 
        currentView={currentView} 
        onViewChange={handleViewChange}
      />
      <main className="main-content">
        {renderCurrentView()}
      </main>
    </div>
  );
}

export default App; 