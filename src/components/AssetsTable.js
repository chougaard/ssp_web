import React from 'react';

const AssetsTable = ({ assets, onAssetSelect, selectedAsset }) => {
  const handleRowClick = (asset) => {
    onAssetSelect(asset);
  };

  const handleViewAsset = (e, asset) => {
    e.stopPropagation(); // Prevent row click
    onAssetSelect(asset);
  };

  return (
    <div className="table-container">
      <table className="assets-table">
        <thead>
          <tr>
            <th>AssetID</th>
            <th>Model</th>
            <th>Client</th>
            <th>
              Next Service
              <i className="fas fa-sort-down"></i>
            </th>
            <th>Last Service</th>
            <th><i className="fas fa-shield-alt"></i></th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {assets.map(asset => (
            <tr
              key={asset.id}
              className={selectedAsset?.id === asset.id ? 'highlighted' : ''}
              onClick={() => handleRowClick(asset)}
              style={{ cursor: 'pointer' }}
            >
              <td>
                <span className="asset-id">{asset.id}</span>
              </td>
              <td>{asset.model}</td>
              <td>{asset.client}</td>
              <td className="service-date">{asset.nextService}</td>
              <td className="service-date">{asset.lastService}</td>
              <td>
                <span className="service-badge">{asset.serviceCount}</span>
              </td>
              <td>
                <button
                  className="action-btn"
                  onClick={(e) => handleViewAsset(e, asset)}
                  title="View asset details"
                >
                  <i className="fas fa-eye"></i>
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AssetsTable; 