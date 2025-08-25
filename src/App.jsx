import React, { useState, useEffect } from "react";
import MapView from "./components/MapView";
import DisasterFilter from "./components/DisasterFilter";
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
  const [viewMode, setViewMode] = useState("2D");
  const [selectedTypes, setSelectedTypes] = useState(DISASTER_KEYS);

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

  return (
    <div>
      <h1 style={{ textAlign: "center", padding: "10px" }}>🌎 NASA Disaster Tracker</h1>
      <div style={{ textAlign: "center", marginBottom: "15px" }}>
        <button
          onClick={() => setViewMode(viewMode === "2D" ? "3D" : "2D")}
          style={{
            padding: "10px 24px",
            backgroundColor: "#007bff",
            color: "#fff",
            border: "none",
            borderRadius: "8px",
            fontWeight: "bold",
            fontSize: "1rem",
            boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
            cursor: "pointer",
            transition: "background 0.2s",
          }}
        >
          {viewMode === "2D" ? "Switch to 3D Globe" : "Switch to 2D Map"}
        </button>
      </div>
      <div style={{ textAlign: "center", marginBottom: "15px" }}>
        <DisasterFilter selectedTypes={selectedTypes} onChange={setSelectedTypes} />
      </div>
      <MapView events={filteredEvents} viewMode={viewMode} />
    </div>
  );
};

export default App;
