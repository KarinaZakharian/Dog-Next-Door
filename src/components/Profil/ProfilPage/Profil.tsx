/* eslint-disable prettier/prettier */
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import swal from 'sweetalert';
import { success, fillProfilForm } from '../../../store/reducers/profil-form';
import Header from '../../PageComponents/Header/Header';
import Footer from '../../PageComponents/Footer/Footer';

function Profil() {
  return (
    <div className="page-wrapper">
      <Header />

      <main className="main">
        <div className="container">
          <div className="aside">
            <img className="aside__img" alt="profil-image"></img>
            <h1 className="aside-title">Karina Zakharian</h1>
          </div>
          <div className="main-content"></div>{' '}
        </div>
      </main>
      <Footer />
    </div>
  );
}

export default Profil;
