import { createControlComponent } from '@react-leaflet/core';
import { Control, DomUtil, Layer, Map } from 'leaflet';
import { Button } from 'react-bootstrap';
import { Root, createRoot } from 'react-dom/client';

let node: HTMLDivElement | undefined = undefined;
let root: Root | undefined = undefined;

function doFitDataToBounds(map: Map) {
  const latLngs: Array<[number, number]> = [];

  map.eachLayer((layer: Layer) => {
    if ((layer as any)?.options?.alt == 'World city') {
      latLngs.push((layer as any).getLatLng());
    }
  });

  if (latLngs.length > 0) {
    map.fitBounds(latLngs);
  }
}

const FitBoundToDataControlClass = Control.extend({
  options: {
    position: 'topleft',
  },
  onAdd: function (map: Map) {
    if (node != null) {
      return node;
    }
    node = DomUtil.create('div');
    root = createRoot(node);

    root.render(
      <div className='d-flex flex-column'>
        <Button
          className='leaflet-control-layers'
          title='Fit bounds to world'
          variant='light'
          onClick={() => map.fitWorld()}
        >
          <i className='bi bi-border-outer' />
        </Button>

        <Button
          className='leaflet-control-layers'
          title='Fit bounds to data'
          variant='light'
          onClick={() => doFitDataToBounds(map)}
        >
          <i className='bi bi-border-inner' />
        </Button>
      </div>
    );

    return node;
  },
  onRemove: function (map: Map) {
    root?.unmount();
    root = undefined;

    node?.remove();
    node = undefined;
  },
});

export const FitBoundToDataControl = createControlComponent(
  (props) => new FitBoundToDataControlClass(props)
);
