import { SetStateAction, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../../hooks/redux';
import { fetchUser } from '../../../store/reducers/profil';

import L, { LatLngExpression, latLng } from 'leaflet';
import { Marker, Popup } from 'react-leaflet';
import LeafletMap from '../../PageComponents/LeafletMap/LeafletMap';

import Header from '../../PageComponents/Header/Header';
import Footer from '../../PageComponents/Footer/Footer';
import DateRangeComp from '../../InputType/DatePiker/DateRangeSelect';
import Button from '../../InputType/Button/Button';
import AnimalCard from '../AnimalCard/AnimalCard';

import marker from '../../../assets/dog-area-blue.png';
import shadow from '../../../assets/dog-area-shadow-blur.png';
import avatarLogo from '../../../assets/Logo-ODogNextDoor-blue.png';
import './Profil.scss';
import SignupForm from '../ProfilForm/SignupForm';
import ProfilForm from '../ProfilForm/ProfilForm';
import DateForm from '../ProfilForm/DateForm';
import pencilIcon from '../../../assets/pencil-white-64.png';
import calendarIcon from '../../../assets/Calendar-Icon.png';

function Profil() {
  const dispatch = useAppDispatch();

  const [isSignupContainerVisible, setIsSignupContainerVisible] =
    useState(false);

  const [isFormContainerVisible, setIsFormContainerVisible] = useState(false);

  const [isDateContainerVisible, setIsDateContainerVisible] = useState(false);
  // Function to show the booking container
  const showSignupContainer = () => {
    setIsSignupContainerVisible(true);
  };

  const showFormContainer = () => {
    setIsFormContainerVisible(true);
  };

  const showDateContainer = () => {
    setIsDateContainerVisible(true);
  };

  useEffect(() => {
    dispatch(fetchUser());
  }, []);

  const firstname = useAppSelector((state) => state.profil.firstname);
  const lastname = useAppSelector((state) => state.profil.lastname);
  const avatar = useAppSelector((state) => state.profil.avatar);
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
  const disponibility = useAppSelector((state) => state.profil.disponibility);
  //console.log(disponibility);
  // console.log(size, description, garden, accommodation);
  const type = useAppSelector((state) => state.profil.animal);
  const name = useAppSelector((state) => state.profil.name);
  const date_birth = useAppSelector((state) => state.profil.date_birth);
  const size_animal = useAppSelector((state) => state.profil.size);
  const walk = useAppSelector((state) => state.profil.walk);
  const energy = useAppSelector((state) => state.profil.energy);
  const food = useAppSelector((state) => state.profil.mealhours);
  const race = useAppSelector((state) => state.profil.race);
  // console.log(longitude, latitude);
  const center: LatLngExpression = latLng(latitude, longitude);
  const myIcon = new L.Icon({
    iconUrl: marker,
    iconRetinaUrl: marker,
    shadowUrl: shadow,
    popupAnchor: [-0, -0],
    iconSize: [28, 40],
    shadowSize: [35, 40],
    shadowAnchor: [3, 17],
  });

  const renderSize = () => {
    if (size !== undefined && size !== null) {
      if (Array.isArray(size)) {
        return size.map((item, index) => <li key={index}>{item}</li>);
      } else if (typeof size === 'string') {
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
      <div className="profil__wrapper">
        <div className="profil__container">
          {/* -----------------------------profil user-------------------------- */}
          <div className="profil__user">
            <div className="profil__user-header">
              <h2 className="profil__user-name">
                {firstname} {lastname}
              </h2>
              <div className="profil__user-header-button">
                <img
                  src={pencilIcon}
                  alt="pencil white"
                  className="profil__user-header-button-img"
                  onClick={showSignupContainer}
                />
              </div>
            </div>
            <div className="profil__user-card">
              <div className="profil__user-header-button">
                <img
                  src={pencilIcon}
                  alt="pencil white"
                  className="profil__user-header-button-img"
                  onClick={showFormContainer}
                />
              </div>
              <div className="profil__user-pref">
                <img
                  className="profil__user-pref-img"
                  src={avatar ? avatar : avatarLogo}
                  alt="Avatar"
                />
                {description && <p>{description}</p>}
                {size && (
                  <h3 className="profil-title">
                    {firstname} garde les animaux de taille :
                  </h3>
                )}
                <ul>{renderSize()}</ul>
                {walking_duration && (
                  <h3 className="profil-title">Disponibilité de promenade</h3>
                )}
                {walking_duration && <p>{walking_duration}</p>}
              </div>

              <div className="profil__user-home">
                {longitude && (
                  <div className="leflet-container">
                    <LeafletMap
                      key={center.toString()}
                      center={center}
                      zoom={13}
                    >
                      <Marker
                        position={L.latLng(latitude, longitude)}
                        icon={myIcon}
                      >
                        <Popup>
                          <img src={avatarLogo} alt="Avatar" />
                          <div>
                            <h2>
                              {firstname} {lastname}
                            </h2>
                          </div>
                        </Popup>
                      </Marker>
                    </LeafletMap>
                  </div>
                )}
                {accommodation || garden || additionnal_information ? (
                  <h3 className="profil-title">
                    À propos du domicile de {firstname}:
                  </h3>
                ) : null}
                <ul>
                  {accommodation && <li>{accommodation}</li>}
                  {garden && <li>{garden}</li>}
                  {renderOptions()}
                </ul>
              </div>
            </div>
          </div>
          {/* -------------------------------booking---------------------------- */}
          <div className="profil__booking">
            <div className="profil__booking-header">
              <h2 className="profil__booking-title">Mes disponibilités</h2>
            </div>
            <div className="profil__booking-card">
              <div className="profil__booking-button">
                <h3 className="profil__booking-button-title">
                  Ajouter une disponibilité
                </h3>
                <div className="profil__user-header-button">
                  <img
                    src={calendarIcon}
                    alt="pencil white"
                    className="profil__user-header-button-img"
                    onClick={showDateContainer}
                  />
                </div>
              </div>
              <div className="profil__booking-disponibility">
                {disponibility ? (
                  <div className="profil__booking-disponibility">
                    <h3 className="profil-title">
                      Disponibilité de {firstname}:
                    </h3>
                    <DateRangeComp disponibility={disponibility} />
                  </div>
                ) : (
                  <div className="profil__booking-disponibility-noresult">
                    <h2 className="profil__booking-disponibility-noresult-title">
                      Pas de disponibilité...
                    </h2>
                  </div>
                )}
              </div>
            </div>
            {/* -----------------------------popup form--------------------------- */}
            <SignupForm
              isSignupContainerVisible={isSignupContainerVisible}
              setIsSignupContainerVisible={setIsSignupContainerVisible}
            />
            <ProfilForm
              isFormContainerVisible={isFormContainerVisible}
              setIsFormContainerVisible={setIsFormContainerVisible}
            />

            <DateForm
              isDateContainerVisible={isDateContainerVisible}
              setIsDateContainerVisible={setIsDateContainerVisible}
            />
          </div>
          {/* -----------------------------profil animal------------------------ */}
          <div className="profil__animal">
            <div className="profil__animal-header">
              <h2 className="profil__animal-name">Mon animal de compagnie</h2>
            </div>
            {type ? (
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
            ) : (
              <Link className="link-animal" to={'/account/animal-form'}>
                <Button prop="Ajoutez votre animal de compagnie" />
              </Link>
            )}
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}

export default Profil;
