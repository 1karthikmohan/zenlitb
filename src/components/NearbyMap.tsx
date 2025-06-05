import { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Circle, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { dummyUsers } from '../data/dummyUsers';
import { useNavigate } from 'react-router-dom';

const userIcon = L.divIcon({
  className: 'custom-marker',
  html: '<div style="background:#0ea5e9;width:32px;height:32px;border-radius:16px;border:2px solid white;"></div>',
  iconSize: [32, 32],
  iconAnchor: [16, 32],
  popupAnchor: [0, -32]
});

export default function NearbyMap() {
  const [myLocation, setMyLocation] = useState<{ lat: number; lng: number } | null>(null);
  const [radiusKm, setRadiusKm] = useState(2);
  const navigate = useNavigate();

  useEffect(() => {
    if (!navigator.geolocation) return;
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setMyLocation({ lat: pos.coords.latitude, lng: pos.coords.longitude });
      },
      () => {
        setMyLocation({ lat: 37.7749, lng: -122.4194 });
      }
    );
  }, []);

  if (!myLocation) {
    return <div className="flex items-center justify-center p-4">Loading map...</div>;
  }

  const radiusMeters = radiusKm * 1000;

  return (
    <div className="relative h-full w-full">
      <div className="absolute top-4 left-4 z-[1000]">
        <select
          value={radiusKm}
          onChange={(e) => setRadiusKm(parseFloat(e.target.value))}
          className="input w-24"
        >
          <option value={1}>1 km</option>
          <option value={2}>2 km</option>
          <option value={5}>5 km</option>
        </select>
      </div>

      <MapContainer center={[myLocation.lat, myLocation.lng]} zoom={13} style={{ height: '100%', width: '100%' }}>
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        <Circle center={[myLocation.lat, myLocation.lng]} radius={radiusMeters} pathOptions={{ color: '#0ea5e9', fillOpacity: 0.1 }} />
        <Marker position={[myLocation.lat, myLocation.lng]}>
          <Popup>You are here</Popup>
        </Marker>
        {dummyUsers.map((u) => {
          const distance = Math.hypot(
            (u.location.latitude - myLocation.lat) * 111,
            (u.location.longitude - myLocation.lng) * 85
          );
          if (distance > radiusKm) return null;
          return (
            <Marker key={u.id} position={[u.location.latitude, u.location.longitude]} icon={userIcon}>
              <Popup>
                <div className="flex flex-col items-center">
                  <img src={u.avatar} alt={u.displayName} className="w-14 h-14 rounded-full" />
                  <h4 className="mt-2 font-medium">{u.displayName}</h4>
                  <p className="text-gray-600 text-sm mt-1">{u.bio}</p>
                  <button
                    className="btn mt-2 text-sm px-2 py-1 h-auto"
                    onClick={() => navigate(`/chats`)}
                  >
                    Message
                  </button>
                </div>
              </Popup>
            </Marker>
          );
        })}
      </MapContainer>
    </div>
  );
}
