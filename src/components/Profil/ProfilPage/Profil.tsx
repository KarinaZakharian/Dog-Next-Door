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

import avatar from '../../../assets/Logo-ODogNextDoor.svg';

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

  const renderOptions = () => {
    if (additionnal_information) {
      const infoArray = additionnal_information.split(',');

      return (
        <ul>
          {infoArray.map((item, index) => (
            <li key={index}>{item.trim()}</li>
          ))}
        </ul>
      );
    }
    return null;
  };

  const renderSize = () => {
    if (size) {
      const infoArray = size.split(',');

      return (
        <ul>
          {infoArray.map((item, index) => (
            <li key={index}>{item.trim()}</li>
          ))}
        </ul>
      );
    }
    return null;
  };

  return (
    <div className="page-wrapper">
      <Header />
      <div className="profil-wrapper">
        <div className="container-profil">
          <div className="aside-profil">
            <img className="aside-img" src={avatar} alt="Avatar" />
            <h3 className="profil-title">
              {firstname} peut effectuer la garde à son domicile
            </h3>
            {renderSize()}
            <h3 className="profil-title">
              À propos du domicile du {user_address}
            </h3>
            <ul>
              {accommodation && <li>{accommodation}</li>}
              {garden && <li>{garden}</li>}
              {/* Map through the 'additional options' array and render each option in an <li> element */}
            </ul>
            {renderOptions()}
            <h3 className="profil-title">Disponibilité</h3>
            <DateRangeComp />
          </div>
          <div className="main-profil">
            <h1>
              {firstname} {lastname}
            </h1>
            {description && <p>{description}</p>}
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}

export default Profil;
