import React, { useState, useEffect } from "react";

import MapView from "./components/MapView";
import DisasterFilter from "./components/DisasterFilter";
import Header from "./components/Header";
import LocationStats from "./components/LocationStats";
import Introduction from "./components/Introduction";
import { fetchDisasterEvents } from "./services/eonet";

const DISASTER_KEYS = ["wildfire", "volcano", "storm", "flood", "earthquake"];
const CATEGORY_MAP = {
  wildfire: ["Wildfires"],
  volcano: ["Volcanoes"],
  storm: ["Severe Storms"],
  flood: ["Floods"],
  earthquake: ["Earthquakes"],
};


const App = () => {
  const [events, setEvents] = useState([]);
  const [selectedTypes, setSelectedTypes] = useState(DISASTER_KEYS);
  const [activeView, setActiveView] = useState("Map");
  const [viewMode, setViewMode] = useState("2D");
  const [showIntro, setShowIntro] = useState(true);

  useEffect(() => {
    const getEvents = async () => {
      const data = await fetchDisasterEvents();
      setEvents(data);
    };
    getEvents();
  }, []);

  // Filter events by selected disaster types
  const filteredEvents = events.filter((event) => {
    const category = event.categories[0]?.title;
    return selectedTypes.some((type) => CATEGORY_MAP[type].includes(category));
  });

  if (showIntro) {
    return <Introduction onEnter={() => setShowIntro(false)} />;
  }
  return (
    <div>
      <div
        style={{
          position: 'relative',
          width: '100%',
          backgroundImage: 'url(https://img.freepik.com/premium-vector/space-background-with-stars-vector-illustration_97886-319.jpg)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          borderRadius: '0 0 32px 32px',
          boxShadow: '0 4px 24px rgba(0,0,0,0.10)',
          marginBottom: 18,
          minHeight: 180,
          paddingBottom: 32
        }}
      >
        <h1 style={{ textAlign: "center", padding: "32px 0 0 0", margin: 0, color: '#fff', fontWeight: 800, fontSize: '2.6rem', letterSpacing: 2, textShadow: '0 2px 8px rgba(0,0,0,0.10)' }}>
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/9/97/The_Earth_seen_from_Apollo_17.jpg/240px-The_Earth_seen_from_Apollo_17.jpg"
            alt="Globe"
            style={{
              width: 54,
              verticalAlign: 'middle',
              marginRight: 12,
              borderRadius: '50%',
              boxShadow: '0 2px 8px rgba(0,0,0,0.10)'
            }}
          />
          Earth Pulse
        </h1>
        <div style={{ width: '100%', display: 'flex', justifyContent: 'center', marginTop: 18 }}>
          <Header activeView={activeView} setActiveView={setActiveView} />
        </div>
        {activeView === "Map" && (
          <div style={{ textAlign: "center", marginBottom: "15px", marginTop: 8 }}>
            <DisasterFilter selectedTypes={selectedTypes} onChange={setSelectedTypes} />
          </div>
        )}
        {activeView === "Globe" && (
          <div style={{ textAlign: "center", marginBottom: "15px", marginTop: 8 }}>
            <DisasterFilter selectedTypes={selectedTypes} onChange={setSelectedTypes} />
          </div>
        )}
      </div>
      {activeView === "Map" && <MapView events={filteredEvents} viewMode={viewMode} />}
      {activeView === "Globe" && <MapView events={filteredEvents} viewMode="3D" />}
      {activeView === "Location Statistics" && <LocationStats />}
    </div>
  );
};

export default App;
