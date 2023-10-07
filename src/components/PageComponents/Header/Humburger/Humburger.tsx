import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

import { useAppDispatch, useAppSelector } from '../../../../hooks/redux';
import { logout } from '../../../../store/reducers/login';
import mainLogo from '../../../../assets/Logo-ODogNextDoor.svg';

import './Humburger.scss';

function Humburger() {
  //const firstname = useAppSelector((state) => state.login.firstname);
  const firstname = 'karina';
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleMenuClick = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleLogout = () => {
    dispatch(logout());
    navigate('/login', { replace: true });
  };

  return (
    <div className="menu" onClick={handleMenuClick}>
      <div className={`menu-bar ${isMenuOpen ? 'change' : ''}`}>
        <div id="bar1" className={`bar ${isMenuOpen ? 'change' : ''}`}></div>
        <div id="bar2" className={`bar ${isMenuOpen ? 'change' : ''}`}></div>
        <div id="bar3" className={`bar ${isMenuOpen ? 'change' : ''}`}></div>
      </div>
      <nav className={`nav ${isMenuOpen ? 'change-nav' : ''}`}>
        {/* Additional navigation links */}
        {isMenuOpen && firstname && (
          <>
            <button
              className="menu-button"
              type="button"
              onClick={handleLogout}
            >
              Se déconnecter
            </button>
            <NavLink className="menu-item" to="/account">
              Profil
            </NavLink>
            <NavLink className="menu-item" to="/account/form">
              Profil form
            </NavLink>
            <NavLink className="menu-item" to="/index">
              Boite de reception
            </NavLink>
          </>
        )}
        <NavLink className="menu-item" to="/">
          Home
        </NavLink>
        <NavLink className="menu-item" to="/search">
          Search
        </NavLink>
        <NavLink className="menu-item" to="/login">
          Connexion
        </NavLink>
        <NavLink className="menu-item" to="/subscribe">
          S&apos;inscrire
        </NavLink>
      </nav>
      <div
        id="menu-bg"
        className={`menu-bg ${isMenuOpen ? 'change-bg' : ''}`}
      ></div>
      <NavLink to="/">
        <img className="menu__logo" src={mainLogo} alt="main-logo" />
      </NavLink>
    </div>
  );
}

export default Humburger;
