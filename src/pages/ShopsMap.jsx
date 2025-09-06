import { AdvancedMarker, APIProvider, Map } from '@vis.gl/react-google-maps';
import { AppHeader } from "../cmps/AppHeader";

const API_KEY = import.meta.env.VITE_GOOGLE_MAPS_API_KEY

export function ShopsMap() {
    const position = { lat: 53.54992, lng: 10.00678 }

    return (
        <div>
            <AppHeader />
            <h1>Shops Map</h1>
            <APIProvider apiKey={API_KEY}>
                <Map
                    defaultCenter={position}
                    defaultZoom={10}
                    mapId="DEMO_MAP_ID"
                    style={{ width: '100%', height: '500px' }} // <-- Add this line
                >
                    <AdvancedMarker position={position} />
                </Map>
            </APIProvider>
        </div>
    )
}
