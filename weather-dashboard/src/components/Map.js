import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import axios from 'axios';
import './Map.css';

// Fix for default icon issue in leaflet with React
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
    iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
    iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

const Map = ({ city }) => {
    const [position, setPosition] = useState([20, 77]); // Default position (India)

    useEffect(() => {
        const fetchCoordinates = async () => {
            try {
                const response = await axios.get(`https://dataservice.accuweather.com/locations/v1/cities/search`, {
                    params: {
                        apikey: '5BdKp6TUdkvhZrCAu06NDANmP384uRQS',
                        q: city
                    }
                });
                const { GeoPosition } = response.data[0];
                setPosition([GeoPosition.Latitude, GeoPosition.Longitude]);
            } catch (error) {
                console.error('Error fetching coordinates:', error);
            }
        };

        if (city) {
            fetchCoordinates();
        }
    }, [city]);

    return (
        <MapContainer center={position} zoom={10} style={{ height: '100%', width: '100%' }}>
            <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            />
            <Marker position={position}>
                <Popup>
                    {city}
                </Popup>
            </Marker>
        </MapContainer>
    );
};

export default Map;
