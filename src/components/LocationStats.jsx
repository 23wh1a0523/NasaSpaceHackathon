// Use the same anime-style logo URLs as DisasterFilter and MapView
const disasterIcons = {
  Wildfires: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQmVw0p9799tF8TNajuOrdJgIS4WD0vAsiAVw&s",
  Volcanoes: "https://images.newscientist.com/wp-content/uploads/2020/12/21145328/volcanoes-f0r7pt_web.jpg",
  "Severe Storms": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSlRiHy0JNX2M1u9FPPUfBeC8qO_a_Bx-WpGA&s",
  Floods: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQPV3T_uEDL94my6Zpz-JStnuVc7t_ml6kUkw&s",
  Earthquakes: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSZsdT4vS6SSQyLBsoNm1wVn7QqXIX-4s3ieg&s",
};
import React, { useState } from "react";
import axios from "axios";

export default function LocationStats() {
  const [location, setLocation] = useState("");
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSearch = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setResult(null);
    try {
      // Get coordinates from OpenStreetMap Nominatim
      const geoRes = await axios.get(`https://nominatim.openstreetmap.org/search?format=json&q=${location}`);
      if (!geoRes.data.length) throw new Error("Location not found");
      const { lat, lon, display_name } = geoRes.data[0];
      // Get weather from OpenWeatherMap using new API key
      const weatherRes = await axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=d726a90b4e97995864bfa9081101d167&units=metric`);
      // Get disasters from NASA EONET
      const eonetRes = await axios.get(`https://eonet.gsfc.nasa.gov/api/v3/events?status=open&limit=100`);
      const disasters = eonetRes.data.events.filter(ev => {
        return ev.geometry.some(g => {
          const [lng, latEv] = g.coordinates;
          // Simple proximity check (within 2 deg)
          return Math.abs(latEv - lat) < 2 && Math.abs(lng - lon) < 2;
        });
      });
      setResult({
        name: display_name,
        weather: weatherRes.data,
        disasters,
      });
    } catch (err) {
      setError(err.message || "Error fetching data");
    }
    setLoading(false);
  };

  return (
    <div style={{ maxWidth: 480, margin: "40px auto", textAlign: "left", background: "#fff", borderRadius: 16, boxShadow: "0 4px 24px rgba(0,0,0,0.10)", padding: 32 }}>
      <h2 style={{ textAlign: "center", fontWeight: 700, fontSize: "2rem", marginBottom: 24, color: "#007bff" }}>Location Statistics</h2>
      <form onSubmit={handleSearch} style={{ display: "flex", gap: 12, marginBottom: 24, justifyContent: "center" }}>
        <input
          type="text"
          value={location}
          onChange={e => setLocation(e.target.value)}
          placeholder="Enter location (city, country)"
          style={{ flex: 1, padding: "12px 16px", fontSize: 18, borderRadius: 8, border: "1.5px solid #007bff", outline: "none", boxShadow: "0 2px 8px rgba(0,0,0,0.04)" }}
        />
        <button type="submit" style={{ padding: "12px 28px", borderRadius: 8, background: "linear-gradient(90deg,#007bff 60%,#00c6ff 100%)", color: "#fff", border: "none", fontWeight: "bold", fontSize: 18, boxShadow: "0 2px 8px rgba(0,0,0,0.08)", cursor: "pointer", transition: "background 0.2s" }}>Search</button>
      </form>
      {loading && <div style={{ textAlign: "center", fontSize: 18, color: "#007bff" }}>Loading...</div>}
      {error && <div style={{ color: "#d32f2f", textAlign: "center", fontWeight: 500, marginBottom: 12 }}>{error}</div>}
      {result && (
        <div style={{ background: "#f4f8ff", padding: 24, borderRadius: 12, boxShadow: "0 2px 8px rgba(0,0,0,0.04)", marginTop: 8 }}>
          <h3 style={{ fontWeight: 600, fontSize: "1.3rem", marginBottom: 10, color: "#333" }}>{result.name}</h3>
          <div style={{ display: "flex", alignItems: "center", marginBottom: 16 }}>
            <span style={{ fontWeight: 500, color: "#007bff", marginRight: 8 }}>Weather:</span>
            <span style={{ fontSize: 17, color: "#444" }}>{result.weather.weather[0].description}, <b>{result.weather.main.temp}°C</b></span>
          </div>
          <div style={{ marginBottom: 8 }}>
            <span style={{ fontWeight: 500, color: "#007bff" }}>Disasters nearby:</span>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            {result.disasters.length ? result.disasters.map(ev => {
              const category = ev.categories[0]?.title;
              const iconUrl = disasterIcons[category] || disasterIcons["Wildfires"];
              return (
                <div key={ev.id} style={{ display: "flex", alignItems: "center", background: "#fff", borderRadius: 8, boxShadow: "0 1px 4px rgba(0,0,0,0.04)", padding: "8px 12px" }}>
                  <span style={{ display: "inline-flex", alignItems: "center", marginRight: 10 }}>
                    <img src={iconUrl} alt={category} style={{ width: 28, height: 28, marginRight: 8, borderRadius: 6, boxShadow: "0 1px 4px rgba(0,0,0,0.08)" }} />
                    <span style={{ fontWeight: 500, color: "#555", fontSize: 16 }}>{category}</span>
                  </span>
                  <span style={{ color: "#222", fontSize: 16 }}>{ev.title}</span>
                </div>
              );
            }) : <span style={{ color: "#888", fontSize: 16, marginLeft: 4 }}>None</span>}
          </div>
        </div>
      )}
    </div>
  );
}
