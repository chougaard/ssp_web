import React, { useState } from 'react';

const NewAssetDialog = ({ isOpen, onClose, onSubmit }) => {
  const [formData, setFormData] = useState({
    id: '',
    model: '',
    client: '',
    nextService: '',
    lastService: '',
    serviceCount: 0,
    lat: '',
    lng: '',
    city: '',
    status: 'operational'
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.id.trim()) {
      newErrors.id = 'Asset ID is required';
    }
    
    if (!formData.model.trim()) {
      newErrors.model = 'Model is required';
    }
    
    if (!formData.client.trim()) {
      newErrors.client = 'Client is required';
    }
    
    if (!formData.city.trim()) {
      newErrors.city = 'City is required';
    }
    
    if (!formData.lat || isNaN(formData.lat)) {
      newErrors.lat = 'Valid latitude is required';
    }
    
    if (!formData.lng || isNaN(formData.lng)) {
      newErrors.lng = 'Valid longitude is required';
    }
    
    if (!formData.nextService) {
      newErrors.nextService = 'Next service date is required';
    }
    
    if (!formData.lastService) {
      newErrors.lastService = 'Last service date is required';
    }
    
    if (formData.serviceCount < 0) {
      newErrors.serviceCount = 'Service count cannot be negative';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const formatDateToEuropean = (isoDate) => {
    if (!isoDate) return '';
    const date = new Date(isoDate);
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    return `${day}.${month}.${year}`;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (validateForm()) {
      // Convert string numbers to actual numbers and dates to European format
      const processedData = {
        ...formData,
        lat: parseFloat(formData.lat),
        lng: parseFloat(formData.lng),
        serviceCount: parseInt(formData.serviceCount, 10),
        nextService: formatDateToEuropean(formData.nextService),
        lastService: formatDateToEuropean(formData.lastService)
      };
      
      onSubmit(processedData);
      handleClose();
    }
  };

  const handleClose = () => {
    setFormData({
      id: '',
      model: '',
      client: '',
      nextService: '',
      lastService: '',
      serviceCount: 0,
      lat: '',
      lng: '',
      city: '',
      status: 'operational'
    });
    setErrors({});
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content new-asset-dialog">
        <div className="modal-header">
          <h2>Create New Asset</h2>
          <button 
            className="close-button"
            onClick={handleClose}
            type="button"
          >
            <i className="fas fa-times"></i>
          </button>
        </div>
        
        <form onSubmit={handleSubmit} className="asset-form">
          <div className="form-section">
            <h3>Basic Information</h3>
            
            <div className="form-group">
              <label htmlFor="id">Asset ID *</label>
              <input
                type="text"
                id="id"
                name="id"
                value={formData.id}
                onChange={handleChange}
                placeholder="e.g., ABC 9876 5432"
                className={errors.id ? 'error' : ''}
              />
              {errors.id && <span className="error-message">{errors.id}</span>}
            </div>

            <div className="form-group">
              <label htmlFor="model">Model *</label>
              <input
                type="text"
                id="model"
                name="model"
                value={formData.model}
                onChange={handleChange}
                placeholder="e.g., XYZ-500"
                className={errors.model ? 'error' : ''}
              />
              {errors.model && <span className="error-message">{errors.model}</span>}
            </div>

            <div className="form-group">
              <label htmlFor="client">Client *</label>
              <input
                type="text"
                id="client"
                name="client"
                value={formData.client}
                onChange={handleChange}
                placeholder="e.g., Company X"
                className={errors.client ? 'error' : ''}
              />
              {errors.client && <span className="error-message">{errors.client}</span>}
            </div>

            <div className="form-group">
              <label htmlFor="status">Status</label>
              <select
                id="status"
                name="status"
                value={formData.status}
                onChange={handleChange}
              >
                <option value="operational">Operational</option>
                <option value="not-operational">Not Operational</option>
                <option value="missing-metadata">Missing Metadata</option>
                <option value="high-priority">High Priority</option>
              </select>
            </div>
          </div>

          <div className="form-section">
            <h3>Service Information</h3>
            
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="lastService">Last Service Date *</label>
                <input
                  type="date"
                  id="lastService"
                  name="lastService"
                  value={formData.lastService}
                  onChange={handleChange}
                  className={errors.lastService ? 'error' : ''}
                />
                {errors.lastService && <span className="error-message">{errors.lastService}</span>}
              </div>

              <div className="form-group">
                <label htmlFor="nextService">Next Service Date *</label>
                <input
                  type="date"
                  id="nextService"
                  name="nextService"
                  value={formData.nextService}
                  onChange={handleChange}
                  className={errors.nextService ? 'error' : ''}
                />
                {errors.nextService && <span className="error-message">{errors.nextService}</span>}
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="serviceCount">Service Count</label>
              <input
                type="number"
                id="serviceCount"
                name="serviceCount"
                value={formData.serviceCount}
                onChange={handleChange}
                min="0"
                className={errors.serviceCount ? 'error' : ''}
              />
              {errors.serviceCount && <span className="error-message">{errors.serviceCount}</span>}
            </div>
          </div>

          <div className="form-section">
            <h3>Location Information</h3>
            
            <div className="form-group">
              <label htmlFor="city">City *</label>
              <input
                type="text"
                id="city"
                name="city"
                value={formData.city}
                onChange={handleChange}
                placeholder="e.g., Aarhus"
                className={errors.city ? 'error' : ''}
              />
              {errors.city && <span className="error-message">{errors.city}</span>}
            </div>

            <div className="form-row">
              <div className="form-group">
                <label htmlFor="lat">Latitude *</label>
                <input
                  type="number"
                  id="lat"
                  name="lat"
                  value={formData.lat}
                  onChange={handleChange}
                  step="any"
                  placeholder="e.g., 56.1629"
                  className={errors.lat ? 'error' : ''}
                />
                {errors.lat && <span className="error-message">{errors.lat}</span>}
              </div>

              <div className="form-group">
                <label htmlFor="lng">Longitude *</label>
                <input
                  type="number"
                  id="lng"
                  name="lng"
                  value={formData.lng}
                  onChange={handleChange}
                  step="any"
                  placeholder="e.g., 10.2039"
                  className={errors.lng ? 'error' : ''}
                />
                {errors.lng && <span className="error-message">{errors.lng}</span>}
              </div>
            </div>
          </div>

          <div className="form-actions">
            <button 
              type="button" 
              className="btn-secondary"
              onClick={handleClose}
            >
              Cancel
            </button>
            <button 
              type="submit" 
              className="btn-primary"
            >
              <i className="fas fa-plus"></i>
              Create Asset
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default NewAssetDialog;