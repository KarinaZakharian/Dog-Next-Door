/* eslint-disable prettier/prettier */
import { NavLink } from 'react-router-dom';
import './Header.scss';
import mainLogo from '../../../assets/Logo-ODogNextDoor.svg';

import { useAppDispatch, useAppSelector } from '../../../hooks/redux';

import { logout } from '../../../store/reducers/login';

function Header() {
  const name = useAppSelector((state) => state.login.name);
  const dispatch = useAppDispatch();

  const handleLogout = () => {
    dispatch(logout());
  };
  return (
    <div className="wrapper">
      <nav className="menu">
        <img className="menu__logo" src={mainLogo} alt="main-logo" />

        {name && (
          <div className="menu__nav-wrapper">
            <div className="menu__nav-menu">
              <div className="menu__menu-item">Profil</div>
              <div className="menu__menu-item">Boite de reception</div>
            </div>
            <div className="menu__menu-connection">
              <strong>{name}</strong>
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

        {!name && (
          <div className="menu__nav-menu">
            <div className="menu__menu-item">Login</div>
            <div className="menu__menu-item">Singup</div>
          </div>
        )}
      </nav>
    </div>
  );
}

export default Header;
