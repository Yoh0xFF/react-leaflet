import { Feature, FeatureCollection } from 'geojson';
import { Dispatch, SetStateAction } from 'react';
import { GeoJSON } from 'react-leaflet';

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
  return (
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
}
