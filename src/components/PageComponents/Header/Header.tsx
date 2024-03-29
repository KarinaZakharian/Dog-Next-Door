import { NavLink, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import swal from 'sweetalert';
import { useAppDispatch, useAppSelector } from '../../../hooks/redux';

import { logout, success } from '../../../store/reducers/profil';
import Humburger from './Humburger/Humburger';

import searchIcon from '../../../assets/search-blue.png';
import inboxIcon from '../../../assets/inbox-96.png';
import mainLogo from '../../../assets/Logo-ODogNextDoor-blue.png';
import './Header.scss';

function Header() {
  const firstname = useAppSelector((state) => state.profil.user.firstname);
  const logoutMessage = useAppSelector(
    (state) => state.profil.user.logoutMessage
  );

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
  };

  useEffect(() => {
    if (logoutMessage) {
      swal(`${logoutMessage}`, {
        icon: 'success',
        timer: 1000,
      });
      setTimeout(() => {
        navigate('/login', { replace: true });
        dispatch(success());
      }, 1000);
    }
  }, [logoutMessage, dispatch]);
  return (
    <div className="wrapper">
      <Humburger />
      <nav className="menu">
        <div className="visible-wrapper">
          <NavLink to="/">
            <img className="menu__logo" src={mainLogo} alt="main-logo" />
          </NavLink>
          <h2 className="menu__title-1">O</h2>
          <h1 className="menu__title-2">&apos;Dog Next Door</h1>
        </div>
        <div className="header__menu-right">
          <NavLink className="menu__menu-item" to="/search">
            <img className="menu-icon" src={searchIcon} alt="search icon" />
          </NavLink>
          {firstname && (
            <div className="menu__nav-wrapper">
              <div className="menu__menu-connection">
                <NavLink className="menu__menu-item" to="/inbox/awaiting">
                  <img className="menu-icon" src={inboxIcon} alt="inbox icon" />
                </NavLink>
                <NavLink className="menu__menu-item" to="/account">
                  {firstname}
                </NavLink>
                <button
                  className="menu__menu-button"
                  type="button"
                  onClick={handleLogout}
                >
                  Se déconnecter
                </button>
              </div>
            </div>
          )}
          {!firstname && (
            <div className="menu__nav-menu">
              <NavLink className="menu__menu-item" to="/login">
                Connexion
              </NavLink>
              <NavLink className="menu__menu-item" to="/subscribe">
                S&apos;inscrire
              </NavLink>
            </div>
          )}
        </div>
      </nav>
    </div>
  );
}

export default Header;
