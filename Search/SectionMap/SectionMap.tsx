import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet';
import L from 'leaflet';
import marker from '../../../assets/dog-area.png';
import shadow from '../../../assets/dog-area-shadow.png';
import data from '../../../../fakeData/data.json';

import './SectionMap.scss';

function SectionMap() {
  const myIcon = new L.Icon({
    iconUrl: marker,
    iconRetinaUrl: marker,
    shadowUrl: shadow,
    popupAnchor: [-0, -0],
    iconSize: [40, 40],
    shadowSize: [40, 40],
    shadowAnchor: [4, 22],
  });
  const users = data;
  const { latitude, longitude } = users[0];
  return (
    <MapContainer
      className="leaflet-container"
      center={L.latLng(latitude, longitude)}
      zoom={12}
      scrollWheelZoom={false}
    >
      {users.map((user) => (
        <Marker
          key={user.id}
          position={L.latLng(user.latitude, user.longitude)}
          icon={myIcon}
        >
          <Popup>
            <img src={user.avatar} alt="Avatar" />
            <div>
              <h2>
                {user.firstname} {user.lastname}
              </h2>
              <p>{user.town}</p>
              <p>{user.country}</p>
            </div>
          </Popup>
        </Marker>
      ))}
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
      />
    </MapContainer>
  );
}

export default SectionMap;
