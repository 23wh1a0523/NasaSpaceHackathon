import React from "react";


const DISASTER_TYPES = [
  {
    key: "wildfire",
    label: "Wildfire",
    icon: "https://cdn-icons-png.flaticon.com/512/578/578120.png", // flame
  },
  {
    key: "volcano",
    label: "Volcano",
    icon: "https://cdn-icons-png.flaticon.com/512/4260/4260523.png", // erupting volcano
  },
  {
    key: "storm",
    label: "Storm",
    icon: "https://cdn-icons-png.flaticon.com/512/1146/1146869.png", // lightning cloud
  },
  {
    key: "flood",
    label: "Flood",
    icon: "https://cdn-icons-png.flaticon.com/512/2843/2843536.png", // flood water
  },
  {
    key: "earthquake",
    label: "Earthquake",
    icon: "https://cdn-icons-png.flaticon.com/512/1684/1684375.png", // earthquake
  },
];

export default function DisasterFilter({ selectedTypes, onChange }) {
  return (
    <div className="disaster-filter">
      <span>Filter disasters:</span>
      {DISASTER_TYPES.map((type) => (
        <label key={type.key} style={{ marginLeft: 16, display: "inline-flex", alignItems: "center", fontSize: 16, padding: "4px 8px", borderRadius: 6, background: selectedTypes.includes(type.key) ? "#f0f8ff" : "#fff", boxShadow: selectedTypes.includes(type.key) ? "0 2px 8px rgba(0,0,0,0.08)" : "none" }}>
          <input
            type="checkbox"
            checked={selectedTypes.includes(type.key)}
            onChange={() => {
              if (selectedTypes.includes(type.key)) {
                onChange(selectedTypes.filter((t) => t !== type.key));
              } else {
                onChange([...selectedTypes, type.key]);
              }
            }}
            style={{ marginRight: 8 }}
          />
          <img src={type.icon} alt={type.label} style={{ width: 28, height: 28, marginRight: 6, verticalAlign: "middle" }} />
          {type.label}
        </label>
      ))}
    </div>
  );
}
