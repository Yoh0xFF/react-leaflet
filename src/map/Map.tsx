import { Feature, FeatureCollection } from 'geojson';
import { useState } from 'react';
import { LayersControl, MapContainer, TileLayer } from 'react-leaflet';
import useSWR from 'swr';
import { FitBoundToDataControl } from '~/controls/FitBoundToDataControl';
import ShowActiveFiltersControl from '~/controls/ShowActiveFiltersControl';
import CitiesMarkerLayer from '~/layers/CitiesMarkerLayer';
import ContinentsLayer from '~/layers/ContinentsLayer';
import MountainsMarkerLayer from '~/layers/MountainsMarkerLayer';
import RadiusFilterCircle from '~/layers/RadiusFilterCircle';

import './Map.css';

export interface RadiusFilter {
  feature: Feature;
  radius: number;
}

export default function Map() {
  const { data: cities } = useSWR<FeatureCollection>(
    '/populated-places-simple.geojson'
  );
  const { data: mountains } = useSWR<FeatureCollection>(
    '/highest-points.geojson'
  );
  const { data: continents } = useSWR<FeatureCollection>('/continents.geojson');

  const [radiusFilter, setRadiusFilter] = useState<RadiusFilter | undefined>(
    undefined
  );
  const [geoFilter, setGeoFilter] = useState<Feature | undefined>(undefined);

  return (
    <MapContainer
      center={[0, 0]}
      zoom={2}
      scrollWheelZoom={false}
      worldCopyJump={true}
    >
      <FitBoundToDataControl />
      <ShowActiveFiltersControl
        radiusFilter={radiusFilter}
        geoFilter={geoFilter}
      />

      <LayersControl position='topright'>
        <LayersControl.BaseLayer checked name='Open Street Maps Layer'>
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
          />
        </LayersControl.BaseLayer>

        {cities && (
          <CitiesMarkerLayer
            data={cities}
            radiusFilter={radiusFilter}
            setRadiusFilter={setRadiusFilter}
            geoFilter={geoFilter}
          />
        )}

        {mountains && <MountainsMarkerLayer data={mountains} />}

        {continents && (
          <ContinentsLayer
            data={continents}
            geoFilter={geoFilter}
            setGeoFilter={setGeoFilter}
          />
        )}

        {radiusFilter && (
          <RadiusFilterCircle
            radiusFilter={radiusFilter}
            setRadiusFilter={setRadiusFilter}
          />
        )}
      </LayersControl>
    </MapContainer>
  );
}
