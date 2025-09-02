import React, { useState, useEffect, useRef } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import Navbar from "../Components/Navbar";
import "leaflet/dist/leaflet.css";

delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png",
  iconUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
  shadowUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
});

const Map = () => {
  const [position, setPosition] = useState([20.5937, 78.9629]);
  const [loading, setLoading] = useState(true);
  const [nearbyMarkers, setNearbyMarkers] = useState([]);
  const markerRefs = useRef([]); // store marker refs

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          const userPos = [pos.coords.latitude, pos.coords.longitude];
          setPosition(userPos);

          const markers = [
            { coords: [userPos[0] + 0.001, userPos[1] + 0.001], text: "Pothole reported here 🕳️" },
            { coords: [userPos[0] - 0.0015, userPos[1] + 0.0012], text: "Streetlight not working 💡" },
            { coords: [userPos[0] + 0.0008, userPos[1] - 0.001], text: "Garbage collection pending 🗑️" },
          ];
          setNearbyMarkers(markers);

          setLoading(false);
        },
        (err) => {
          console.error("Location access denied:", err);
          setLoading(false);
        }
      );
    } else {
      console.error("Geolocation not supported by this browser.");
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    // Open all popups after markers are rendered
    markerRefs.current.forEach((marker) => {
      if (marker) marker.openPopup();
    });
  }, [nearbyMarkers, position]);

  if (loading) {
    return (
      <>
        <div className="flex items-center justify-center h-screen text-lg">
          Detecting your location...
        </div>
        <Navbar />
      </>
    );
  }

  return (
    <div className="relative w-full h-screen pb-16">
      <MapContainer center={position} zoom={15} scrollWheelZoom={true} className="w-full h-full">
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OSM</a>'
        />

        {/* User location */}
        <Marker
          position={position}
          eventHandlers={{
            add: (e) => e.target.openPopup(),
          }}
        >
          <Popup>You are here 📍</Popup>
        </Marker>

        {/* Nearby issue markers */}
        {nearbyMarkers.map((marker, index) => (
          <Marker
            key={index + 1}
            position={marker.coords}
            eventHandlers={{
              add: (e) => {
                e.target.openPopup(); // Open popup as soon as marker is added to map
              },
            }}
          >
            <Popup>{marker.text}</Popup>
          </Marker>
        ))}

      </MapContainer>

      <Navbar />
    </div>
  );
};

export default Map;
