import React, { useState, useEffect, useRef } from 'react';
import { Box, TextField, IconButton, InputAdornment } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import ShopMarker from '../Components/ShopMarker';
import axios from 'axios';
import { getToken } from '../../../Cookies';
// Fix for default marker icon not displaying
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
    iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
    iconUrl: require('leaflet/dist/images/marker-icon.png'),
    shadowUrl: require('leaflet/dist/images/marker-shadow.png'),
});

// Custom hook to update the map view
const ChangeView = ({ center }) => {
    const map = useMap();
    useEffect(() => {
        map.setView(center, map.getZoom()); // Set the map view to the new center
    }, [center, map]);

    return null;
};

const Map = () => {
    const [mapCenter, setMapCenter] = useState([51.505, -0.09]); // Default center (London)
    const [searchValue, setSearchValue] = useState('');
    const [markerPosition, setMarkerPosition] = useState(null); // State for the marker position
    const mapRef = useRef(); // Ref for the map container
    const [shops, setShops] = useState([]);

    const fethShops = async (shopsURL) => {
        try {
            const responseShops = await axios.get(shopsURL, { headers: { "Authorization": `Bearer ${getToken()}` } });
            console.log(responseShops.data)
            setShops(responseShops.data)
        } catch (e) {
            console.error(e)
        }
    }
    useEffect(() => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position) => {

                    const { latitude, longitude } = position.coords;
                    setMapCenter([latitude, longitude]);
                    setMarkerPosition([latitude, longitude]);
                    const shopsURL = "http://localhost:8080/User/get-shop?lng=22.714508476412274&lat=75.8504027581781";
                    fethShops(shopsURL)// Optionally place a marker at user's location
                },
                (error) => {
                    console.error("Geolocation error:", error);
                }
            );
        }
    }, []);

    const handleSearch = async (event) => {
        event.preventDefault();
        const apiKey = '8a5e1e11d4c144daa9c8379bb8f9aba1'; // Replace with your OpenCage API key

        // Use searchValue for location
        const url = `https://api.opencagedata.com/geocode/v1/json?q=${encodeURIComponent(searchValue)}&key=${apiKey}`;
        try {
            const response = await fetch(url);

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const data = await response.json();
            console.log(data); // Log the entire response data for debugging

            if (data.results && data.results.length > 0) {
                const { lat, lng } = data.results[0].geometry; // Get latitude and longitude
                setMapCenter([lat, lng]); // Update map center to the searched location
                setMarkerPosition([lat, lng]); // Set marker position
            } else {
                alert('Location not found.'); // Handle location not found
            }
        } catch (error) {
            console.error('Error fetching location:', error);
            alert(`Error fetching location: ${error.message}`); // Show detailed error message
        }

        setSearchValue(''); // Clear the search input after search
    };

    return (
        <Box
            sx={{
                position: 'relative',
                width: '100%',
                height: '42vw',
                boxSizing: 'border-box',
            }}
        >
            {/* Search Bar */}
            <Box
                component="form"
                onSubmit={handleSearch}
                sx={{
                    position: 'absolute',
                    top: 16,
                    left: '50%',
                    transform: 'translateX(-50%)',
                    zIndex: 1000,
                    width: '80%',
                    maxWidth: 600,
                    backgroundColor: 'white',
                    borderRadius: 1,
                    boxShadow: '0px 2px 10px rgba(0,0,0,0.2)',
                    padding: 1,
                }}
            >
                <TextField
                    fullWidth
                    id="search"
                    placeholder="Search location..."
                    variant="outlined"
                    value={searchValue}
                    onChange={(e) => setSearchValue(e.target.value)} // Update search value
                    sx={{
                        backgroundColor: 'white',
                        '& .MuiOutlinedInput-root': {
                            '& fieldset': {
                                borderColor: 'maroon', // Secondary color for border
                            },
                            '&:hover fieldset': {
                                borderColor: 'maroon', // Keeps border maroon on hover
                            },
                            '&.Mui-focused fieldset': {
                                borderColor: 'maroon', // Focus state with maroon border
                            },
                            color: 'maroon',
                        },
                        '& .MuiInputBase-input::placeholder': {
                            color: 'maroon',
                            opacity: 1,
                        },
                    }}
                    InputProps={{
                        endAdornment: (
                            <InputAdornment position="end">
                                <IconButton type="submit">
                                    <SearchIcon sx={{ color: 'maroon' }} />
                                </IconButton>
                            </InputAdornment>
                        ),
                    }}
                />
            </Box>

            {/* Map Container */}
            <MapContainer
                center={mapCenter}
                zoom={13}
                style={{ width: '100%', height: '100%' }}
                ref={mapRef} // Attach ref to the MapContainer
                zoomControl={false}
            >
                <ChangeView center={mapCenter} /> {/* Call to update map center */}
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                {/* Marker for the searched location */}
                {markerPosition && (
                    <Marker position={markerPosition}>
                        <Popup>{searchValue}</Popup> {/* Display search value on marker popup */}
                    </Marker>

                )
                }
                {shops.map((shop, index) => (
                    <ShopMarker
                        key={index}
                        position={[shop.cord.x, shop.cord.y]}
                        shopName={shop.name}
                    />
                ))}
            </MapContainer>
        </Box>
    );
};

export default Map;
