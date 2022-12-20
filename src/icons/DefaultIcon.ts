import L from 'leaflet';
import iconRetina from 'leaflet/dist/images/marker-icon-2x.png';
import iconMarker from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';

const { iconSize, shadowSize, iconAnchor, popupAnchor, tooltipAnchor } =
  L.Marker.prototype.options.icon?.options ?? {};

const DefaultIcon = L.icon({
  iconUrl: iconMarker,
  iconRetinaUrl: iconRetina,
  shadowUrl: iconShadow,
  iconSize,
  shadowSize,
  iconAnchor,
  popupAnchor,
  tooltipAnchor,
});

export default DefaultIcon;
