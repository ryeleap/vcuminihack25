import React, { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup, Polyline } from "react-leaflet";
import polyline from "@mapbox/polyline";
import "leaflet/dist/leaflet.css";

export default function App() {
    const monroePark = { lat: 37.5466, lng: -77.4505 };
    const [contributions] = useState([
        {
            location: { lat: 37.539, lng: -77.436 },
            portions: 5,
            expirationDate: "2025-01-31",
            foodType: "Veggie",
            description: "Fresh veggies",
        },
        {
            location: { lat: 37.538, lng: -77.438 },
            portions: 3,
            expirationDate: "2025-02-01",
            foodType: "Meat",
            description: "Chicken",
        },
        {
            location: { lat: 37.541, lng: -77.44 },
            portions: 10,
            expirationDate: "2025-02-02",
            foodType: "Veggie",
            description: "Green Beans",
        },
    ]);

    // We'll store the decoded route as an array of [lat, lng]
    const [routeCoords, setRouteCoords] = useState([]);

    useEffect(() => {
        const origin = `${monroePark.lat},${monroePark.lng}`;
        const destination = `${monroePark.lat},${monroePark.lng}`;
        const waypoints = contributions
            .map((item) => `${item.location.lat},${item.location.lng}`)
            .join("|");

        // Use CORS Anywhere for dev only (requires enabling via corsdemo link)
        const proxy = "https://cors-anywhere.herokuapp.com/";

        const directionsUrl =
            `${proxy}https://maps.googleapis.com/maps/api/directions/json` +
            `?origin=${origin}` +
            `&destination=${destination}` +
            `&waypoints=optimize:true|${waypoints}` +
            `&mode=driving` +
            `&key=AIzaSyDCK3Ur25TLYjXO1SnOAYC6kkYG76BjWTs`;

        fetch(directionsUrl)
            .then((res) => res.json())
            .then((data) => {
                console.log("Directions API response:", data);
                if (
                    data.routes &&
                    data.routes.length > 0 &&
                    data.routes[0].overview_polyline
                ) {
                    const encoded = data.routes[0].overview_polyline.points;
                    const decoded = polyline.decode(encoded); // => [[lat, lng], ...]
                    setRouteCoords(decoded.map(([lat, lng]) => [lat, lng]));
                } else {
                    console.warn("No valid routes returned from Google Directions.");
                }
            })
            .catch((err) => console.error("Directions fetch error:", err));
    }, [contributions]);

    // Simple inline styles
    const containerStyle = {
        display: "flex",
        height: "100vh",
    };

    const leftColumnStyle = {
        width: "30%",
        overflowY: "auto",
        padding: "1rem",
        backgroundColor: "#f8f8f8",
        borderRight: "1px solid #ddd",
    };

    const listItemStyle = {
        backgroundColor: "#fff",
        borderRadius: "0.375rem",
        padding: "1rem",
        marginBottom: "0.75rem",
        boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
    };

    const topRowStyle = {
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
    };

    const itemTitleStyle = {
        fontSize: "1.1rem",
        fontWeight: "bold",
        margin: 0,
        color: "#333",
    };

    const badgeStyle = {
        fontSize: "0.8rem",
        backgroundColor: "#e0f0ff",
        color: "#0275d8",
        padding: "0.3rem 0.6rem",
        borderRadius: "9999px",
        marginLeft: "0.5rem",
    };

    const detailRowStyle = {
        display: "flex",
        gap: "1.5rem",
        marginTop: "0.5rem",
        color: "#444",
    };

    const mapStyle = {
        width: "70%",
    };

    return (
        <div style={containerStyle}>
            {/* Left Column */}
            <div style={leftColumnStyle}>
                <h2 style={{ fontSize: "1.5rem", marginBottom: "1rem", color: "#333" }}>
                    Food Waste Entries
                </h2>

                {contributions.map((item, idx) => (
                    <div key={idx} style={listItemStyle}>
                        <div style={topRowStyle}>
                            <h3 style={itemTitleStyle}>{item.description}</h3>
                            <span style={badgeStyle}>{item.foodType}</span>
                        </div>
                        <div style={detailRowStyle}>
                            <span>Portions: {item.portions}</span>
                            <span style={{ color: "#c00" }}>Expires: {item.expirationDate}</span>
                        </div>
                    </div>
                ))}
            </div>

            {/* Right Column: the map */}
            <div style={mapStyle}>
                <MapContainer
                    center={[monroePark.lat, monroePark.lng]}
                    zoom={12}
                    style={{ width: "100%", height: "100%" }}
                >
                    <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

                    {/* Markers */}
                    <Marker position={[monroePark.lat, monroePark.lng]}>
                        <Popup>Monroe Park (Start/End)</Popup>
                    </Marker>
                    {contributions.map((item, idx) => (
                        <Marker key={idx} position={[item.location.lat, item.location.lng]}>
                            <Popup>{item.description}</Popup>
                        </Marker>
                    ))}

                    {/* Route */}
                    {routeCoords.length > 0 && (
                        <Polyline
                            positions={routeCoords}
                            color="red"
                            weight={3}
                            opacity={0.7}
                        />
                    )}
                </MapContainer>
            </div>
        </div>
    );
}