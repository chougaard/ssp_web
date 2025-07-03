import React, { useState } from 'react';

const ClientOverview = ({ onBack, onClientSelect }) => {
  const [currentFilter, setCurrentFilter] = useState('all');
  const [selectedClient, setSelectedClient] = useState(null);

  // Mock client data
  const clientsData = [
    {
      id: 1,
      name: 'Company X',
      contactPerson: 'David Thompson',
      contactEmail: 'dthompson@companyx.com',
      contactPhone: '+45 98765432',
      industry: 'Manufacturing',
      location: 'Copenhagen, Denmark',
      activeAssets: 12,
      lastContact: '15.04.2025',
      nextReview: '22.05.2025',
      status: 'active',
      priority: 'high',
      contractValue: '€2.4M',
      relationship: 'Premium'
    },
    {
      id: 2,
      name: 'Corporation Y',
      contactPerson: 'Sarah Johnson',
      contactEmail: 'sjohnson@corporationy.com',
      contactPhone: '+45 87654321',
      industry: 'Automotive',
      location: 'Aarhus, Denmark',
      activeAssets: 8,
      lastContact: '12.04.2025',
      nextReview: '28.04.2025',
      status: 'active',
      priority: 'medium',
      contractValue: '€1.8M',
      relationship: 'Standard'
    },
    {
      id: 3,
      name: 'Business Z',
      contactPerson: 'Mike Wilson',
      contactEmail: 'mwilson@businessz.com',
      contactPhone: '+45 76543210',
      industry: 'Energy',
      location: 'Odense, Denmark',
      activeAssets: 15,
      lastContact: '08.04.2025',
      nextReview: '15.05.2025',
      status: 'active',
      priority: 'high',
      contractValue: '€3.2M',
      relationship: 'Premium'
    },
    {
      id: 4,
      name: 'Studio Q',
      contactPerson: 'Lisa Anderson',
      contactEmail: 'landerson@studioq.com',
      contactPhone: '+45 65432109',
      industry: 'Media',
      location: 'Aalborg, Denmark',
      activeAssets: 4,
      lastContact: '05.04.2025',
      nextReview: '10.05.2025',
      status: 'inactive',
      priority: 'low',
      contractValue: '€0.6M',
      relationship: 'Basic'
    },
    {
      id: 5,
      name: 'Agency R',
      contactPerson: 'Tom Brown',
      contactEmail: 'tbrown@agencyr.com',
      contactPhone: '+45 54321098',
      industry: 'Technology',
      location: 'Esbjerg, Denmark',
      activeAssets: 6,
      lastContact: '20.03.2025',
      nextReview: '25.04.2025',
      status: 'review',
      priority: 'medium',
      contractValue: '€1.1M',
      relationship: 'Standard'
    },
    {
      id: 6,
      name: 'Startup S',
      contactPerson: 'Anna Davis',
      contactEmail: 'adavis@startups.com',
      contactPhone: '+45 43210987',
      industry: 'Software',
      location: 'Viborg, Denmark',
      activeAssets: 2,
      lastContact: '18.03.2025',
      nextReview: '05.05.2025',
      status: 'active',
      priority: 'low',
      contractValue: '€0.3M',
      relationship: 'Basic'
    },
    {
      id: 7,
      name: 'Group T',
      contactPerson: 'Robert Miller',
      contactEmail: 'rmiller@groupt.com',
      contactPhone: '+45 32109876',
      industry: 'Construction',
      location: 'Randers, Denmark',
      activeAssets: 22,
      lastContact: '25.04.2025',
      nextReview: '30.05.2025',
      status: 'active',
      priority: 'high',
      contractValue: '€4.1M',
      relationship: 'Premium'
    },
    {
      id: 8,
      name: 'Firm U',
      contactPerson: 'Jennifer White',
      contactEmail: 'jwhite@firmu.com',
      contactPhone: '+45 21098765',
      industry: 'Healthcare',
      location: 'Silkeborg, Denmark',
      activeAssets: 9,
      lastContact: '22.04.2025',
      nextReview: '20.05.2025',
      status: 'active',
      priority: 'medium',
      contractValue: '€1.5M',
      relationship: 'Standard'
    }
  ];

  const [clients] = useState(clientsData);
  const [filteredClients, setFilteredClients] = useState(clientsData);

  const handleFilterChange = (filter) => {
    setCurrentFilter(filter);
    let filtered;
    
    switch (filter) {
      case 'all':
        filtered = clients;
        break;
      case 'active':
        filtered = clients.filter(client => client.status === 'active');
        break;
      case 'inactive':
        filtered = clients.filter(client => client.status === 'inactive');
        break;
      case 'review':
        filtered = clients.filter(client => client.status === 'review');
        break;
      case 'premium':
        filtered = clients.filter(client => client.relationship === 'Premium');
        break;
      default:
        filtered = clients;
    }
    
    setFilteredClients(filtered);
  };

  const handleClientSelect = (client) => {
    setSelectedClient(client);
    if (onClientSelect) {
      onClientSelect(client);
    }
  };

  const handleNewClient = () => {
    alert('New Client functionality would be implemented here');
  };

  const getStatusBadge = (status) => {
    const statusColors = {
      active: '#4ECDC4',
      inactive: '#ff6b6b',
      review: '#ffa726'
    };
    return statusColors[status] || '#8a8a8a';
  };

  const getPriorityIcon = (priority) => {
    switch (priority) {
      case 'high':
        return 'fas fa-arrow-up';
      case 'medium':
        return 'fas fa-minus';
      case 'low':
        return 'fas fa-arrow-down';
      default:
        return 'fas fa-minus';
    }
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high':
        return '#ff6b6b';
      case 'medium':
        return '#ffa726';
      case 'low':
        return '#4ECDC4';
      default:
        return '#8a8a8a';
    }
  };

  const filterTabs = [
    { key: 'all', label: 'All Clients' },
    { key: 'active', label: 'Active' },
    { key: 'inactive', label: 'Inactive' },
    { key: 'review', label: 'Under Review' },
    { key: 'premium', label: 'Premium' }
  ];

  return (
    <div className="client-overview">
      <div className="section-header">
        <h1>Clients</h1>
      </div>

      <div className="clients-section">
        <div className="clients-controls">
          <div className="client-tabs">
            {filterTabs.map(tab => (
              <button
                key={tab.key}
                className={`tab-btn ${currentFilter === tab.key ? 'active' : ''}`}
                onClick={() => handleFilterChange(tab.key)}
              >
                {tab.label}
              </button>
            ))}
          </div>
          <button className="btn-primary" onClick={handleNewClient}>
            <i className="fas fa-plus"></i>
            New Client
          </button>
        </div>

        <div className="clients-table-container">
          <table className="clients-table">
            <thead>
              <tr>
                <th>Client Name</th>
                <th>Contact Person</th>
                <th>Industry</th>
                <th>Location</th>
                <th>
                  Active Assets
                  <i className="fas fa-sort-down"></i>
                </th>
                <th>Last Contact</th>
                <th>Next Review</th>
                <th>Priority</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredClients.map(client => (
                <tr
                  key={client.id}
                  className={selectedClient?.id === client.id ? 'highlighted' : ''}
                  onClick={() => handleClientSelect(client)}
                  style={{ cursor: 'pointer' }}
                >
                  <td>
                    <div className="client-name">
                      <span className="name">{client.name}</span>
                      <span className="relationship">{client.relationship}</span>
                    </div>
                  </td>
                  <td>
                    <div className="contact-info">
                      <span className="contact-name">{client.contactPerson}</span>
                      <span className="contact-email">{client.contactEmail}</span>
                    </div>
                  </td>
                  <td>{client.industry}</td>
                  <td>{client.location}</td>
                  <td>
                    <span className="asset-count">{client.activeAssets}</span>
                  </td>
                  <td className="contact-date">{client.lastContact}</td>
                  <td className="review-date">{client.nextReview}</td>
                  <td>
                    <i 
                      className={getPriorityIcon(client.priority)}
                      style={{ color: getPriorityColor(client.priority) }}
                      title={client.priority}
                    ></i>
                  </td>
                  <td>
                    <span 
                      className="status-badge"
                      style={{ backgroundColor: getStatusBadge(client.status) }}
                    >
                      {client.status}
                    </span>
                  </td>
                  <td>
                    <button
                      className="action-btn"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleClientSelect(client);
                      }}
                      title="View client details"
                    >
                      <i className="fas fa-eye"></i>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ClientOverview; 