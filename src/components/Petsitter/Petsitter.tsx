import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Marker, Popup } from 'react-leaflet';
import L, { LatLngExpression, latLng } from 'leaflet';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { fetchUserById } from '../../store/reducers/sitter';
import LeafletMap from '../PageComponents/LeafletMap/LeafletMap';
import Header from '../PageComponents/Header/Header';
import Footer from '../PageComponents/Footer/Footer';
import DateRangeComp from '../InputType/DatePiker/DateRangeSelect';
import marker from '../../assets/dog-area-blue.png';
import shadow from '../../assets/dog-area-shadow-blur.png';
import Booking from './Booking/Booking';
import AnimalCard from '../Profil/AnimalCard/AnimalCard';
import avatarLogo from '../../assets/Logo-ODogNextDoor-blue.png';
import Button from '../InputType/Button/Button';
import TestimonyCard from '../Profil/Testimonies/Testiamonies';

function Petsitter() {
  const dispatch = useAppDispatch();
  const { id } = useParams();
  useEffect(() => {
    dispatch(fetchUserById(Number(id)));
  }, [dispatch, id]);

  const [isBookingContainerVisible, setIsBookingContainerVisible] =
    useState(false);
  // Function to show the booking container
  const showBookingContainer = () => {
    setIsBookingContainerVisible(true);
  };

  const user = useAppSelector((state) => state.sitter.user);
  const testimonials = useAppSelector((state) => state.sitter.userTestimonials);
  const isLoading = useAppSelector((state) => state.sitter.isLoading);
  console.log(user);
  console.log(testimonials);
  const firstname = user?.lastname;
  const lastname = user?.firstname;
  const address = user?.user_address;
  const avatar = user?.avatar;
  const size = user?.size;
  const description = user?.description;
  const garden = user?.garden;
  const accommodation = user?.accomodation;
  const additionnalInformation = user?.additionnal_information;
  const longitude = user?.longitude;
  const latitude = user?.latitude;
  const typeAnimal = user?.animal?.type;
  const nameAnimal = user?.animal?.name;
  const dateBirthAnimal = user?.animal?.birth_date;
  const sizeAnimalAnimal = user?.animal?.size;
  const walkAnimal = user?.animal?.walk;
  const energyAnimal = user?.animal?.energy;
  const foodAnimal = user?.animal?.mealhours;
  const raceAnimal = user?.animal?.race;
  const disponibilitySitter = user?.disponibility;

  const center: LatLngExpression = latLng(latitude, longitude);
  const account = useAppSelector((state) => state.profil.user.firstname);

  const disponibilityDateUser = useAppSelector(
    (state) => state.profil.user.disponibility
  );
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
        // Assuming 'size' is a string like "Petit (0-7 kg)"
        const sizes = size.split(',');
        return sizes.map((item, index) => <li key={index}>{item}</li>);
      }
      return <li>{size}</li>;
    }
    return null;
  };
  const renderOptions = () => {
    if (
      additionnalInformation !== undefined &&
      additionnalInformation !== null
    ) {
      if (Array.isArray(additionnalInformation)) {
        return additionnalInformation.map((item, index) => (
          <li key={index}>{item}</li>
        ));
      }
      if (typeof additionnalInformation === 'string') {
        const options = additionnalInformation.split(',');
        return options.map((item, index) => <li key={index}>{item}</li>);
      }
      return <li>{additionnalInformation}</li>;
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
            </div>
            <div className="profil__user-card">
              <div className="profil__user-pref">
                <img
                  className="profil__user-pref-img"
                  src={avatar ? `/${avatar}` : avatarLogo}
                  alt="Avatar"
                />
                {description && <p>{description}</p>}
                {size && (
                  <h3 className="profil-title">
                    {firstname} garde les animaux de taille :
                  </h3>
                )}
                <ul>{renderSize()}</ul>
                {walkAnimal && (
                  <h3 className="profil-title">Disponibilité de promenade</h3>
                )}
                {walkAnimal && <p>{walkAnimal}</p>}

                {disponibilitySitter?.end_date && (
                  <h3 className="profil-title">Disponibilité de {lastname}</h3>
                )}
                {disponibilitySitter?.end_date && (
                  <DateRangeComp disponibility={disponibilitySitter} />
                )}
              </div>
              <div className="profil__user-home">
                <h3 className="profil-title">{address}</h3>
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
                {accommodation || garden || additionnalInformation ? (
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
          {/* -----------------------------profil animal------------------------ */}
          <div className="profil__animal-container">
            {typeAnimal && (
              <div className="profil__animal">
                <div className="profil__animal-header">
                  <h2 className="profil__animal-name">
                    Son animal de compagnie
                  </h2>
                </div>
                <AnimalCard
                  type={typeAnimal}
                  name={nameAnimal}
                  race={raceAnimal}
                  age={dateBirthAnimal}
                  size={sizeAnimalAnimal}
                  pipi={walkAnimal}
                  repa={foodAnimal}
                  energy={energyAnimal}
                />
              </div>
            )}
            {account && disponibilitySitter?.end_date ? (
           

           
                <button
                type="button"
                className="booking-button"
                onClick={showBookingContainer}
              >
                Réserver un créneau
              </button>
              
              
            ) : (
              <p className="label-sitter">
                Cet utilisateur n&apos;a pas de disponibilité
              </p>
            )}
            {!account && (
              <Link to="/subscribe">
                <Button prop="Réserver un créneau" />
              </Link>
            )}
            {disponibilitySitter?.end_date && (
              <Booking
                isBookingContainerVisible={isBookingContainerVisible}
                setIsBookingContainerVisible={setIsBookingContainerVisible}
                disponibility_date={disponibilitySitter}
                id={id}
              />
            )}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
export default Petsitter;
