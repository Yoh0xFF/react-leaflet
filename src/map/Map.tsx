import { useState } from 'react';
import { MapContainer, TileLayer } from 'react-leaflet';
import useSWR from 'swr';
import CitiesMarkerLayer from '~/layers/CitiesMarkerLayer';
import MountainsMarkerLayer from '~/layers/MountainsMarkerLayer';

import './Map.css';

export interface RadiusFilter {
  feature: GeoJSON.Feature;
  radius: number;
}

export default function Map() {
  const { data: cities } = useSWR<GeoJSON.FeatureCollection>(
    '/populated-places-simple.geojson'
  );
  const { data: mountains } = useSWR<GeoJSON.FeatureCollection>(
    '/highest-points.geojson'
  );

  const [radiusFilter, setRadiusFilter] = useState<RadiusFilter | null>(null);

  return (
    <MapContainer center={[0, 0]} zoom={1} scrollWheelZoom={false}>
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
      />
      {cities && (
        <CitiesMarkerLayer
          data={cities}
          radiusFilter={radiusFilter}
          setRadiusFilter={setRadiusFilter}
        />
      )}
      {mountains && <MountainsMarkerLayer data={mountains} />}
    </MapContainer>
  );
}
