import booleanPointInPolygon from '@turf/boolean-point-in-polygon';
import { Feature, FeatureCollection, MultiPolygon, Point } from 'geojson';
import L from 'leaflet';
import { Dispatch, SetStateAction, useState } from 'react';
import { Button, Card, Col, Form, ListGroup, Row } from 'react-bootstrap';
import { Marker, Popup } from 'react-leaflet';
import DefaultIcon from '~/icons/DefaultIcon';
import { RadiusFilter } from '~/map/Map';

interface Props {
  data: FeatureCollection;
  radiusFilter?: RadiusFilter;
  setRadiusFilter: Dispatch<SetStateAction<RadiusFilter | undefined>>;
  geoFilter?: Feature;
}

export default function CitiesMarkerLayer({
  data,
  radiusFilter,
  setRadiusFilter,
  geoFilter,
}: Props) {
  let centerPoint: L.LatLng;
  if (radiusFilter) {
    const { coordinates } = radiusFilter.feature.geometry as Point;
    centerPoint = L.latLng(coordinates[1], coordinates[0]);
  }

  return (
    <>
      {data.features
        .filter((x) => {
          let filterByRadius = false;
          let filterByGeo = false;

          if (radiusFilter && centerPoint) {
            const { coordinates } = x.geometry as Point;
            const currentPoint = L.latLng(coordinates[1], coordinates[0]);
            filterByRadius =
              centerPoint.distanceTo(currentPoint) / 1000 < radiusFilter.radius;
          }

          if (geoFilter) {
            filterByGeo = booleanPointInPolygon(
              x.geometry as Point,
              geoFilter.geometry as MultiPolygon
            );
          }

          if (radiusFilter && geoFilter) {
            return filterByRadius && filterByGeo;
          } else if (radiusFilter && !geoFilter) {
            return filterByRadius;
          } else if (!radiusFilter && geoFilter) {
            return filterByGeo;
          } else {
            return true;
          }
        })
        .map((x: Feature) => {
          const { coordinates } = x.geometry as Point;

          return (
            <Marker
              key={String(coordinates)}
              position={[coordinates[1], coordinates[0]]}
              icon={DefaultIcon}
            >
              <Popup>
                <PopupStatistics
                  feature={x}
                  setRadiusFilter={setRadiusFilter}
                />
              </Popup>
            </Marker>
          );
        })}
    </>
  );
}

function PopupStatistics({
  feature,
  setRadiusFilter,
}: {
  feature: Feature;
  setRadiusFilter: Dispatch<SetStateAction<RadiusFilter | undefined>>;
}) {
  const [validated, setValidated] = useState(false);
  const [disabled, setDisabled] = useState(false);
  const [radius, setRadius] = useState<number>(3000);

  const { name, adm0name, pop_max } = feature.properties as any;

  return (
    <Card style={{ width: '18rem' }}>
      <Card.Body>
        <ListGroup className='mb-3'>
          <ListGroup.Item>Name:&nbsp;{`${name}, ${adm0name}`}</ListGroup.Item>
          <ListGroup.Item>Population:&nbsp;{`${pop_max}`}</ListGroup.Item>
        </ListGroup>

        <Form
          validated={validated}
          onChange={(e) => setDisabled(!e.currentTarget.checkValidity())}
          onSubmit={(e) => e.preventDefault()}
        >
          <Row>
            <Col>
              <Form.Control
                type='number'
                size='sm'
                placeholder='Radius'
                min='0'
                required
                defaultValue={radius}
                onChange={(e) => {
                  setValidated(true);
                  setRadius(Number(e.currentTarget.value));
                }}
              />
            </Col>
            <Col>
              <Button
                size='sm'
                variant='primary'
                disabled={disabled}
                onClick={() =>
                  setRadiusFilter((prevState: RadiusFilter | undefined) => {
                    if (radius === 0) {
                      return prevState ? prevState : undefined;
                    }

                    if (prevState) {
                      const sameFeature = prevState.feature === feature;
                      const sameRadius = prevState.radius === radius;

                      return !sameFeature || !sameRadius
                        ? { feature, radius }
                        : undefined;
                    }

                    return { feature, radius };
                  })
                }
              >
                Filter by KM
              </Button>
            </Col>
          </Row>
        </Form>
      </Card.Body>
    </Card>
  );
}
