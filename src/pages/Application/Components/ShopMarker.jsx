import React from 'react';
import { Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import { Store } from '@mui/icons-material';

// Function to create a custom Leaflet icon using a home icon
const createCustomIcon = () => {
    // Store icon SVG (Home icon) filled with white color
    const storeIconSVG = `
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="14" height="14" fill="white" x= "4.5" y = "4" >
            <path fill="white" d="M12 3l9 8h-3v10H6V11H3l9-8zm0 2.9L5 10h3v10h8V10h3l-7-6.1z"/>
        </svg>
    `;

    const svg = `
        <svg xmlns="http://www.w3.org/2000/svg" width="30" height="40" viewBox="0 0 24 30">
            <defs>
                <filter id="shadow" x="-20%" y="-20%" width="140%" height="140%">
                    <feGaussianBlur in="SourceAlpha" stdDeviation="3"/>
                    <feOffset dx="0" dy="3" result="offsetblur"/>
                    <feFlood flood-color="rgba(0, 0, 0, 0.3)"/>
                    <feComposite in2="offsetblur" operator="in"/>
                    <feMerge>
                        <feMergeNode/>
                        <feMergeNode in="SourceGraphic"/>
                    </feMerge>
                </filter>
            </defs>
            <circle cx="12" cy="12" r="10" fill="white"/> <!-- Circular background -->
            <path d="M12 20c-4.4 0-8-3.6-8-8s3.6-8 8-8 8 3.6 8 8-3.6 8-8 8z" fill="maroon" /> <!-- Circle fill -->
            <path d="M12 30L8 25h8l-4 5z" fill="maroon"/> 
            <!-- Tip at the bottom -->
            ${storeIconSVG} <!-- Include the home icon here -->
        </svg>
    `;

    const iconUrl = `data:image/svg+xml;base64,${btoa(svg)}`;

    return new L.Icon({
        iconUrl,
        iconSize: [30, 40], // Adjust size as needed
        iconAnchor: [15, 40], // Center the icon's anchor point at the tip
        popupAnchor: [0, -30], // Adjust the popup's anchor point
    });
};

// Custom marker component
const ShopMarker = ({ position, shopName }) => {
    const customIcon = createCustomIcon(); // Create the custom icon

    return (
        <Marker position={position} icon={customIcon}>
            <Popup>
                <div style={{ textAlign: 'center' }}>
                    <Store/>
                    <div>{shopName}</div>
                </div>
            </Popup>
        </Marker>
    );
};

export default ShopMarker;
