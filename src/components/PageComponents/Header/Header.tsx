/* eslint-disable prettier/prettier */
import { NavLink } from 'react-router-dom';
import './Header.scss';
import mainLogo from '../../../assets/Logo-ODogNextDoor.svg';

import { useAppDispatch, useAppSelector } from '../../../hooks/redux';

import { logout } from '../../../store/reducers/login';

function Header() {
  const firstname = useAppSelector((state) => state.login.firstname);
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

        {firstname && (
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
              <strong>{firstname}</strong>
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
              Login
            </NavLink>
            <NavLink className="menu__menu-item" to="/subscribe">
              Singup
            </NavLink>
          </div>
        )}
      </nav>
    </div>
  );
}

export default Header;
