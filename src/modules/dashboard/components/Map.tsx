import { MapContainer, Marker, TileLayer } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

const Map = () => {
  return (
    <div className="w-full h-[60vh]">
      <MapContainer
        center={[19.02680514347375, 73.03826439027594]}
        zoom={17}
        className="h-full w-full"
        style={{ height: '100%', width: '100%' }}
      >
        <TileLayer
          attribution="Flex-EV"
          url="https://tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker position={[19.02680514347375, 73.03826439027594]} />
      </MapContainer>
    </div>
  );
};

export default Map;
