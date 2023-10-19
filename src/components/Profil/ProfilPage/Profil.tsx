import { useEffect, useState } from 'react';

import { Link } from 'react-router-dom';
import L, { LatLngExpression, latLng } from 'leaflet';
import { Marker, Popup } from 'react-leaflet';
import { useAppDispatch, useAppSelector } from '../../../hooks/redux';
import { fetchUser } from '../../../store/reducers/profil';

import LeafletMap from '../../PageComponents/LeafletMap/LeafletMap';

import Header from '../../PageComponents/Header/Header';
import Footer from '../../PageComponents/Footer/Footer';
import DateRangeComp from '../../InputType/DatePiker/DateRangeSelect';
import Button from '../../InputType/Button/Button';
import AnimalCard from '../AnimalCard/AnimalCard';

import marker from '../../../assets/dog-area-blue.png';
import shadow from '../../../assets/dog-area-shadow-blur.png';
import avatarLogo from '../../../assets/Logo-ODogNextDoor-blue.png';
import SignupForm from '../ProfilForm/SignupForm';
import ProfilForm from '../ProfilForm/ProfilForm';
import DateForm from '../ProfilForm/DateForm';
import pencilIcon from '../../../assets/pencil-white-64.png';
import calendarIcon from '../../../assets/Calendar-Icon.png';
import Main from '../../PageComponents/Main/Main';
import './Profil.scss';

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
  }, [dispatch]);

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
  const animal = useAppSelector((state) => state.profil.animal);

  // Access specific properties within the 'animal' object
  const type = animal?.type || null;
  const name = animal?.name || null;
  const date_birth = animal?.birth_date || null;
  const size_animal = animal?.size || null;
  const walk = animal?.walk || null;
  const energy = animal?.energy || null;
  const food = animal?.mealhours || null;
  const race = animal?.race || null;
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
      }
      if (typeof size === 'string') {
        const sizes = size.split(',');
        return sizes.map((item, index) => <li key={index}>{item}</li>);
      }
      return <li>{size}</li>;
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
      }
      if (typeof additionnal_information === 'string') {
        const options = additionnal_information.split(',');
        return options.map((item, index) => <li key={index}>{item}</li>);
      }
      return <li>{additionnal_information}</li>;
    }
    return null;
  };
  // console.log('user description', description);

  return (
    <div className="page-wrapper">
      <Header />
      <Main>
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
                    src={avatar ? `/${avatar}` : avatarLogo}
                    alt="Avatar"
                  />
                  {description && (
                    <blockquote>
                      <p>{description}</p>
                    </blockquote>
                  )}
                  {size && (
                    <h3 className="profil-title">
                      {firstname} garde les animaux de taille :
                    </h3>
                  )}
                  {size && <ul>{renderSize()}</ul>}
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
                  {disponibility?.end_date && (
                    <div className="profil__booking-disponibility">
                      <h3 className="profil-title">
                        Disponibilité de {firstname}:
                      </h3>
                      <DateRangeComp disponibility={disponibility} />
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
                <Link className="link-animal" to="/account/animal-form">
                  <Button prop="Ajoutez votre animal de compagnie" />
                </Link>
              )}
            </div>
          </div>
        </div>
      </Main>
      <Footer />
    </div>
  );
}

export default Profil;
