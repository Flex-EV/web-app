import { MapContainer, TileLayer, Marker } from "react-leaflet";

const Map = () => {
  return (
    <div style={{ height: "100%", width: "100%" }}>
      <MapContainer
        center={[19.02680514347375, 73.03826439027594]}
        zoom={17}
        style={{ height: "100%", width: "100%" }}
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
