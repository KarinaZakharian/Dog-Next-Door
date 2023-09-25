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
        <NavLink to="/">
          <img className="menu__logo" src={mainLogo} alt="main-logo" />
        </NavLink>

        {name && (
          <div className="menu__nav-wrapper">
            <div className="menu__nav-menu">
              <NavLink className="menu__menu-item" to="/profil">
                Profil
              </NavLink>
              <NavLink className="menu__menu-item" to="/index">
                Boite de reception
              </NavLink>
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
            <NavLink className="menu__menu-item" to="/subscribe">
              Login
            </NavLink>
            <NavLink className="menu__menu-item" to="/login">
              Singup
            </NavLink>
          </div>
        )}
      </nav>
    </div>
  );
}

export default Header;
