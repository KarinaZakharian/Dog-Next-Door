import { NavLink } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import './Header.scss';
import mainLogo from '../../../assets/Logo-ODogNextDoor.svg';

import { useAppDispatch, useAppSelector } from '../../../hooks/redux';

import { logout } from '../../../store/reducers/login';
import Humburger from './Humburger/Humburger';

function Header() {
  const firstname = useAppSelector((state) => state.login.firstname);
  // const firstname = 'karina';

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    navigate('/login', { replace: true });
  };
  return (
    <div className="wrapper">
      <Humburger />
      <nav className="menu">
        <div className="visible-wrapper">
          <NavLink to="/">
            <img className="menu__logo" src={mainLogo} alt="main-logo" />
          </NavLink>
          <NavLink className="menu__menu-item" to="/search">
            Search
          </NavLink>
        </div>
        <NavLink className="menu__menu-item" to="/account/inbox">
          Boite de reception
        </NavLink>
        {firstname && (
          <div className="menu__nav-wrapper">
            <div className="menu__nav-menu">
              <NavLink className="menu__menu-item" to="/account">
                Profil
              </NavLink>
              <NavLink className="menu__menu-item" to="/account/form">
                Profil form
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
              Connexion
            </NavLink>
            <NavLink className="menu__menu-item" to="/subscribe">
              S&apos;inscrire
            </NavLink>
          </div>
        )}
      </nav>
    </div>
  );
}

export default Header;
