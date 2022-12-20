import L from 'leaflet';
import MountainIconImg from '~/assets/mountain.png';

const MountainIcon = L.icon({
  iconUrl: MountainIconImg,
  iconSize: [35, 23],
  iconAnchor: [17, 16],
  tooltipAnchor: [15, -5],
});

export default MountainIcon;
