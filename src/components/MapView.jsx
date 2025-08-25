import React, { useEffect, useState, useRef } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import Globe from "react-globe.gl";
import L from "leaflet";
import * as THREE from "three";
import { fetchDisasterEvents } from "../services/eonet";

// Fix Leaflet icon issue
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png",
  iconUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
  shadowUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
});

// High-quality disaster icons
const disasterIcons = {
  Wildfires: "https://cdn.britannica.com/42/188142-050-4D4D9D19/wildfire-Stanislaus-National-Forest-California-2013.jpg?w=400&h=300&c=crop", // fire
  Volcanoes: "https://naturalhistory.si.edu/sites/default/files/styles/resource_side/public/media/image/arenal-volcano-olger-aragon-081029.jpg.webp?itok=Gzft99RE", // volcano
  "Severe Storms": "https://www.timeforkids.com/wp-content/uploads/2018/08/Storms-Images.jpg", // storm
  Floods: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSPXQvQEN6rVUdAXxS6WSN7T-DiDKuR2exr4w&s", // flood
  Earthquakes: "https://gelogia.com/wp-content/uploads/2024/10/earthquake-1080x599.jpg", // earthquake
};

const MapView = ({ events, viewMode }) => {
  const [is3D, setIs3D] = useState(false);
  const globeRef = useRef();

  // Prepare data for 3D markers
  const globeMarkers = events.map((event) => {
    const coords = event.geometry[0]?.coordinates;
    if (!coords) return null;
    return {
      lat: coords[1],
      lng: coords[0],
      title: event.title,
      category: event.categories[0].title,
      icon: disasterIcons[event.categories[0].title] || disasterIcons.Wildfires,
    };
  }).filter(Boolean);

  return (
    <div style={{ height: "100vh", width: "100vw" }}>
      {/* Toggle Button */}
      <div
        style={{
          position: "absolute",
          top: "15px",
          left: "50%",
          transform: "translateX(-50%)",
          backgroundColor: "white",
          padding: "10px 18px",
          borderRadius: "10px",
          boxShadow: "0 2px 10px rgba(0,0,0,0.3)",
          zIndex: 1000,
          fontWeight: "bold",
          cursor: "pointer",
        }}
        onClick={() => setIs3D(!is3D)}
      >
        {is3D ? "Switch to 2D Map" : "Switch to 3D Globe"}
      </div>

      {/* 2D Map */}
      {(!is3D && viewMode === "2D") ? (
        <MapContainer center={[20, 0]} zoom={2} style={{ height: "100%", width: "100%" }}>
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors'
          />
          {events.map((event) =>
            event.geometry.map((geo, index) => {
              if (!geo.coordinates || geo.coordinates.length < 2) return null;
              const category = event.categories[0].title;
              const iconUrl = disasterIcons[category] || disasterIcons.Wildfires;

              const customIcon = new L.Icon({
                iconUrl,
                iconSize: [35, 35],
                iconAnchor: [17, 34],
                popupAnchor: [0, -30],
              });

              return (
                <Marker
                  key={`${event.id}-${index}`}
                  position={[geo.coordinates[1], geo.coordinates[0]]}
                  icon={customIcon}
                >
                  <Popup>
                    <b>{event.title}</b> <br />
                    <b>Category:</b> {category} <br />
                    <b>Date:</b> {new Date(geo.date).toLocaleString()}
                  </Popup>
                </Marker>
              );
            })
          )}
        </MapContainer>
      ) : (
        // 3D Globe
        <Globe
          ref={globeRef}
          height={window.innerHeight}
          width={window.innerWidth}
          globeImageUrl="//unpkg.com/three-globe/example/img/earth-blue-marble.jpg"
          bumpImageUrl="//unpkg.com/three-globe/example/img/earth-topology.png"
          backgroundColor="#e6f7ff" // Light blue sky look
          showAtmosphere={true}
          atmosphereColor="lightskyblue"
          atmosphereAltitude={0.15}
          pointsData={globeMarkers}
          pointAltitude={0.02}
          pointColor={() => "red"}
          enablePointerInteraction={true}
          htmlElementsData={globeMarkers}
          htmlElement={(d) => {
            const el = document.createElement("div");
            el.style.width = "28px";
            el.style.height = "28px";
            el.style.backgroundImage = `url(${d.icon})`;
            el.style.backgroundSize = "cover";
            el.style.borderRadius = "50%";
            el.style.boxShadow = "0 0 6px rgba(0,0,0,0.6)";
            el.style.cursor = "pointer";
            el.title = `${d.title} (${d.category})`;
            return el;
          }}
        />
      )}
    </div>
  );
};

export default MapView;
