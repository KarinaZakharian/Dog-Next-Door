/* eslint-disable prettier/prettier */
import { NavLink } from 'react-router-dom';
import Button from '../InputType/Button/Button';
import './Header.scss';

const name = 'karina';

function Header() {
  return (
    <div className="container">
      <nav className="menu">
        <div className="menu__logo">Image</div>

        {name && (
          <div className="menu__nav-wrapper">
            <div className="menu__nav-menu">
              <div className="menu__menu-item">Profil</div>
              <div className="menu__menu-item">Boire de reception</div>
            </div>
            <div className="menu__menu-connection">
              <strong>{name}</strong>
              <Button prop="Se déconnecter" />
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
