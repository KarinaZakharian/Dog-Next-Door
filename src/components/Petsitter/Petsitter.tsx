import { Link, useNavigate, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import Header from '../../components/PageComponents/Header/Header';
import Footer from '../../components/PageComponents/Footer/Footer';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { fetchUserById } from '../../store/reducers/sitter';
import avatar from '../../assets/Logo-ODogNextDoor.svg';
import DateRangeComp from '../InputType/DatePiker/DateRangeSelect';
import Button from '../InputType/Button/Button';
import L, { LatLngExpression, latLng, LatLngLiteral } from 'leaflet';
import { Marker, Popup } from 'react-leaflet';
import marker from '../../assets/dog-area.png';
import shadow from '../../assets/dog-area-shadow.png';
import LeafletMap from '../PageComponents/LeafletMap/LeafletMap';
import Booking from './Booking/Booking';
function Petsitter() {
  const [isBookingContainerVisible, setIsBookingContainerVisible] =
    useState(false);

  // Function to show the booking container
  const showBookingContainer = () => {
    setIsBookingContainerVisible(true);
  };

  const dispatch = useAppDispatch();
  const { id } = useParams();
  console.log(id);
  useEffect(() => {
    dispatch(fetchUserById(Number(id)));
  }, [id]);
  // const account = useAppSelector((state) => state.login.firstname);
  const account = 'karina';
  const user = useAppSelector((state) => state.sitter.user);
  console.log('petsitter', user);
  const firstname = user?.lastname;
  const lastname = user?.firstname;
  const user_address = user?.user_address;
  const size = user?.size;
  const description = user?.description;
  const garden = user?.garden;
  const accommodation = user?.accomodation;
  const additionnal_information = user?.additional_information;
  const disponibilite = user?.disponibility_date;
  const longitude = user?.longitude;
  const latitude = user?.latitude;
  const center: LatLngExpression = latLng(latitude, longitude);
  const myIcon = new L.Icon({
    iconUrl: marker,
    iconRetinaUrl: marker,
    shadowUrl: shadow,
    popupAnchor: [-0, -0],
    iconSize: [40, 40],
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
            <img className="main-img" src={avatar} />
            <h3 className="profil-title">
              {lastname} peut effectuer la garde à son domicile
            </h3>
            <ul>{renderSize()}</ul>
            <h3 className="profil-title">À propos du domicile du {lastname}</h3>
            <ul>
              {accommodation && <li>{accommodation}</li>}
              {garden && <li>{garden}</li>}
              {/* Map through the 'additional options' array and render each option in an <li> element */}
              {renderOptions()}
            </ul>
            <h3 className="profil-title">Disponibilité de {lastname}</h3>
            {disponibilite && <DateRangeComp />}
          </div>
          <div className="main-profil">
            <h1>
              {firstname} {lastname}
            </h1>
            {description && <p>{description}</p>}
            {latitude && (
              <div className="leflet-container">
                <LeafletMap
                  key={center.toString()}
                  center={center}
                  zoom={15}
                  children={undefined}
                >
                  <Marker
                    position={L.latLng(latitude, longitude)}
                    icon={myIcon}
                  >
                    <Popup>
                      <img src={avatar} alt="Avatar" />
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
            {account && <button onClick={showBookingContainer}>Booking</button>}
            {!account && (
              <Link to={'/subscribe'}>
                <Button prop="Booking" />
              </Link>
            )}
          </div>
        </div>
      </div>
      <Booking
        isBookingContainerVisible={isBookingContainerVisible}
        setIsBookingContainerVisible={setIsBookingContainerVisible}
      />
      <Footer />
    </div>
  );
}
export default Petsitter;
