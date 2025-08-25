import L from "leaflet";
import volcanoIcon from "./icons/volcano.png";
import wildfireIcon from "./icons/wildfire.png";
import stormIcon from "./icons/storm.png";
import floodIcon from "./icons/flood.png";
import earthquakeIcon from "./icons/earthquake.png";

// Create custom Leaflet icons for each disaster
const disasterIcons = {
  volcano: L.icon({
    iconUrl: volcanoIcon,
    iconSize: [40, 40],
    iconAnchor: [20, 40],
    popupAnchor: [0, -35],
  }),
  wildfire: L.icon({
    iconUrl: wildfireIcon,
    iconSize: [40, 40],
    iconAnchor: [20, 40],
    popupAnchor: [0, -35],
  }),
  storm: L.icon({
    iconUrl: stormIcon,
    iconSize: [40, 40],
    iconAnchor: [20, 40],
    popupAnchor: [0, -35],
  }),
  flood: L.icon({
    iconUrl: floodIcon,
    iconSize: [40, 40],
    iconAnchor: [20, 40],
    popupAnchor: [0, -35],
  }),
  earthquake: L.icon({
    iconUrl: earthquakeIcon,
    iconSize: [40, 40],
    iconAnchor: [20, 40],
    popupAnchor: [0, -35],
  }),
};

export default disasterIcons;
