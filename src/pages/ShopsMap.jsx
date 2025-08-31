import { AdvancedMarker, APIProvider, Map } from '@vis.gl/react-google-maps';
import { AppHeader } from "../cmps/AppHeader";

// const API_KEY = 'AIzaSyCTk12UgjiVgYufd8AiyVp_Quz1R-WtThE'

export function ShopsMap() {
    const position = { lat: 53.54992, lng: 10.00678 }

    return (
        <div>
            <AppHeader />
            <APIProvider apiKey={API_KEY}>
                <Map defaultCenter={position}
                    defaultZoom={10}
                    mapId="DEMO_MAP_ID">
                    <AdvancedMarker position={position} />
                </Map>
            </APIProvider>
        </div>
    )
}
