import React from "react";
import { Marker, Popup } from "react-leaflet";
import L from "leaflet";

const DisasterMarkers = ({ events, icons }) => {
  return (
    <>
      {events.map((event, index) =>
        event.geometry.map((geo, i) => {
          const icon = new L.Icon({
            iconUrl: icons[event.category],
            iconSize: [40, 40],
            iconAnchor: [20, 40],
            popupAnchor: [0, -40],
          });

          return (
            <Marker
              key={`${index}-${i}`}
              position={[geo.coordinates[1], geo.coordinates[0]]}
              icon={icon}
            >
              <Popup>
                <b>{event.title}</b> <br />
                Category: {event.category} <br />
                Date: {new Date(geo.date).toLocaleDateString()}
              </Popup>
            </Marker>
          );
        })
      )}
    </>
  );
};

export default DisasterMarkers;
