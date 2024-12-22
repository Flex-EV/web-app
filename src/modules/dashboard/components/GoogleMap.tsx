import { AdvancedMarker, APIProvider, Map } from '@vis.gl/react-google-maps';
import { getEnvVars } from '@/util/env.ts';

const GoogleMap = () => {
  const { GOOGLE_MAPS_API_KEY, GOOGLE_MAP_ID } = getEnvVars();

  const markerLocation = {
    lat: 28.479423,
    lng: 76.99235,
  };

  console.log(GOOGLE_MAPS_API_KEY);
  console.log(GOOGLE_MAP_ID);

  return (
    <APIProvider apiKey={GOOGLE_MAPS_API_KEY}>
      <div className="w-full h-[60vh]">
        <div className="w-full h-full shadow-lg rounded-lg overflow-hidden border border-gray-200">
          <Map
            defaultZoom={13}
            defaultCenter={markerLocation}
            gestureHandling={'greedy'}
            disableDefaultUI
            className="w-full h-full"
            mapId={GOOGLE_MAP_ID}
          >
            <AdvancedMarker position={markerLocation} />
          </Map>
        </div>
      </div>
    </APIProvider>
  );
};

export default GoogleMap;
