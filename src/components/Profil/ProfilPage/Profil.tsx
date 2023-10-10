import { fetchUser } from '../../../store/reducers/profil';
import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../../hooks/redux';
import { Link } from 'react-router-dom';
import Header from '../../PageComponents/Header/Header';
import Footer from '../../PageComponents/Footer/Footer';
import DateRangeComp from '../../InputType/DatePiker/DateRangeSelect';
import Button from '../../InputType/Button/Button';
import AnimalCard from '../AnimalCard/AnimalCard';
import LeafletMap from '../../PageComponents/LeafletMap/LeafletMap';
import L, { LatLngExpression, latLng, LatLngLiteral } from 'leaflet';
import { Marker, Popup } from 'react-leaflet';
import marker from '../../../assets/dog-area.png';
import shadow from '../../../assets/dog-area-shadow.png';
import avatarNone from '../../../assets/Logo-ODogNextDoor.svg';
import './Profil.scss';
function Profil() {
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(fetchUser());
  }, []);
  const loading = useAppSelector((state) => state.profil.loading);
  const firstname = useAppSelector((state) => state.profil.firstname);
  const lastname = useAppSelector((state) => state.profil.lastname);
  const user_address = useAppSelector((state) => state.profil.user_address);
  const longitude = useAppSelector((state) => state.profil.longitude);
  const latitude = useAppSelector((state) => state.profil.latitude);
  const size = useAppSelector((state) => state.profil.animal_size);
  const description = useAppSelector((state) => state.profil.description);
  const garden = useAppSelector((state) => state.profil.garden);
  const accommodation = useAppSelector((state) => state.profil.accomodation);
  const additionnal_information = useAppSelector(
    (state) => state.profil.additionnal_information
  );
  const walking_duration = useAppSelector(
    (state) => state.profil.walking_duration
  );
  const disponibility_date = useAppSelector(
    (state) => state.profil.disponibility_date
  );
  const type = useAppSelector((state) => state.profil.animal);
  const name = useAppSelector((state) => state.profil.name);
  const date_birth = useAppSelector((state) => state.profil.date_birth);
  const size_animal = useAppSelector((state) => state.profil.size);
  const walk = useAppSelector((state) => state.profil.walk);
  const energy = useAppSelector((state) => state.profil.energy);
  const food = useAppSelector((state) => state.profil.mealhours);
  const race = useAppSelector((state) => state.profil.race);
  console.log(longitude, latitude);
  const center: LatLngExpression = latLng(latitude, longitude);
  const myIcon = new L.Icon({
    iconUrl: marker,
    iconRetinaUrl: marker,
    shadowUrl: shadow,
    popupAnchor: [-0, -0],
    iconSize: [32, 40],
    shadowSize: [40, 40],
    shadowAnchor: [4, 22],
  });
  const renderSize = () => {
    if (size !== undefined && size !== null) {
      if (Array.isArray(size)) {
        return size.map((item, index) => <li key={index}>{item}</li>);
      } else if (typeof size === 'string') {
        // Assuming 'size' is a string like "Petit (0-7 kg)"
        const sizes = size.split(',');
        return sizes.map((item, index) => <li key={index}>{item}</li>);
      } else {
        return <li>{size}</li>;
      }
    }
    return null;
  };
  const renderOptions = () => {
    if (
      additionnal_information !== undefined &&
      additionnal_information !== null
    ) {
      if (Array.isArray(additionnal_information)) {
        return additionnal_information.map((item, index) => (
          <li key={index}>{item}</li>
        ));
      } else if (typeof additionnal_information === 'string') {
        const options = additionnal_information.split(',');
        return options.map((item, index) => <li key={index}>{item}</li>);
      } else {
        return <li>{additionnal_information}</li>;
      }
    }
    return null;
  };
  return (
    <div className="page-wrapper">
      <Header />
        <div className="profil-wrapper">
          <div className="container-profil">
            <div className="aside-profil">
              {/* <img className="main-img" src={avatar} /> */}
              <img
                className="card-image"
                src={avatarNone}
                alt="Avatar"
              />
              <h3 className="profil-title">
                {lastname} peut effectuer la garde à domicile {user_address}
              </h3>
              <div className="leflet-container">
                <LeafletMap key={center.toString()} center={center} zoom={10} children={undefined}>
                  <Marker
                    position={L.latLng(latitude, longitude)}
                    icon={myIcon}
                  >
                    <Popup>
                      <img src={avatarNone} alt="Avatar" />
                      <div>
                        <h2>
                          {firstname} {lastname}
                        </h2>
                      </div>
                    </Popup>
                  </Marker>
                </LeafletMap>
              </div>
              {size && (
                <p className="profil-title">
                  {lastname} garde les animaux de taille :
                </p>
              )}
              <ul>{renderSize()}</ul>
              {accommodation || garden || additionnal_information ? (
                <p className="profil-title">
                  À propos du domicile de {lastname}:
                </p>
              ) : null}
              <ul>
                {accommodation && <li>{accommodation}</li>}
                {garden && <li>{garden}</li>}
                {renderOptions()}
              </ul>
              {walking_duration && (
                <p className="profil-title">Disponibilité de promenade</p>
              )}
              {walking_duration && <p>{walking_duration}</p>}
              {disponibility_date && (
                <p className="profil-title">Disponibilité de {lastname}</p>
              )}
              {disponibility_date && <DateRangeComp />}
            </div>
            <div className="main-profil">
              <h1>
                {firstname} {lastname}
              </h1>
              {description && <p>{description}</p>}
              <AnimalCard
                type={type}
                name={name}
                race={race}
                age={date_birth}
                size={size_animal}
                pipi={walk}
                repa={food}
                energy={energy}
              />
              <Link className="link-animal" to={'/account/animal-form'}>
                <Button prop="Ajoutez votre animal de compagnie" />
              </Link>
            </div>
          </div>
        </div>
      <Footer />
    </div>
  );
}
export default Profil;