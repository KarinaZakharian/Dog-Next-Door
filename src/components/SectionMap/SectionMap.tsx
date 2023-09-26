import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet';
import L from 'leaflet';
import marker from '../../assets/location-pin.png';

import './SectionMap.scss';

function SectionMap() {
  const myIcon = new L.Icon({
    iconUrl: marker,
    iconRetinaUrl: marker,
    popupAnchor: [-0, -0],
    iconSize: [45, 45],
  });
  return (
    <MapContainer
      className="leaflet-container"
      center={[46.116667, 3.416667]}
      zoom={12}
      scrollWheelZoom={false}
    >
      <Marker key={1} position={[46.116667, 3.416667]} icon={myIcon}>
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
