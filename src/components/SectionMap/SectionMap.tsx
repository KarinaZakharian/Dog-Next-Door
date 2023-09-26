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
  const data = [
    {
      id: 1,
      avatar: '../../assets/avatar-1.png',
      firstname: 'John',
      lastname: 'Doe',
      town: 'Paris',
      country: 'France',
      latitude: 46.15,
      longitude: 3.43,
    },
    {
      id: 2,
      avatar: '../../assets/avatar-1.png',
      firstname: 'Karine',
      lastname: 'Truc',
      town: 'Paris',
      country: 'France',
      latitude: 46.11,
      longitude: 3.42,
    },
    {
      id: 3,
      avatar: '../../assets/avatar-1.png',
      firstname: 'Félix',
      lastname: 'Machin',
      town: 'Paris',
      country: 'France',
      latitude: 46.12,
      longitude: 3.41,
    },
    {
      id: 4,
      avatar: '../../assets/avatar-1.png',
      firstname: 'Rober',
      lastname: 'Bidule',
      town: 'Paris',
      country: 'France',
      latitude: 46.11,
      longitude: 3.43,
    },
    {
      id: 5,
      avatar: '../../assets/avatar-1.png',
      firstname: 'Régis',
      lastname: 'What',
      town: 'Paris',
      country: 'France',
      latitude: 46.14,
      longitude: 3.41,
    },
  ];
  return (
    <MapContainer
      className="leaflet-container"
      center={[46.116667, 3.416667]}
      zoom={12}
      scrollWheelZoom={false}
    >
      {data.map((user) => (
        <Marker
          key={user.id}
          position={L.latLng(user.latitude, user.longitude)}
          icon={myIcon}
        >
          <Popup>
            <div>{user.avatar}</div>
            <div>
              <h2>
                `{user.firstname} {user.lastname}`
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
