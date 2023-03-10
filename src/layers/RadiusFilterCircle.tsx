import { Point } from 'geojson';
import { Dispatch, SetStateAction } from 'react';
import { Circle, LayerGroup, LayersControl } from 'react-leaflet';
import { RadiusFilter } from '~/map/Map';

interface Props {
  radiusFilter: RadiusFilter;
  setRadiusFilter: Dispatch<SetStateAction<RadiusFilter | undefined>>;
}

export default function RadiusFilterCircle({
  radiusFilter,
  setRadiusFilter,
}: Props) {
  const { coordinates } = radiusFilter.feature.geometry as Point;

  const layer = (
    <Circle
      center={[coordinates[1], coordinates[0]]}
      radius={radiusFilter.radius * 1000}
      color={'gray'}
      weight={1}
      fillOpacity={0.4}
      eventHandlers={{
        dblclick: (e) => {
          (e.originalEvent.view as any).L.DomEvent.stopPropagation(e);
          setRadiusFilter(undefined);
        },
      }}
    />
  );

  return (
    <LayersControl.Overlay checked name='Radius Filter'>
      <LayerGroup>{layer}</LayerGroup>
    </LayersControl.Overlay>
  );
}
