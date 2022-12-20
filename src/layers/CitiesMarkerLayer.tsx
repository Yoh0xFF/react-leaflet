import { useState } from 'react';
import { Button, Card, Col, Form, Row } from 'react-bootstrap';
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
              <PopupStatistics feature={x} />
            </Popup>
          </Marker>
        );
      })}
    </>
  );
}

function PopupStatistics({ feature }: { feature: GeoJSON.Feature }) {
  const [radius, setRadius] = useState<number>(3000);
  const { name, adm0name, pop_max } = feature.properties as any;

  return (
    <Card style={{ width: '18rem' }}>
      <Card.Body>
        <Card.Text className='mt-0'>
          <span className='h6'>Name: </span>
          <b>{`${name}, ${adm0name}`}</b>
        </Card.Text>

        <Card.Text>
          <span className='h6'>Population: </span>
          <b>{`${pop_max}`}</b>
        </Card.Text>

        <Form>
          <Row>
            <Col>
              <Form.Control
                type='number'
                placeholder='Radius filter'
                min={0}
                defaultValue={radius}
                onChange={(e) => console.log(e.nativeEvent.target)}
              />
            </Col>
            <Col>
              <Button variant='primary'>Filter by KM</Button>
            </Col>
          </Row>
        </Form>
      </Card.Body>
    </Card>
  );
}
