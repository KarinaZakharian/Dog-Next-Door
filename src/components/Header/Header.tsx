/* eslint-disable prettier/prettier */
import { NavLink } from 'react-router-dom';
import Button from '../InputType/Button/Button';
import './Header.scss';
import mainLogo from '../../assets/Logo-ODogNextDoor.svg';

const name = 'karina';

function Header() {
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
              <button className="menu__menu-button" type="submit">
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
