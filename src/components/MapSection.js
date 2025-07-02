import React, { useEffect, useRef } from 'react';
import L from 'leaflet';

// Fix for default markers in react-leaflet
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
  iconUrl: require('leaflet/dist/images/marker-icon.png'),
  shadowUrl: require('leaflet/dist/images/marker-shadow.png'),
});

const MapSection = ({ assets, selectedAsset, onAssetSelect }) => {
  const mapRef = useRef(null);
  const mapInstanceRef = useRef(null);
  const markersRef = useRef([]);

  useEffect(() => {
    // Initialize map
    if (!mapInstanceRef.current && mapRef.current) {
      mapInstanceRef.current = L.map(mapRef.current, {
        zoomControl: true,
        scrollWheelZoom: true
      }).setView([56.2639, 9.5018], 7);

      // Add dark theme tiles
      L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
        subdomains: 'abcd',
        maxZoom: 19
      }).addTo(mapInstanceRef.current);
    }

    // Update markers when assets change
    if (mapInstanceRef.current) {
      // Clear existing markers
      markersRef.current.forEach(marker => {
        mapInstanceRef.current.removeLayer(marker);
      });
      markersRef.current = [];

      // Add new markers
      assets.forEach(asset => {
        const marker = L.circleMarker([asset.lat, asset.lng], {
          radius: 8,
          fillColor: '#4ECDC4',
          color: '#ffffff',
          weight: 2,
          opacity: 1,
          fillOpacity: 0.8
        });

        const popupContent = `
          <div class="marker-popup">
            <h4>${asset.id}</h4>
            <p><strong>Model:</strong> ${asset.model}</p>
            <p><strong>Client:</strong> ${asset.client}</p>
            <p><strong>Location:</strong> ${asset.city}</p>
            <p><strong>Next Service:</strong> ${asset.nextService}</p>
            <p><strong>Services:</strong> ${asset.serviceCount}</p>
          </div>
        `;

        marker.bindPopup(popupContent);
        marker.on('click', () => onAssetSelect(asset));
        marker.addTo(mapInstanceRef.current);
        markersRef.current.push(marker);
      });
    }
  }, [assets, onAssetSelect]);

  // Handle selected asset highlighting
  useEffect(() => {
    if (selectedAsset && mapInstanceRef.current) {
      // Center map on selected asset
      mapInstanceRef.current.setView([selectedAsset.lat, selectedAsset.lng], 10);
      
      // Find and open popup for selected marker
      markersRef.current.forEach(marker => {
        const latLng = marker.getLatLng();
        if (latLng.lat === selectedAsset.lat && latLng.lng === selectedAsset.lng) {
          marker.openPopup();
        }
      });
    }
  }, [selectedAsset]);

  return (
    <div className="map-section">
      <div 
        ref={mapRef} 
        className="map-container"
        style={{ height: '100vh', width: '100%' }}
      />
    </div>
  );
};

export default MapSection; 