# Earth Pulse — NASA Space Apps Challenge

Earth Pulse is a React + Vite web app for visualizing NASA disaster event data on interactive 2D maps and a 3D globe. The app loads live open disaster events from NASA's EONET API, filterable by category, and provides contextual emergency information for the selected location.

---

## ?? Demo
Live demo available here:
- [Project Demo](https://drive.google.com/drive/folders/19r4abqdz5RrEK3412wv2h5A6AFH8XFR_)

---

## ?? What it does
- Loads open disaster events from NASA EONET
- Displays events as markers on a 2D map and a 3D globe
- Filters disaster types: wildfires, volcanoes, severe storms, floods, earthquakes
- Provides a location statistics view for selected events
- Fetches nearby hospitals using OpenStreetMap / Overpass API
- Shows emergency helpline numbers for selected regions
- Includes an intro screen and a clean map-driven UI

---

## ??? Tech stack
- React 19
- Vite 7
- Leaflet / React Leaflet
- react-globe.gl
- Axios
- ESLint

---

## ?? Installation
1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the development server:
   ```bash
   npm run dev
   ```
4. Open the local URL shown in the terminal

---

## ?? Usage
- Use the header toggle to switch between `Map`, `Globe`, and `Location Statistics`
- Select disaster categories with the filter control
- Click event markers to view details, nearby hospitals, and emergency helplines
- The app fetches live open disasters from NASA EONET each time it loads

---

## ?? Project structure
- `src/App.jsx` — main app with view selection and event filtering
- `src/components/MapView.jsx` — 2D map and 3D globe rendering, marker interactions
- `src/components/Header.jsx` — view toggle controls
- `src/components/DisasterFilter.jsx` — category filter UI
- `src/components/LocationStats.jsx` — additional statistics view
- `src/components/Introduction.jsx` — startup intro screen
- `src/services/eonet.js` — NASA EONET event API client
- `vite.config.js` — Vite configuration

---

## ?? Data sources
- NASA EONET API: `https://eonet.gsfc.nasa.gov/api/v3/events?status=open`
- OpenStreetMap / Overpass API for nearby hospital lookup

---

## ?? Credits
Built for the NASA Space Apps Challenge.

If you want, I can also help add a live screenshot section or deployment instructions.
