import { MapContainer, TileLayer } from "react-leaflet";
import useSWR from "swr";
import CitiesMarkerLayer from "../layers/CitiesMarkerLayer";
import "./Map.css";

export default function Map() {
  const { data: cities } = useSWR<GeoJSON.FeatureCollection>(
    "/populated-places-simple.geojson"
  );

  if (cities == null) {
    return <div>Data not found</div>;
  }

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
