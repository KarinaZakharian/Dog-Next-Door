import React, { useCallback, useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';

import { useAppDispatch, useAppSelector } from '../../../../hooks/redux';
import { logout } from '../../../../store/reducers/profil';
import mainLogo from '../../../../assets/Logo-ODogNextDoor-blue.png';

import './Humburger.scss';

function Humburger() {
  const firstname = useAppSelector((state) => state.profil.user.firstname);
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

  // Add a keyboard listener for Enter key press
  const handleKeyPress = useCallback(
    (e: React.KeyboardEvent<HTMLDivElement>) => {
      if (e.key === 'Enter') {
        setIsMenuOpen(!isMenuOpen);
      }
    },
    [isMenuOpen]
  );

  return (
    <div
      className="menuHumburger"
      onClick={handleMenuClick}
      onKeyDown={handleKeyPress}
      role="button"
      tabIndex={0}
    >
      <div className={`menu-bar ${isMenuOpen ? 'change' : ''}`}>
        <div id="bar1" className={`bar ${isMenuOpen ? 'change' : ''}`} />
        <div id="bar2" className={`bar ${isMenuOpen ? 'change' : ''}`} />
        <div id="bar3" className={`bar ${isMenuOpen ? 'change' : ''}`} />
      </div>
      <nav className={`nav ${isMenuOpen ? 'change-nav' : ''}`}>
        {/* Additional navigation links */}
        {isMenuOpen && firstname ? (
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
            <NavLink className="menu-item" to="/inbox/awaiting">
              Boite de reception
            </NavLink>
            <NavLink className="menu-item" to="/search">
              Recherche
            </NavLink>
          </>
        ) : (
          <>
            <NavLink className="menu-item" to="/">
              Accueil
            </NavLink>
            <NavLink className="menu-item" to="/search">
              Recherche
            </NavLink>
            <NavLink className="menu-item" to="/login">
              Connexion
            </NavLink>
            <NavLink className="menu-item" to="/subscribe">
              S&apos;inscrire
            </NavLink>
          </>
        )}
      </nav>
      <div
        id="menu-bg"
        className={`menu-bg ${isMenuOpen ? 'change-bg' : ''}`}
      />
      <NavLink to="/">
        <img className="menu__logo" src={mainLogo} alt="main-logo" />
      </NavLink>
    </div>
  );
}

export default Humburger;
