import React, { useRef } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import Globe from "react-globe.gl";
import L from "leaflet";
// Use the same anime-style logo URLs as in DisasterFilter
const wildfireIcon = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQmVw0p9799tF8TNajuOrdJgIS4WD0vAsiAVw&s";
const volcanoIcon = "https://images.newscientist.com/wp-content/uploads/2020/12/21145328/volcanoes-f0r7pt_web.jpg";
const stormIcon = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSlRiHy0JNX2M1u9FPPUfBeC8qO_a_Bx-WpGA&s";
const floodIcon = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQPV3T_uEDL94my6Zpz-JStnuVc7t_ml6kUkw&s";
const earthquakeIcon = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSZsdT4vS6SSQyLBsoNm1wVn7QqXIX-4s3ieg&s";

const disasterIcons = {
<<<<<<< HEAD
  Wildfires: "https://cdn.britannica.com/42/188142-050-4D4D9D19/wildfire-Stanislaus-National-Forest-California-2013.jpg?w=400&h=300&c=crop", // fire
  Volcanoes: "https://naturalhistory.si.edu/sites/default/files/styles/resource_side/public/media/image/arenal-volcano-olger-aragon-081029.jpg.webp?itok=Gzft99RE", // volcano
  "Severe Storms": "https://www.timeforkids.com/wp-content/uploads/2018/08/Storms-Images.jpg", // storm
  Floods: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSPXQvQEN6rVUdAXxS6WSN7T-DiDKuR2exr4w&s", // flood
  Earthquakes: "https://gelogia.com/wp-content/uploads/2024/10/earthquake-1080x599.jpg", // earthquake
=======
  Wildfires: wildfireIcon,
  Volcanoes: volcanoIcon,
  "Severe Storms": stormIcon,
  Floods: floodIcon,
  Earthquakes: earthquakeIcon,
>>>>>>> 2d6a0e2 (Second Commit)
};

const MapView = ({ events, viewMode }) => {
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
      icon: disasterIcons[event.categories[0].title] || wildfireIcon,
    };
  }).filter(Boolean);

  return (
    <div style={{ height: "100vh", width: "100vw" }}>
      {/* 2D Map */}
      {viewMode === "2D" ? (
        <MapContainer center={[20, 0]} zoom={2} style={{ height: "100%", width: "100%" }}>
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors'
          />
          {events.map((event) =>
            event.geometry.map((geo, index) => {
              if (!geo.coordinates || geo.coordinates.length < 2) return null;
              const category = event.categories[0].title;
              const iconUrl = disasterIcons[category] || wildfireIcon;

              const customIcon = new L.Icon({
                iconUrl: iconUrl,
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
            const el = document.createElement("img");
            el.src = d.icon;
            el.alt = d.title;
            el.style.width = "28px";
            el.style.height = "28px";
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
