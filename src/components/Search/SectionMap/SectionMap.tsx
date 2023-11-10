import { Marker, Popup } from 'react-leaflet';
import L, { LatLngLiteral } from 'leaflet';
import { useAppSelector } from '../../../hooks/redux';

import LeafletMap from '../../PageComponents/LeafletMap/LeafletMap';
import marker from '../../../assets/dog-area-blue.png';
import centerMarker from '../../../assets/dog-area.png';
import shadow from '../../../assets/dog-area-shadow-blur.png';
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

  const myCenterIcon = new L.Icon({
    iconUrl: centerMarker,
    iconRetinaUrl: centerMarker,
    shadowUrl: shadow,
    popupAnchor: [-0, -0],
    iconSize: [38, 40],
    shadowSize: [35, 40],
    shadowAnchor: [3, 17],
  });

  const coordinates = useAppSelector((state) => state.search.centerCoordinates);

  const center: LatLngLiteral = L.latLng(
    coordinates.latitude,
    coordinates.longitude
  );

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
        <Marker position={L.latLng(center)} icon={myCenterIcon}>
          <Popup>
            <p>Emplacement de votre recherche</p>
          </Popup>
        </Marker>
      </LeafletMap>
    </div>
  );
}

export default SectionMap;
