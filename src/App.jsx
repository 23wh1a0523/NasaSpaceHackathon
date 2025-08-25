import React, { useState, useEffect } from "react";
import MapView from "./components/MapView";
import DisasterFilter from "./components/DisasterFilter";
import Header from "./components/Header";
import LocationStats from "./components/LocationStats";
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
      <Header activeView={activeView} setActiveView={setActiveView} />
      {activeView === "Map" && (
        <>
          <div style={{ textAlign: "center", marginBottom: "15px" }}>
            <DisasterFilter selectedTypes={selectedTypes} onChange={setSelectedTypes} />
          </div>
          <MapView events={filteredEvents} viewMode={viewMode} />
        </>
      )}
      {activeView === "Globe" && (
        <>
          <div style={{ textAlign: "center", marginBottom: "15px" }}>
            <DisasterFilter selectedTypes={selectedTypes} onChange={setSelectedTypes} />
          </div>
          <MapView events={filteredEvents} viewMode="3D" />
        </>
      )}
      {activeView === "Location Statistics" && (
        <LocationStats />
      )}
    </div>
  );
};

export default App;
