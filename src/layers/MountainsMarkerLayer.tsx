import { Marker, Tooltip, useMap } from 'react-leaflet';
import MountainIcon from '~/icons/MountainIcon';

interface Props {
  data: GeoJSON.FeatureCollection;
}

export default function MountainsMarkerLayer({ data }: Props) {
  const leafletMap = useMap();

  return (
    <>
      {data.features.map((x: GeoJSON.Feature) => {
        if (x.geometry.type !== 'Point') {
          return <></>;
        }
        const { coordinates } = x.geometry;
        const { name, elevation, continent } = x.properties as any;

        return (
          <Marker
            key={String(coordinates)}
            position={[coordinates[1], coordinates[0]]}
            icon={MountainIcon}
            eventHandlers={{
              click: (e) => leafletMap.panTo(e.latlng),
            }}
          >
            <Tooltip>
              <h3>Mt. {name}</h3>
              Continent: <b>{continent}</b>
              <br />
              Elevation: <b>{elevation} m.</b>
            </Tooltip>
          </Marker>
        );
      })}
    </>
  );
}
