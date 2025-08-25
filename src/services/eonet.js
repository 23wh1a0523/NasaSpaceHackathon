// src/services/eonet.js
export const fetchDisasterEvents = async () => {
  try {
    const response = await fetch(
      "https://eonet.gsfc.nasa.gov/api/v3/events?status=open"
    );
    const data = await response.json();
    return data.events || [];
  } catch (error) {
    console.error("Error fetching disaster events:", error);
    return [];
  }
};
