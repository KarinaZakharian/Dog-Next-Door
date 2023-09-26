import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet';
import L from 'leaflet';
import marker from '../../assets/dog-area.png';
import shadow from '../../assets/dog-area-shadow.png';

import './SectionMap.scss';

function SectionMap() {
  const myIcon = new L.Icon({
    iconUrl: marker,
    iconRetinaUrl: marker,
    shadowUrl: shadow,
    popupAnchor: [-0, -0],
    iconSize: [45, 45],
    shadowSize: [45, 45],
    shadowAnchor: [4, 22],
  });
  return (
    <MapContainer
      className="leaflet-container"
      center={[46.116667, 3.416667]}
      zoom={12}
      scrollWheelZoom={false}
    >
      <Marker key={1} position={[46.116667, 3.4456611]} icon={myIcon}>
        <Popup>
          <div>
            <h2>David</h2>
            <p>J&apos;habite là ^^</p>
          </div>
        </Popup>
      </Marker>
      <Marker key={1} position={[46.1026516, 3.42]} icon={myIcon}>
        <Popup>
          <div>
            <h2>Marker Popup Title</h2>
            <p>Marker Popup Content</p>
          </div>
        </Popup>
      </Marker>
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
      />
    </MapContainer>
  );
}

export default SectionMap;
