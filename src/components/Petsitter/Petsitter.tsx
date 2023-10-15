import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { fetchUserById } from '../../store/reducers/sitter';
import L, { LatLngExpression, latLng } from 'leaflet';
import { Marker, Popup } from 'react-leaflet';
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
import { UserProps } from '../../@types/user';
function Petsitter() {
  const dispatch = useAppDispatch();
  const { id } = useParams();
  useEffect(() => {
    dispatch(fetchUserById(Number(id)));
  }, [id]);

  const [isBookingContainerVisible, setIsBookingContainerVisible] =
    useState(false);
  // Function to show the booking container
  const showBookingContainer = () => {
    setIsBookingContainerVisible(true);
  };

  const user = useAppSelector((state) => state.sitter.user);
  console.log(user);
  const firstname = user?.lastname;
  const lastname = user?.firstname;
  const avatar = user?.avatar;
  const size = user?.size;
  const description = user?.description;
  const garden = user?.garden;
  const accommodation = user?.accomodation;
  const additionnal_information = user?.additionnal_information;
  const longitude = user?.longitude;
  const latitude = user?.latitude;
  const typeAnimal = user?.animal?.type;
  const nameAnimal = user?.animal?.name;
  const date_birthAnimal = user?.animal?.birth_date;
  const size_animalAnimal = user?.animal?.size;
  const walkAnimal = user?.animal?.walk;
  const energyAnimal = user?.animal?.energy;
  const foodAnimal = user?.animal?.mealhours;
  const raceAnimal = user?.animal?.race;
  const disponibility_Sitter = user?.disponibility;
  const booking_start = user?.booking?.start_date;
  const booking_end = user?.booking?.end_date;
  console.log('sitter booking taken', booking_end, booking_start);

  const center: LatLngExpression = latLng(latitude, longitude);
  const account = useAppSelector((state) => state.login.firstname);

  const disponibility_dateUser = useAppSelector(
    (state) => state.profil.disponibility
  );
  console.log('user dispo', disponibility_dateUser);
  console.log('sitter dispo', disponibility_Sitter);
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
            </div>
            <div className="profil__user-card">
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
                {walkAnimal && (
                  <h3 className="profil-title">Disponibilité de promenade</h3>
                )}
                {walkAnimal && <p>{walkAnimal}</p>}

                {disponibility_Sitter && (
                  <h3 className="profil-title">Disponibilité de {lastname}</h3>
                )}
                {disponibility_Sitter && (
                  <DateRangeComp disponibility={disponibility_Sitter} />
                )}
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
          {/* -----------------------------profil animal------------------------ */}

          {typeAnimal && (
            <div className="profil__animal">
              <div className="profil__animal-header">
                <h2 className="profil__animal-name">Son animal de compagnie</h2>
              </div>
              <AnimalCard
                type={typeAnimal}
                name={nameAnimal}
                race={raceAnimal}
                age={date_birthAnimal}
                size={size_animalAnimal}
                pipi={walkAnimal}
                repa={foodAnimal}
                energy={energyAnimal}
              />
            </div>
          )}

          {account && disponibility_Sitter && (
            <button onClick={showBookingContainer}>Booking</button>
          )}
          {!account && (
            <Link to={'/subscribe'}>
              <Button prop="Booking" />
            </Link>
          )}
        </div>
      </div>
      {disponibility_Sitter && (
        <Booking
          isBookingContainerVisible={isBookingContainerVisible}
          setIsBookingContainerVisible={setIsBookingContainerVisible}
          disponibility_date={disponibility_Sitter}
          id={id}
          bookingNotAvailibleStart={booking_start}
          bookingNotAvailibleEnd={booking_end}
        />
      )}

      <Footer />
    </div>
  );
}
export default Petsitter;
