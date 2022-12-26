import { Feature, FeatureCollection, Point } from 'geojson';
import {
  LayerGroup,
  LayersControl,
  Marker,
  Tooltip,
  useMap,
} from 'react-leaflet';
import MountainIcon from '~/icons/MountainIcon';

interface Props {
  data: FeatureCollection;
}

export default function MountainsMarkerLayer({ data }: Props) {
  const leafletMap = useMap();

  const layer = (
    <>
      {data.features.map((x: Feature) => {
        const { coordinates } = x.geometry as Point;
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
              <h6>Mt. {name}</h6>
              <span>
                Continent: <b>{continent}</b>
              </span>
              <br />
              <span>
                Elevation: <b>{elevation} m.</b>
              </span>
            </Tooltip>
          </Marker>
        );
      })}
    </>
  );

  return (
    <LayersControl.Overlay checked name='Highest Points'>
      <LayerGroup>{layer}</LayerGroup>
    </LayersControl.Overlay>
  );
}
