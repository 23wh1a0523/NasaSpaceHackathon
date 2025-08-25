import React, { useRef, useState, useEffect } from "react";
import axios from "axios";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import Globe from "react-globe.gl";
import L from "leaflet";

// Anime-style / stock image icons
const wildfireIcon =
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQmVw0p9799tF8TNajuOrdJgIS4WD0vAsiAVw&s";
const volcanoIcon =
  "https://images.newscientist.com/wp-content/uploads/2020/12/21145328/volcanoes-f0r7pt_web.jpg";
const stormIcon =
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSlRiHy0JNX2M1u9FPPUfBeC8qO_a_Bx-WpGA&s";
const floodIcon =
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQPV3T_uEDL94my6Zpz-JStnuVc7t_ml6kUkw&s";
const earthquakeIcon =
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSZsdT4vS6SSQyLBsoNm1wVn7QqXIX-4s3ieg&s";

const disasterIcons = {
  Wildfires: wildfireIcon,
  Volcanoes: volcanoIcon,
  "Severe Storms": stormIcon,
  Floods: floodIcon,
  Earthquakes: earthquakeIcon,
};

const MapView = ({ events, viewMode }) => {
  const globeRef = useRef();
  const [customDisasters, setCustomDisasters] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({ title: '', category: 'Wildfires', lat: '', lng: '' });
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [hospitalData, setHospitalData] = useState([]);
  const [hospitalLoading, setHospitalLoading] = useState(false);
  const [hospitalError, setHospitalError] = useState("");

  // Prepare data for 3D markers
  const allEvents = [
    ...events,
    ...customDisasters.map((d, idx) => ({
      id: `custom-${idx}`,
      title: d.title,
      categories: [{ title: d.category }],
      geometry: [{ coordinates: [parseFloat(d.lng), parseFloat(d.lat)], date: new Date().toISOString() }],
      isCustom: true,
    }))
  ];

  const globeMarkers = allEvents
    .map((event) => {
      const coords = event.geometry[0]?.coordinates;
      if (!coords) return null;
      return {
        lat: coords[1],
        lng: coords[0],
        title: event.title,
        category: event.categories[0].title,
        icon: disasterIcons[event.categories[0].title] || wildfireIcon,
        eventObj: event,
      };
    })
    .filter(Boolean);

  // Helpline numbers (static mapping)
  // More accurate helpline mapping by country (add more as needed)
  const helplines = {
    India: { police: "100", ambulance: "102", disaster: "108" },
    USA: { police: "911", ambulance: "911", disaster: "911" },
    UK: { police: "999", ambulance: "999", disaster: "999" },
    Canada: { police: "911", ambulance: "911", disaster: "911" },
    Australia: { police: "000", ambulance: "000", disaster: "000" },
    Pakistan: { police: "15", ambulance: "115", disaster: "1122" },
    Bangladesh: { police: "999", ambulance: "199", disaster: "109" },
    Nepal: { police: "100", ambulance: "102", disaster: "1149" },
    China: { police: "110", ambulance: "120", disaster: "119" },
    Japan: { police: "110", ambulance: "119", disaster: "119" },
    Russia: { police: "102", ambulance: "103", disaster: "112" },
    Brazil: { police: "190", ambulance: "192", disaster: "193" },
    SouthAfrica: { police: "10111", ambulance: "10177", disaster: "107" },
    France: { police: "17", ambulance: "15", disaster: "18" },
    Germany: { police: "110", ambulance: "112", disaster: "112" },
    // Add more countries as needed
  };

  // Fetch hospitals when selectedEvent changes
  useEffect(() => {
    if (!selectedEvent) return;
    const geo = selectedEvent.geometry[0];
    const lat = geo.coordinates[1];
    const lng = geo.coordinates[0];
    setHospitalLoading(true);
    setHospitalError("");
    setHospitalData([]);
    // Overpass API bounding box (0.2 deg around point)
    const delta = 0.2;
    const bbox = `${lat - delta},${lng - delta},${lat + delta},${lng + delta}`;
    const query = `[out:json];node[amenity=hospital](${bbox});out;`;
    axios.get(`https://overpass-api.de/api/interpreter?data=${encodeURIComponent(query)}`)
      .then(res => {
        setHospitalData(res.data.elements || []);
        setHospitalLoading(false);
      })
      .catch(err => {
        setHospitalError("Could not fetch hospitals");
        setHospitalLoading(false);
      });
  }, [selectedEvent]);

  // Get country from coordinates using a simple bounding box (for demo; use reverse geocoding for production)
  function getCountryByCoords(lat, lng) {
    // India
    if (lat >= 8 && lat <= 37 && lng >= 68 && lng <= 97) return "India";
    // USA
    if (lat >= 24 && lat <= 49 && lng >= -125 && lng <= -66) return "USA";
    // UK
    if (lat >= 49 && lat <= 59 && lng >= -8 && lng <= 2) return "UK";
    // Canada
    if (lat >= 42 && lat <= 83 && lng >= -141 && lng <= -52) return "Canada";
    // Australia
    if (lat >= -44 && lat <= -10 && lng >= 113 && lng <= 154) return "Australia";
    // Pakistan
    if (lat >= 23 && lat <= 37 && lng >= 60 && lng <= 77) return "Pakistan";
    // Bangladesh
    if (lat >= 20 && lat <= 27 && lng >= 88 && lng <= 92) return "Bangladesh";
    // Nepal
    if (lat >= 26 && lat <= 31 && lng >= 80 && lng <= 89) return "Nepal";
    // China
    if (lat >= 18 && lat <= 54 && lng >= 73 && lng <= 135) return "China";
    // Japan
    if (lat >= 24 && lat <= 46 && lng >= 122 && lng <= 146) return "Japan";
    // Russia
    if (lat >= 41 && lat <= 82 && lng >= 19 && lng <= 180) return "Russia";
    // Brazil
    if (lat >= -33 && lat <= 5 && lng >= -74 && lng <= -34) return "Brazil";
    // South Africa
    if (lat >= -35 && lat <= -22 && lng >= 16 && lng <= 33) return "SouthAfrica";
    // France
    if (lat >= 41 && lat <= 51 && lng >= -5 && lng <= 9) return "France";
    // Germany
    if (lat >= 47 && lat <= 55 && lng >= 5 && lng <= 15) return "Germany";
    // Default
    return "USA";
  }

  // Popup-style statistics panel (centered)
  const StatisticsPanel = ({ event, onClose, onDelete }) => {
    if (!event) return null;
    const geo = event.geometry[0];
    const category = event.categories[0].title;
    const lat = geo.coordinates[1];
    const lng = geo.coordinates[0];
    const country = getCountryByCoords(lat, lng);
    const helpline = helplines[country] || helplines["USA"];
    return (
      <div style={{
        position: "fixed",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        background: "#fff",
        borderRadius: 14,
        boxShadow: "0 8px 32px rgba(0,0,0,0.22)",
        padding: "28px 36px",
        zIndex: 3000,
        minWidth: 320,
        maxWidth: "90vw",
        maxHeight: "80vh",
        overflowY: "auto",
        color: "#111"
      }}>
  <button onClick={onClose} style={{ position: "absolute", top: 12, right: 18, fontSize: 22, border: "none", background: "none", color: '#d32f2f', cursor: "pointer", fontWeight: 700 }}>&times;</button>
        <h3 style={{ marginTop: 0, color: "#1976d2" }}>{event.title}</h3>
        <div style={{ color: '#111' }}><b>Category:</b> {category}</div>
        <div style={{ color: '#111' }}><b>Date:</b> {new Date(geo.date).toLocaleString()}</div>
        <div style={{ color: '#111' }}><b>Coordinates:</b> [{lat}, {lng}]</div>
        {event.isCustom && (
          <button onClick={() => { onDelete(event); onClose(); }} style={{ marginTop: 18, background: '#d32f2f', color: '#fff', border: 'none', borderRadius: 8, padding: '8px 18px', fontWeight: 500, cursor: 'pointer' }}>Delete</button>
        )}
        <div style={{ marginTop: 18 }}>
          <h4 style={{ marginBottom: 8, color: '#1976d2' }}>Nearby Hospitals</h4>
          {hospitalLoading ? <div style={{ color: '#111' }}>Loading hospitals...</div> : hospitalError ? <div style={{ color: '#d32f2f' }}>{hospitalError}</div> : (
            <ul style={{ paddingLeft: 18 }}>
              {hospitalData.length ? hospitalData.slice(0, 5).map(h => (
                <li key={h.id} style={{ marginBottom: 6, color: '#111' }}>
                  <b>{h.tags?.name || "Unnamed Hospital"}</b>
                  {h.tags?.address && <span> - {h.tags.address}</span>}
                </li>
              )) : <li style={{ color: '#111' }}>No hospitals found nearby.</li>}
            </ul>
          )}
        </div>
        <div style={{ marginTop: 18 }}>
          <h4 style={{ marginBottom: 8, color: '#1976d2' }}>Emergency Helplines ({country})</h4>
          <div style={{ color: '#111' }}><b>Police:</b> {helpline.police}</div>
          <div style={{ color: '#111' }}><b>Ambulance:</b> {helpline.ambulance}</div>
          <div style={{ color: '#111' }}><b>Disaster:</b> {helpline.disaster}</div>
        </div>
      </div>
    );
  };

  // Disaster reporting form
  const handleFormChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (!formData.title || !formData.lat || !formData.lng) return;
    setCustomDisasters([...customDisasters, { ...formData }]);
    setShowForm(false);
    setFormData({ title: '', category: 'Wildfires', lat: '', lng: '' });
  };
  const handleDelete = (event) => {
    setCustomDisasters(customDisasters.filter(d => !(d.title === event.title && parseFloat(d.lat) === event.geometry[0].coordinates[1] && parseFloat(d.lng) === event.geometry[0].coordinates[0])));
  };

  return (
    <div style={{ height: "100vh", width: "100vw", position: "relative" }}>
      <button onClick={() => setShowForm(true)} style={{ position: 'absolute', top: 24, right: 24, zIndex: 1000, background: '#007bff', color: '#fff', border: 'none', borderRadius: 8, padding: '10px 22px', fontWeight: 600, fontSize: 17, boxShadow: '0 2px 8px rgba(0,0,0,0.10)', cursor: 'pointer' }}>Report Disaster</button>
      {showForm && (
        <div style={{ position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', background: 'rgba(0,0,0,0.18)', zIndex: 2000 }}>
          <form onSubmit={handleFormSubmit} style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', background: '#fff', borderRadius: 14, boxShadow: '0 8px 32px rgba(0,0,0,0.22)', padding: '32px 38px', minWidth: 320 }}>
            <h2 style={{ marginTop: 0, marginBottom: 18, color: '#1976d2' }}>Report Disaster</h2>
            <div style={{ marginBottom: 14 }}>
              <input name="title" value={formData.title} onChange={handleFormChange} placeholder="Disaster Title" style={{ width: '100%', padding: '10px', fontSize: 16, borderRadius: 8, border: '1.5px solid #1976d2', marginBottom: 8 }} />
              <select name="category" value={formData.category} onChange={handleFormChange} style={{ width: '100%', padding: '10px', fontSize: 16, borderRadius: 8, border: '1.5px solid #1976d2', marginBottom: 8 }}>
                {Object.keys(disasterIcons).map(cat => <option key={cat} value={cat}>{cat}</option>)}
              </select>
              <input name="lat" value={formData.lat} onChange={handleFormChange} placeholder="Latitude" type="number" step="any" style={{ width: '100%', padding: '10px', fontSize: 16, borderRadius: 8, border: '1.5px solid #1976d2', marginBottom: 8 }} />
              <input name="lng" value={formData.lng} onChange={handleFormChange} placeholder="Longitude" type="number" step="any" style={{ width: '100%', padding: '10px', fontSize: 16, borderRadius: 8, border: '1.5px solid #1976d2', marginBottom: 8 }} />
            </div>
            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 10 }}>
              <button type="button" onClick={() => setShowForm(false)} style={{ background: '#888', color: '#fff', border: 'none', borderRadius: 8, padding: '8px 18px', fontWeight: 500, cursor: 'pointer' }}>Cancel</button>
              <button type="submit" style={{ background: '#1976d2', color: '#fff', border: 'none', borderRadius: 8, padding: '8px 18px', fontWeight: 500, cursor: 'pointer' }}>Add</button>
            </div>
          </form>
        </div>
      )}
      <StatisticsPanel event={selectedEvent} onClose={() => setSelectedEvent(null)} onDelete={handleDelete} />
      {/* 2D Map */}
      {viewMode === "2D" ? (
        <MapContainer
          center={[20, 0]}
          zoom={2}
          style={{ height: "100%", width: "100%" }}
        >
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors'
          />
          {allEvents.map((event) =>
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
                  eventHandlers={{
                    click: () => setSelectedEvent(event),
                  }}
                />
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
            el.onclick = () => setSelectedEvent(d.eventObj);
            return el;
          }}
        />
      )}
    </div>
  );
};

export default MapView;
