import React, { useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

function NearbyMap() {
  const position = [51.505, -0.09];

  useEffect(() => {
    // In a real app we'd fetch nearby users
  }, []);

  return (
    <div style={{ height: '400px' }}>
      <MapContainer center={position} zoom={13} style={{ height: '100%' }}>
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution="&copy; OpenStreetMap contributors"
        />
        <Marker position={position}>
          <Popup>You are here</Popup>
        </Marker>
      </MapContainer>
    </div>
  );
}

export default NearbyMap;
