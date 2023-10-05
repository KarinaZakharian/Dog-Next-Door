import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import swal from 'sweetalert';
import { success, fillProfilForm } from '../../../store/reducers/profil-form';
import Header from '../../PageComponents/Header/Header';
import Footer from '../../PageComponents/Footer/Footer';
import DateRangeComp from '../../InputType/DatePiker/DateRangeSelect';
import './Profil.scss';
import { useAppDispatch, useAppSelector } from '../../../hooks/redux';

// import avatar from '../../../assets/icons8-avatar-100.png';

function Profil() {
  const firstname = useAppSelector((state) => state.login.firstname);
  const lastname = useAppSelector((state) => state.login.lastname);
  const user_address = useAppSelector((state) => state.login.user_address);
  const size = useAppSelector((state) => state.login.animal_size);
  const description = useAppSelector((state) => state.login.description);
  const garden = useAppSelector((state) => state.login.garden);
  const accommodation = useAppSelector((state) => state.login.accomodation);
  const additionnal_information = useAppSelector(
    (state) => state.login.additionnal_information
  );

  console.log(
    'accomodation',
    accommodation,
    'size',
    size,
    'description',
    description,
    'garden',
    garden,
    'options',
    additionnal_information,
    'city',
    user_address
  );

  const renderSize = () => {
    if (size) {
      if (Array.isArray(size)) {
        return size.map((item, index) => <li key={index}>{item}</li>);
      } else {
        return <li>{size}</li>;
      }
    }
    return null;
  };

  const renderOptions = () => {
    if (additionnal_information) {
      if (Array.isArray(additionnal_information)) {
        return additionnal_information.map((item, index) => (
          <li key={index}>{item}</li>
        ));
      } else {
        return <li>{additionnal_information}</li>;
      }
    }
    return null;
  };

  return (
    <div className="page-wrapper">
      <Header />

      <div className="container">
        <div className="aside">
          <h1>
            {firstname} {lastname}
          </h1>
          <h3> {firstname} peut effectuer la garde à son domicile</h3>
          <ul>{renderSize()}</ul>
          <h3>À propos du domicile du {user_address}</h3>
          <ul>
            {accommodation && <li>{accommodation}</li>}
            {garden && <li>{garden}</li>}
            {/* Map through the 'additional options' array and render each option in an <li> element */}
            {renderOptions()}
          </ul>
          <div className="main">{description && <p>{description}</p>}</div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Profil;
