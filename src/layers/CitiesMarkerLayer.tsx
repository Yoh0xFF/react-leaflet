import { Marker, Popup } from 'react-leaflet';
import DefaultIcon from '~/icons/DefaultIcon';

interface Props {
  data: GeoJSON.FeatureCollection;
}

export default function CitiesMarkerLayer({ data }: Props) {
  return (
    <>
      {data.features.map((x: GeoJSON.Feature) => {
        if (x.geometry.type !== 'Point') {
          return <></>;
        }
        const { coordinates } = x.geometry;

        return (
          <Marker
            key={String(coordinates)}
            position={[coordinates[1], coordinates[0]]}
            icon={DefaultIcon}
          >
            <Popup>
              A pretty CSS3 popup. <br /> Easily customizable.
            </Popup>
          </Marker>
        );
      })}
    </>
  );
}
