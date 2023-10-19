import { Marker, Popup } from 'react-leaflet';
import L, { LatLngExpression } from 'leaflet';
import { useAppSelector } from '../../../hooks/redux';

import marker from '../../../assets/dog-area-blue.png';
import shadow from '../../../assets/dog-area-shadow-blur.png';
import LeafletMap from '../../PageComponents/LeafletMap/LeafletMap';
import avatarLogo from '../../../assets/Logo-ODogNextDoor.svg';

import { UserProps } from '../../../@types/user';
import './SectionMap.scss';

function SectionMap() {
  const users: UserProps[] = useAppSelector(
    (state) => state.search.users
  ) as unknown as UserProps[];
  const avatarNone = avatarLogo;

  const myIcon = new L.Icon({
    iconUrl: marker,
    iconRetinaUrl: marker,
    shadowUrl: shadow,
    popupAnchor: [-0, -0],
    iconSize: [28, 40],
    shadowSize: [35, 40],
    shadowAnchor: [3, 17],
  });

  const userOne =
    users.length > 0
      ? users[0]
      : {
          latitude: 48.866667,
          longitude: 2.333333,
        };
  const center: LatLngExpression = L.latLng(
    userOne.latitude,
    userOne.longitude
  );

  console.log('Center used:', center);

  return (
    <div className="map-container">
      <LeafletMap key={center.toString()} center={center} zoom={13}>
        {users.map((user: UserProps) => (
          <Marker
            key={user.id}
            position={L.latLng(user.latitude, user.longitude)}
            icon={myIcon}
          >
            <Popup>
              <img src={user.avatar ? user.avatar : avatarNone} alt="Avatar" />
              <div>
                <h2>
                  {user.firstname} {user.lastname}
                </h2>
                <p>Distance {user.distance} km</p>
              </div>
            </Popup>
          </Marker>
        ))}
      </LeafletMap>
    </div>
  );
}

export default SectionMap;
