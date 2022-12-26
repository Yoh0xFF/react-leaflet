import { Feature, Point } from 'geojson';
import { ListGroup } from 'react-bootstrap';
import { RadiusFilter } from '~/map/Map';

interface Props {
  radiusFilter?: RadiusFilter;
  geoFilter?: Feature;
}

export default function showActiveFiltersControl({
  radiusFilter,
  geoFilter,
}: Props) {
  const filtersToDisplay: Array<string> = [];

  if (radiusFilter) {
    const { coordinates } = radiusFilter.feature.geometry as Point;
    const { radius } = radiusFilter;

    const displayText = `Radius: ${radius} KM (Center: [Lat: ${round(
      coordinates[1]
    )}, Lon: ${round(coordinates[0])}])`;

    filtersToDisplay.push(displayText);
  }

  if (geoFilter) {
    filtersToDisplay.push((geoFilter.properties as any).CONTINENT);
  }

  if (filtersToDisplay.length == 0) {
    filtersToDisplay.push('No Active Filter');
  }

  return (
    <div className='leaflet-bottom leaflet-left'>
      <div className='leaflet-control leaflet-bar leaflet-control-layers'>
        <ActiveFiltersList filtersToDisplay={filtersToDisplay} />
      </div>
    </div>
  );
}

function ActiveFiltersList({
  filtersToDisplay,
}: {
  filtersToDisplay: Array<string>;
}) {
  return (
    <ListGroup variant='flush'>
      <ListGroup.Item>
        <h6>Active Filters</h6>
      </ListGroup.Item>
      {filtersToDisplay.map((x, k) => (
        <ListGroup.Item key={k}>{x}</ListGroup.Item>
      ))}
    </ListGroup>
  );
}

function round(x: number): number {
  return Math.round(x * 100) / 100;
}
