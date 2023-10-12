import { useAppDispatch, useAppSelector } from '../../../hooks/redux';
import Header from '../../PageComponents/Header/Header';
import Footer from '../../PageComponents/Footer/Footer';

import './Login.scss';
import React from 'react';

function Login() {
  // Initialize navigation and dispatch

  const dispatch = useAppDispatch();

  return (
    <div className="page-wrapper">
      <Header />
      {/* <Main /> */}
      <main className="main-login">
        <div className="container-login"></div>
      </main>
      <Footer />
    </div>
  );
}

export default Login;
