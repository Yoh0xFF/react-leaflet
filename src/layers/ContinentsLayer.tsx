import { Feature, FeatureCollection } from 'geojson';
import { Dispatch, SetStateAction } from 'react';
import { GeoJSON, LayerGroup, LayersControl } from 'react-leaflet';

interface Props {
  data: FeatureCollection;
  geoFilter?: Feature;
  setGeoFilter: Dispatch<SetStateAction<Feature | undefined>>;
}

export default function ContinentsLayer({
  data,
  geoFilter,
  setGeoFilter,
}: Props) {
  const layer = (
    <GeoJSON
      key='continents-layer'
      data={data}
      eventHandlers={{
        click: (e) =>
          setGeoFilter((prevState) => {
            const same = prevState === e.propagatedFrom.feature;
            return same ? undefined : e.propagatedFrom.feature;
          }),
      }}
      style={(x) => {
        return {
          color: geoFilter === x ? 'green' : 'blue',
          weight: 0.5,
          fillOpacity: 0.2,
        };
      }}
    />
  );

  return (
    <LayersControl.Overlay checked name='Continents'>
      <LayerGroup>{layer}</LayerGroup>
    </LayersControl.Overlay>
  );
}
