import React, { useState, useEffect, useRef, useMemo } from 'react';
import L from 'leaflet';

// Fix for default markers in react-leaflet
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
  iconUrl: require('leaflet/dist/images/marker-icon.png'),
  shadowUrl: require('leaflet/dist/images/marker-shadow.png'),
});

const AssetDetail = ({ asset, onBack, onAddTask }) => {
  const [activeTab, setActiveTab] = useState('operational-data');
  const [activeInfoTab, setActiveInfoTab] = useState('asset-info');
  const mapRef = useRef(null);
  const mapInstanceRef = useRef(null);

  // Mock operational data matching the screenshot
  const operationalData = {
    totalOperatingHours: 19876,
    hoursSinceLastService: 1754,
    breakdowns: 4,
    stops: 22,
    productionYear: 2015,
    installationDate: '12.01.2017',
    operationalHours: 19876,
    alarms: 59,
    model: 'XYZ-500',
    chartData: [
      { period: '12', value: 22 },
      { period: '13', value: 18 },
      { period: '14', value: 20 },
      { period: '15', value: 23 },
      { period: '16', value: 24 },
      { period: '17', value: 12 },
      { period: '18', value: 19 },
      { period: '19', value: 21 },
      { period: '20', value: 22 },
      { period: '21', value: 24 },
      { period: '22', value: 19 },
      { period: '23', value: 16 },
      { period: '24', value: 18 },
      { period: '25', value: 20 },
      { period: '26', value: 23 },
      { period: '27', value: 21 },
      { period: '28', value: 19 }
    ],
    breakdownData: {
      '00-08': 56,
      '08-16': 78,
      '16-24': 34
    }
  };

  // Mock location data
  const locationData = useMemo(() => ({
    address: 'Streetname 123, Citytown 9876',
    lat: 56.1629,
    lng: 10.2039,
    city: 'Aarhus',
    country: 'Denmark'
  }), []);

  // Mock documents data for Manuals & Documentation
  const documentsData = [
    {
      id: 1,
      name: 'XYZ-500 User Manual',
      type: 'Manual',
      size: '2.3 MB',
      lastModified: '2023-08-15',
      icon: 'fas fa-file-pdf'
    },
    {
      id: 2,
      name: 'Installation Guide',
      type: 'Installation Guide',
      size: '1.8 MB',
      lastModified: '2023-07-22',
      icon: 'fas fa-file-pdf'
    },
    {
      id: 3,
      name: 'Maintenance Schedule',
      type: 'Maintenance',
      size: '0.9 MB',
      lastModified: '2023-09-10',
      icon: 'fas fa-file-pdf'
    },
    {
      id: 4,
      name: 'Technical Specifications',
      type: 'Technical',
      size: '1.2 MB',
      lastModified: '2023-06-30',
      icon: 'fas fa-file-pdf'
    },
    {
      id: 5,
      name: 'Safety Instructions',
      type: 'Safety',
      size: '0.7 MB',
      lastModified: '2023-08-05',
      icon: 'fas fa-file-pdf'
    },
    {
      id: 6,
      name: 'Electrical Diagram',
      type: 'Diagram',
      size: '3.1 MB',
      lastModified: '2023-07-18',
      icon: 'fas fa-file-pdf'
    }
  ];

  const tabs = [
    { id: 'operational-data', label: 'Operational Data' },
    { id: 'service-history', label: 'Service History' },
    { id: 'manuals', label: 'Manuals & Documentation' },
    { id: 'notifications', label: 'Notifications' },
    { id: 'location', label: 'Location' }
  ];

  // Initialize map when Location tab is active
  useEffect(() => {
    if (activeTab === 'location' && mapRef.current && !mapInstanceRef.current) {
      mapInstanceRef.current = L.map(mapRef.current, {
        zoomControl: true,
        scrollWheelZoom: true
      }).setView([locationData.lat, locationData.lng], 13);

      // Add dark theme tiles
      L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
        subdomains: 'abcd',
        maxZoom: 19
      }).addTo(mapInstanceRef.current);

      // Add marker for asset location
      const marker = L.circleMarker([locationData.lat, locationData.lng], {
        radius: 12,
        fillColor: '#4ECDC4',
        color: '#ffffff',
        weight: 3,
        opacity: 1,
        fillOpacity: 0.8
      });

      const popupContent = `
        <div class="marker-popup">
          <h4>ABC 9876 5432</h4>
          <p><strong>Address:</strong> ${locationData.address}</p>
          <p><strong>City:</strong> ${locationData.city}</p>
          <p><strong>Country:</strong> ${locationData.country}</p>
        </div>
      `;

      marker.bindPopup(popupContent);
      marker.addTo(mapInstanceRef.current);
    }

    // Clean up map when component unmounts or tab changes
    return () => {
      if (mapInstanceRef.current && activeTab !== 'location') {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }
    };
  }, [activeTab, locationData]);

  const renderAssetDiagram = () => (
    <div className="asset-diagram">
      <svg viewBox="0 0 400 300" className="asset-svg">
        {/* Machine base platform */}
        <rect x="40" y="220" width="320" height="60" fill="none" stroke="#4ECDC4" strokeWidth="2" rx="4" />
        
        {/* Main machine body */}
        <rect x="80" y="140" width="240" height="80" fill="none" stroke="#4ECDC4" strokeWidth="2" rx="4" />
        
        {/* Machine top section */}
        <rect x="120" y="80" width="160" height="60" fill="none" stroke="#4ECDC4" strokeWidth="2" rx="4" />
        
        {/* Control panel */}
        <rect x="140" y="50" width="120" height="30" fill="none" stroke="#4ECDC4" strokeWidth="1.5" rx="2" />
        
        {/* Mechanical arm/component */}
        <rect x="90" y="100" width="80" height="40" fill="none" stroke="#4ECDC4" strokeWidth="1.5" rx="2" />
        <rect x="230" y="100" width="80" height="40" fill="none" stroke="#4ECDC4" strokeWidth="1.5" rx="2" />
        
        {/* Connecting pipes/tubes */}
        <line x1="130" y1="140" x2="130" y2="120" stroke="#4ECDC4" strokeWidth="2" />
        <line x1="170" y1="140" x2="170" y2="120" stroke="#4ECDC4" strokeWidth="2" />
        <line x1="230" y1="140" x2="230" y2="120" stroke="#4ECDC4" strokeWidth="2" />
        <line x1="270" y1="140" x2="270" y2="120" stroke="#4ECDC4" strokeWidth="2" />
        
        {/* Cylinders/components */}
        <circle cx="110" cy="180" r="20" fill="none" stroke="#4ECDC4" strokeWidth="2" />
        <circle cx="150" cy="180" r="20" fill="none" stroke="#4ECDC4" strokeWidth="2" />
        <circle cx="250" cy="180" r="20" fill="none" stroke="#4ECDC4" strokeWidth="2" />
        <circle cx="290" cy="180" r="20" fill="none" stroke="#4ECDC4" strokeWidth="2" />
        
        {/* Detail components */}
        <rect x="160" y="160" width="30" height="20" fill="none" stroke="#4ECDC4" strokeWidth="1" rx="2" />
        <rect x="200" y="160" width="30" height="20" fill="none" stroke="#4ECDC4" strokeWidth="1" rx="2" />
        
        {/* Support structures */}
        <line x1="60" y1="220" x2="60" y2="140" stroke="#4ECDC4" strokeWidth="2" />
        <line x1="340" y1="220" x2="340" y2="140" stroke="#4ECDC4" strokeWidth="2" />
        
        {/* Additional mechanical details */}
        <rect x="180" y="90" width="40" height="20" fill="none" stroke="#4ECDC4" strokeWidth="1" rx="2" />
        <circle cx="200" cy="100" r="8" fill="none" stroke="#4ECDC4" strokeWidth="1" />
        
        {/* Measurement indicators */}
        <rect x="100" y="240" width="20" height="10" fill="none" stroke="#4ECDC4" strokeWidth="1" />
        <rect x="280" y="240" width="20" height="10" fill="none" stroke="#4ECDC4" strokeWidth="1" />
      </svg>
    </div>
  );

  const renderBarChart = () => {
    // Generate dates for the last 17 days based on chart data
    const generateDateLabels = () => {
      const dates = [];
      const currentDate = new Date();
      currentDate.setDate(currentDate.getDate() - (operationalData.chartData.length - 1));
      
      for (let i = 0; i < operationalData.chartData.length; i++) {
        const date = new Date(currentDate);
        date.setDate(currentDate.getDate() + i);
        dates.push({
          short: date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
          full: date.toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }),
          dayOfWeek: date.toLocaleDateString('en-US', { weekday: 'short' })
        });
      }
      return dates;
    };

    const dateLabels = generateDateLabels();
    const maxValue = 24; // Maximum 24 hours per day
    
    return (
      <div className="bar-chart premium">
        <div className="chart-title">Operating Hours Trend</div>
        <div className="chart-subtitle">Daily operating hours over the last {operationalData.chartData.length} days</div>
        
        <div className="chart-wrapper">
          <div className="chart-y-axis">
            <div className="y-axis-label">Hours</div>
            <div className="y-axis-values">
              <span className="y-value">24</span>
              <span className="y-value">18</span>
              <span className="y-value">12</span>
              <span className="y-value">6</span>
              <span className="y-value">0</span>
            </div>
          </div>
          
          <div className="chart-container premium">
            <div className="chart-grid">
              {[0, 25, 50, 75, 100].map(line => (
                <div 
                  key={line} 
                  className="grid-line" 
                  style={{ bottom: `${line}%` }}
                ></div>
              ))}
            </div>
            
            {operationalData.chartData.map((item, index) => {
              const percentage = (item.value / maxValue) * 100;
              const date = dateLabels[index];
              
              return (
                <div 
                  key={index} 
                  className="bar-item premium"
                  data-value={item.value}
                  data-date={date.full}
                  data-day={date.dayOfWeek}
                >
                  <div 
                    className="bar premium" 
                    style={{ height: `${percentage}%` }}
                  >
                    <div className="bar-value">{item.value}h</div>
                  </div>
                  <div className="bar-label">
                    <span className="date-short">{date.short}</span>
                    <span className="day-of-week">{date.dayOfWeek}</span>
                  </div>
                  
                  <div className="bar-tooltip">
                    <div className="tooltip-header">{date.full}</div>
                    <div className="tooltip-content">
                      <div className="tooltip-row">
                        <span className="tooltip-label">Operating Hours:</span>
                        <span className="tooltip-value">{item.value}h</span>
                      </div>
                      <div className="tooltip-row">
                        <span className="tooltip-label">Efficiency:</span>
                        <span className="tooltip-value">{Math.round((item.value / 24) * 100)}%</span>
                      </div>
                      <div className="tooltip-row">
                        <span className="tooltip-label">Status:</span>
                        <span className={`tooltip-value ${item.value > 16 ? 'high' : item.value > 8 ? 'medium' : 'low'}`}>
                          {item.value > 16 ? 'High Usage' : item.value > 8 ? 'Normal' : 'Low Usage'}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    );
  };

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
              
              const x1 = 100 + 70 * Math.cos((startAngle - 90) * Math.PI / 180);
              const y1 = 100 + 70 * Math.sin((startAngle - 90) * Math.PI / 180);
              const x2 = 100 + 70 * Math.cos((endAngle - 90) * Math.PI / 180);
              const y2 = 100 + 70 * Math.sin((endAngle - 90) * Math.PI / 180);
              
              const largeArcFlag = angle > 180 ? 1 : 0;
              
              const pathData = [
                `M 100 100`,
                `L ${x1} ${y1}`,
                `A 70 70 0 ${largeArcFlag} 1 ${x2} ${y2}`,
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
            <circle cx="100" cy="100" r="40" fill="#1a1a1a" />
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

  const renderOperationalData = () => (
    <>
      <div className="stats-cards">
        <div className="stat-card">
          <div className="stat-label">
            <i className="fas fa-cog"></i>
            Total operating hours
          </div>
          <div className="stat-value">{operationalData.totalOperatingHours.toLocaleString()}</div>
        </div>
        
        <div className="stat-card">
          <div className="stat-label">
            <i className="fas fa-clock"></i>
            Operating hours since last Service
          </div>
          <div className="stat-value">{operationalData.hoursSinceLastService.toLocaleString()}</div>
        </div>
        
        <div className="stat-card small">
          <div className="stat-label">
            <i className="fas fa-exclamation-triangle"></i>
            Breakdowns
          </div>
          <div className="stat-value">{operationalData.breakdowns}</div>
        </div>
        
        <div className="stat-card small">
          <div className="stat-label">
            <i className="fas fa-stop-circle"></i>
            Stops
          </div>
          <div className="stat-value">{operationalData.stops}</div>
        </div>
      </div>

      {renderBarChart()}
      {renderCircularChart()}
    </>
  );

  const renderManualsAndDocumentation = () => (
    <div className="documents-section">
      <div className="documents-header">
        <h3>Asset Documentation</h3>
        <p>Manuals, diagrams, and technical documents for this asset</p>
      </div>
      
      <div className="documents-list">
        {documentsData.map(doc => (
          <div key={doc.id} className="document-item">
            <div className="document-icon">
              <i className={`${doc.icon} pdf-icon`}></i>
            </div>
            <div className="document-info">
              <div className="document-name">{doc.name}</div>
              <div className="document-meta">
                <span className="document-type">{doc.type}</span>
                <span className="document-size">{doc.size}</span>
                <span className="document-date">Modified: {doc.lastModified}</span>
              </div>
            </div>
            <div className="document-actions">
              <button className="btn-download" title="Download">
                <i className="fas fa-download"></i>
              </button>
              <button className="btn-view" title="View">
                <i className="fas fa-eye"></i>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderServiceHistory = () => (
    <div className="service-history">
      <h3>Service History</h3>
      <p>Coming soon...</p>
    </div>
  );

  const renderNotifications = () => (
    <div className="notifications">
      <h3>Notifications</h3>
      <p>Coming soon...</p>
    </div>
  );

  const renderLocation = () => (
    <div className="location-section">
      <div className="location-header">
        <h3>Asset Location</h3>
        <div className="location-address">
          <i className="fas fa-map-marker-alt"></i>
          <span>{locationData.address}</span>
        </div>
      </div>
      
      <div className="location-map">
        <div 
          ref={mapRef} 
          className="asset-map-container"
          style={{ height: '400px', width: '100%' }}
        />
      </div>
      
      <div className="location-details">
        <div className="location-info">
          <div className="info-row">
            <span className="info-label">City:</span>
            <span className="info-value">{locationData.city}</span>
          </div>
          <div className="info-row">
            <span className="info-label">Country:</span>
            <span className="info-value">{locationData.country}</span>
          </div>
          <div className="info-row">
            <span className="info-label">Coordinates:</span>
            <span className="info-value">{locationData.lat.toFixed(4)}, {locationData.lng.toFixed(4)}</span>
          </div>
        </div>
      </div>
    </div>
  );

  const renderRightPanelContent = () => {
    switch (activeTab) {
      case 'operational-data':
        return renderOperationalData();
      case 'service-history':
        return renderServiceHistory();
      case 'manuals':
        return renderManualsAndDocumentation();
      case 'notifications':
        return renderNotifications();
      case 'location':
        return renderLocation();
      default:
        return renderOperationalData();
    }
  };

  return (
    <div className="asset-detail">
      <div className="asset-detail-header">
        <button className="back-btn" onClick={onBack}>
          <i className="fas fa-arrow-left"></i>
          Back to list
        </button>
        <h1 className="asset-title">ABC 9876 5432</h1>
        <button className="add-task-btn" onClick={() => onAddTask(asset)}>
          <i className="fas fa-plus"></i>
          Add Task
        </button>
      </div>

      <div className="asset-detail-content">
        <div className="asset-left-panel">
          {renderAssetDiagram()}
          
          <div className="asset-info-section">
            <div className="section-tabs">
              <button 
                className={`section-tab ${activeInfoTab === 'asset-info' ? 'active' : ''}`}
                onClick={() => setActiveInfoTab('asset-info')}
              >
                Asset Info
              </button>
              <button 
                className={`section-tab ${activeInfoTab === 'client-info' ? 'active' : ''}`}
                onClick={() => setActiveInfoTab('client-info')}
              >
                Client Info
              </button>
            </div>
            
            <div className="asset-info-grid">
              <div className="info-item">
                <label>AssetID</label>
                <div className="info-value">
                  ABC 9876 5432
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
                  {operationalData.model}
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
                <div className="info-value">{operationalData.operationalHours.toLocaleString()}</div>
              </div>
              
              <div className="info-item">
                <label>Last Service</label>
                <div className="info-value">23.09.2024</div>
              </div>
              
              <div className="info-item">
                <label>Next Service</label>
                <div className="info-value">
                  21.03.2025
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

          <div className="right-panel-content">
            {renderRightPanelContent()}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AssetDetail;