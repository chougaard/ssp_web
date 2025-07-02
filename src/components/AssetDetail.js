import React, { useState } from 'react';

const AssetDetail = ({ asset, onBack }) => {
  const [activeTab, setActiveTab] = useState('operational-data');

  // Mock operational data - in a real app this would come from an API
  const operationalData = {
    totalOperatingHours: 19876,
    hoursSinceLastService: 1754,
    breakdowns: 4,
    stops: 22,
    productionYear: 2015,
    installationDate: '12.01.2017',
    operationalHours: 19876,
    alarms: 59,
    chartData: [
      { period: '12', value: 62 },
      { period: '13', value: 51 },
      { period: '14', value: 58 },
      { period: '15', value: 61 },
      { period: '16', value: 78 },
      { period: '17', value: 45 },
      { period: '18', value: 68 },
      { period: '19', value: 65 },
      { period: '20', value: 82 },
      { period: '21', value: 84 },
      { period: '22', value: 69 },
      { period: '23', value: 56 },
      { period: '24', value: 67 },
      { period: '25', value: 71 },
      { period: '26', value: 82 },
      { period: '27', value: 78 },
      { period: '28', value: 65 }
    ],
    breakdownData: {
      '00-08': 56,
      '08-16': 78,
      '16-24': 34
    }
  };

  const tabs = [
    { id: 'operational-data', label: 'Operational Data' },
    { id: 'service-history', label: 'Service History' },
    { id: 'manuals', label: 'Manuals & Documentation' },
    { id: 'notifications', label: 'Notifications' },
    { id: 'location', label: 'Location' }
  ];

  const renderAssetDiagram = () => (
    <div className="asset-diagram">
      <svg viewBox="0 0 400 300" className="asset-svg">
        {/* Machine base */}
        <rect x="50" y="200" width="300" height="80" fill="none" stroke="#4ECDC4" strokeWidth="2" />
        
        {/* Machine body */}
        <rect x="80" y="120" width="240" height="80" fill="none" stroke="#4ECDC4" strokeWidth="2" />
        
        {/* Top section */}
        <rect x="120" y="60" width="160" height="60" fill="none" stroke="#4ECDC4" strokeWidth="2" />
        
        {/* Control panel */}
        <rect x="140" y="40" width="80" height="20" fill="none" stroke="#4ECDC4" strokeWidth="1" />
        
        {/* Connecting lines */}
        <line x1="150" y1="120" x2="150" y2="80" stroke="#4ECDC4" strokeWidth="1" />
        <line x1="250" y1="120" x2="250" y2="80" stroke="#4ECDC4" strokeWidth="1" />
        
        {/* Side elements */}
        <circle cx="100" cy="160" r="15" fill="none" stroke="#4ECDC4" strokeWidth="2" />
        <circle cx="300" cy="160" r="15" fill="none" stroke="#4ECDC4" strokeWidth="2" />
        
        {/* Detail elements */}
        <rect x="160" y="140" width="40" height="40" fill="none" stroke="#4ECDC4" strokeWidth="1" />
        <rect x="200" y="140" width="40" height="40" fill="none" stroke="#4ECDC4" strokeWidth="1" />
      </svg>
    </div>
  );

  const renderBarChart = () => (
    <div className="bar-chart">
      <div className="chart-container">
        {operationalData.chartData.map((item, index) => (
          <div key={index} className="bar-item">
            <div 
              className="bar" 
              style={{ height: `${item.value}%` }}
            ></div>
            <span className="bar-label">{item.period}</span>
          </div>
        ))}
      </div>
    </div>
  );

  const renderCircularChart = () => {
    const total = Object.values(operationalData.breakdownData).reduce((sum, val) => sum + val, 0);
    let currentAngle = 0;
    
    return (
      <div className="circular-chart">
        <div className="donut-chart">
          <svg viewBox="0 0 200 200">
            {Object.entries(operationalData.breakdownData).map(([period, value], index) => {
              const percentage = (value / total) * 100;
              const angle = (percentage / 100) * 360;
              const startAngle = currentAngle;
              const endAngle = currentAngle + angle;
              
              const x1 = 100 + 80 * Math.cos((startAngle - 90) * Math.PI / 180);
              const y1 = 100 + 80 * Math.sin((startAngle - 90) * Math.PI / 180);
              const x2 = 100 + 80 * Math.cos((endAngle - 90) * Math.PI / 180);
              const y2 = 100 + 80 * Math.sin((endAngle - 90) * Math.PI / 180);
              
              const largeArcFlag = angle > 180 ? 1 : 0;
              
              const pathData = [
                `M 100 100`,
                `L ${x1} ${y1}`,
                `A 80 80 0 ${largeArcFlag} 1 ${x2} ${y2}`,
                'Z'
              ].join(' ');
              
              currentAngle += angle;
              
              return (
                <path
                  key={period}
                  d={pathData}
                  fill={index === 0 ? '#4ECDC4' : index === 1 ? '#2A9D8F' : '#264653'}
                  stroke="#1a1a1a"
                  strokeWidth="2"
                />
              );
            })}
            <circle cx="100" cy="100" r="45" fill="#1a1a1a" />
          </svg>
          <div className="chart-center">
            <div className="chart-title">24 Hour</div>
            <div className="chart-subtitle">Breakdown</div>
          </div>
        </div>
        <div className="chart-legend">
          {Object.entries(operationalData.breakdownData).map(([period, value], index) => (
            <div key={period} className="legend-item">
              <span className="legend-color" style={{
                backgroundColor: index === 0 ? '#4ECDC4' : index === 1 ? '#2A9D8F' : '#264653'
              }}></span>
              <span className="legend-text">{period} {Math.round((value / total) * 100)}%</span>
            </div>
          ))}
        </div>
      </div>
    );
  };

  return (
    <div className="asset-detail">
      <div className="asset-detail-header">
        <button className="back-btn" onClick={onBack}>
          <i className="fas fa-arrow-left"></i>
          Back to list
        </button>
        <h1 className="asset-title">{asset.id}</h1>
      </div>

      <div className="asset-detail-tabs">
        {tabs.map(tab => (
          <button
            key={tab.id}
            className={`detail-tab ${activeTab === tab.id ? 'active' : ''}`}
            onClick={() => setActiveTab(tab.id)}
          >
            {tab.label}
          </button>
        ))}
      </div>

      <div className="asset-detail-content">
        <div className="asset-left-panel">
          {renderAssetDiagram()}
          
          <div className="asset-info-section">
            <div className="section-tabs">
              <button className="section-tab active">Asset Info</button>
              <button className="section-tab">Client Info</button>
            </div>
            
            <div className="asset-info-grid">
              <div className="info-item">
                <label>AssetID</label>
                <div className="info-value">
                  {asset.id}
                  <i className="fas fa-edit"></i>
                </div>
              </div>
              
              <div className="info-item">
                <label>Asset Type</label>
                <div className="info-value">
                  Machine
                  <i className="fas fa-edit"></i>
                </div>
              </div>
              
              <div className="info-item">
                <label>Model</label>
                <div className="info-value">
                  {asset.model}
                  <i className="fas fa-edit"></i>
                </div>
              </div>
              
              <div className="info-item">
                <label>Production Year</label>
                <div className="info-value">{operationalData.productionYear}</div>
              </div>
              
              <div className="info-item">
                <label>Installation Date</label>
                <div className="info-value">{operationalData.installationDate}</div>
              </div>
              
              <div className="info-item">
                <label>Operational Hours</label>
                <div className="info-value">{operationalData.operationalHours}</div>
              </div>
              
              <div className="info-item">
                <label>Last Service</label>
                <div className="info-value">{asset.lastService}</div>
              </div>
              
              <div className="info-item">
                <label>Next Service</label>
                <div className="info-value">
                  {asset.nextService}
                  <i className="fas fa-edit"></i>
                </div>
              </div>
              
              <div className="info-item">
                <label>Alarms</label>
                <div className="info-value">{operationalData.alarms}</div>
              </div>
            </div>
          </div>
        </div>

        <div className="asset-right-panel">
          <div className="stats-cards">
            <div className="stat-card">
              <div className="stat-value">{operationalData.totalOperatingHours.toLocaleString()}</div>
              <div className="stat-label">
                <i className="fas fa-cog"></i>
                Total operating hours
              </div>
            </div>
            
            <div className="stat-card">
              <div className="stat-value">{operationalData.hoursSinceLastService.toLocaleString()}</div>
              <div className="stat-label">
                <i className="fas fa-clock"></i>
                Operating hours since last Service
              </div>
            </div>
            
            <div className="stat-card small">
              <div className="stat-value">{operationalData.breakdowns}</div>
              <div className="stat-label">
                <i className="fas fa-exclamation-triangle"></i>
                Breakdowns
              </div>
            </div>
            
            <div className="stat-card small">
              <div className="stat-value">{operationalData.stops}</div>
              <div className="stat-label">
                <i className="fas fa-stop-circle"></i>
                Stops
              </div>
            </div>
          </div>

          {renderBarChart()}
          {renderCircularChart()}
        </div>
      </div>
    </div>
  );
};

export default AssetDetail;