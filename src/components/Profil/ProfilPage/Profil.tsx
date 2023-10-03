/* eslint-disable prettier/prettier */
import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import swal from 'sweetalert';
import { success, fillProfilForm } from '../../../store/reducers/profil-form';
import Header from '../../PageComponents/Header/Header';
import Footer from '../../PageComponents/Footer/Footer';
import DateRangeComp from '../../InputType/DatePiker/DateRangeSelect';
import './Profil.scss';
import { useAppSelector } from '../../../hooks/redux';

function Profil() {
  const firstname = useAppSelector((state) => state.login.firstname);
  const lastname = useAppSelector((state) => state.login.lastname);
  const city = useAppSelector((state) => state.login.city);
  const size = useAppSelector((state) => state.profilForm.size);
  const description = useAppSelector((state) => state.profilForm.description);
  const accommodation = useAppSelector(
    (state) => state.profilForm.accommodation
  );
  const additionalOptions = useAppSelector(
    (state) => state.profilForm.additionalOptions
  );
  return (
    <div className="page-wrapper">
      <Header />

      <div className="container">
        <div className="aside">
          <img></img>
          <h1>
            {firstname} {lastname}
          </h1>
          <h3> {firstname} peut effectuer la garde à son domicile</h3>
          <ul></ul>
          <h3>À propos du domicile de {firstname}</h3>
          <ul>
            <li></li>
            <li></li>
            <li></li>
          </ul>
        </div>
        <div className="main"></div>
      </div>
      <Footer />
    </div>
  );
}

export default Profil;
