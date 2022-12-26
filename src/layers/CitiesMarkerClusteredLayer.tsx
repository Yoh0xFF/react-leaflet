import { Feature, FeatureCollection, Point } from 'geojson';
import { LayersControl, Marker, Tooltip } from 'react-leaflet';
import MarkerClusterGroup from 'react-leaflet-cluster';
import DefaultIcon from '~/icons/DefaultIcon';

interface Props {
  data: FeatureCollection;
}

export default function CitiesMarkerClusteredLayer({ data }: Props) {
  const layer = data.features.map((x: Feature) => {
    const { coordinates } = x.geometry as Point;
    const { name } = x.properties as any;

    return (
      <Marker
        key={`world-city-cluster-${String(coordinates)}`}
        position={[coordinates[1], coordinates[0]]}
        icon={DefaultIcon}
      >
        <Tooltip>
          <span>
            Name: <b>{name}</b>
          </span>
        </Tooltip>
      </Marker>
    );
  });

  return (
    <LayersControl.Overlay name='World Cities Clustered'>
      <MarkerClusterGroup chunkedLoading>{layer}</MarkerClusterGroup>
    </LayersControl.Overlay>
  );
}
