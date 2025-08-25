import React from "react";
const DISASTER_TYPES = [
  {
    key: "wildfire",
    label: "Wildfire",
<<<<<<< HEAD
    icon: "https://cdn.britannica.com/42/188142-050-4D4D9D19/wildfire-Stanislaus-National-Forest-California-2013.jpg?w=400&h=300&c=crop", // flame
=======
    icon: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQmVw0p9799tF8TNajuOrdJgIS4WD0vAsiAVw&s", // flame
>>>>>>> 2d6a0e2 (Second Commit)
  },
  {
    key: "volcano",
    label: "Volcano",
<<<<<<< HEAD
    icon: "https://naturalhistory.si.edu/sites/default/files/styles/resource_side/public/media/image/arenal-volcano-olger-aragon-081029.jpg.webp?itok=Gzft99RE", // erupting volcano
=======
    icon: "https://images.newscientist.com/wp-content/uploads/2020/12/21145328/volcanoes-f0r7pt_web.jpg",
>>>>>>> 2d6a0e2 (Second Commit)
  },
  {
    key: "storm",
    label: "Storm",
<<<<<<< HEAD
    icon: "https://www.timeforkids.com/wp-content/uploads/2018/08/Storms-Images.jpg", // lightning cloud
=======
    icon: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSlRiHy0JNX2M1u9FPPUfBeC8qO_a_Bx-WpGA&s",
>>>>>>> 2d6a0e2 (Second Commit)
  },
  {
    key: "flood",
    label: "Flood",
<<<<<<< HEAD
    icon: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSPXQvQEN6rVUdAXxS6WSN7T-DiDKuR2exr4w&s", // flood water
=======
    icon: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQPV3T_uEDL94my6Zpz-JStnuVc7t_ml6kUkw&s",
>>>>>>> 2d6a0e2 (Second Commit)
  },
  {
    key: "earthquake",
    label: "Earthquake",
<<<<<<< HEAD
    icon: "https://gelogia.com/wp-content/uploads/2024/10/earthquake-1080x599.jpg", // earthquake
=======
    icon: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSZsdT4vS6SSQyLBsoNm1wVn7QqXIX-4s3ieg&s",
>>>>>>> 2d6a0e2 (Second Commit)
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
