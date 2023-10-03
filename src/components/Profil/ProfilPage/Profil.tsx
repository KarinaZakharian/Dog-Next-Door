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
        <div className="container"></div>
      </main>
      <Footer />
    </div>
  );
}

export default Profil;
