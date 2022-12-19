import { MapContainer, TileLayer } from "react-leaflet";
import { cities } from "../data/cities";
import CitiesMarkerLayer from "../layers/CitiesMarkerLayer";
import "./Map.css";

export default function Map() {
  return (
    <MapContainer center={[0, 0]} zoom={1} scrollWheelZoom={false}>
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <CitiesMarkerLayer data={cities} />
    </MapContainer>
  );
}
