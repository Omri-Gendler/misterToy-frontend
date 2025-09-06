import { AdvancedMarker, APIProvider, Map } from '@vis.gl/react-google-maps';
import { AppHeader } from "../cmps/AppHeader";

const API_KEY = import.meta.env.VITE_GOOGLE_MAPS_API_KEY

// 10 shop positions: 3 in Israel, 3 in Germany, 4 in Australia
const shops = [
    // Israel
    { name: "Tel Aviv Shop", position: { lat: 32.0853, lng: 34.7818 } },
    { name: "Jerusalem Shop", position: { lat: 31.7683, lng: 35.2137 } },
    { name: "Haifa Shop", position: { lat: 32.7940, lng: 34.9896 } },
    // Germany
    { name: "Berlin Shop", position: { lat: 52.5200, lng: 13.4050 } },
    { name: "Munich Shop", position: { lat: 48.1351, lng: 11.5820 } },
    { name: "Hamburg Shop", position: { lat: 53.5511, lng: 9.9937 } },
    // Australia
    { name: "Sydney Shop", position: { lat: -33.8688, lng: 151.2093 } },
    { name: "Melbourne Shop", position: { lat: -37.8136, lng: 144.9631 } },
    { name: "Brisbane Shop", position: { lat: -27.4698, lng: 153.0251 } },
    { name: "Perth Shop", position: { lat: -31.9505, lng: 115.8605 } },
];

export function ShopsMap() {
    // Center on Europe for visibility, or pick one region
    const position = { lat: 32.0853, lng: 34.7818 } // Tel Aviv

    return (
        <div>
            <AppHeader />
            <h1>Shops Map</h1>
            <APIProvider apiKey={API_KEY}>
                <Map
                    defaultCenter={position}
                    defaultZoom={2.5}
                    mapId="DEMO_MAP_ID"
                    style={{ width: '100%', height: '500px' }}
                >
                    {shops.map((shop, idx) => (
                        <AdvancedMarker
                            key={idx}
                            position={shop.position}
                            title={shop.name}
                        />
                    ))}
                </Map>
            </APIProvider>
        </div>
    )
}
