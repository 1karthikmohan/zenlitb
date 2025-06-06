import NearbyMap from '../components/NearbyMap';

export default function Nearby() {
  return (
    <div className="min-h-screen bg-background">
      <div className="h-14 bg-white shadow-sm fixed top-0 left-0 right-0 flex items-center px-4">
        <h1 className="text-lg font-bold text-center flex-1">Nearby</h1>
      </div>
      <div className="pt-14 h-[calc(100vh-56px)]">
        <NearbyMap />
      </div>
    </div>
  );
}
