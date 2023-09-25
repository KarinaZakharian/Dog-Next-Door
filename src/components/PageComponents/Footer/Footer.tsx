/* eslint-disable prettier/prettier */
import { NavLink } from 'react-router-dom';
import './Footer.scss';

function Footer() {
  return (
    <div className="footer__wrapper">
      <div className="footer__container">
        <div className="footer__nav-menu">
          <div className="footer__nav-menu-item">About Us</div>
          <div className="footer__nav-menu-item">Need Help?</div>
        </div>
        <div className="footer__rights">All Rights Reserved</div>
      </div>
    </div>
  );
}

export default Footer;
