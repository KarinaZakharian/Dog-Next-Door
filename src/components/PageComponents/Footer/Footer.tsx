import { Link } from 'react-router-dom';
import './Footer.scss';
import logo from '../../../assets/Logo-ODogNextDoor.svg';
import insta from '../../../assets/instagram-logo.png';
import facebook from '../../../assets/Facebook-logo.png';
import pinterest from '../../../assets/Pinterest-Logo.png';
import { useAppSelector } from '../../../hooks/redux';

function Footer() {
  const firstname = useAppSelector((state) => state.login.firstname);

  return (
    <div className="footer__wrapper">
      <div className="footer__container">
        <div className="footer__section-icon">
          <div className="footer__section-icon-logo">
            <img
              src={logo}
              alt="logo"
              className="footer__section-icon-logo-img"
            />
            <h5 className="footer__section-icon-logo">O'Dog Next Door</h5>
          </div>
          <div className="footer__section-icon-logo-social">
            <Link to="https://www.facebook.com/">
              <img src={facebook} alt="logo facebook" />
            </Link>
            <Link to="https://www.pinterest.fr/">
              <img src={pinterest} alt="logo pinterest" />
            </Link>
            <Link to="https://www.instagram.com/">
              <img src={insta} alt="logo instagram" />
            </Link>
          </div>
          <div className="footer__section-logo-social"></div>
        </div>
        <div className="footer__section-utils">
          <h3>Liens utiles</h3>
          <ul className="footer__section-list">
            <li>
              <Link className="footer__section-link" to="/">
                Collectif des pet sitters de France
              </Link>
            </li>
            <li>
              <Link className="footer__section-link" to="/">
                VetoAdom
              </Link>
            </li>
            <li>
              <Link className="footer__section-link" to="/">
                La SPA
              </Link>
            </li>
            <li>
              <Link className="footer__section-link" to="/mentions-legales">
                Arche association
              </Link>
            </li>
          </ul>
        </div>
        <div className="footer__section-sitemap">
          <h3>Plan du site</h3>
          <ul className="footer__section-list">
            <li>
              <Link className="footer__section-link" to="/">
                Accuel
              </Link>
            </li>
            <li>
              <Link className="footer__section-link" to="/search">
                Recherche
              </Link>
            </li>
            <li>
              <Link className="footer__section-link" to="/login">
                Connection
              </Link>
            </li>
            <li>
              <Link className="footer__section-link" to="/subscribe">
                S'incrire
              </Link>
            </li>
            <li>
              <Link className="footer__section-link" to="/contact">
                Contact
              </Link>
            </li>
            <li>
              <Link className="footer__section-link" to="/about">
                A propos
              </Link>
            </li>
          </ul>
        </div>
        {firstname && (
          <div className="footer__section-myAccount">
            <h3>Mon compte</h3>
            <ul className="footer__section-list">
              <li>
                <Link className="footer__section-link" to="/account">
                  Mon profil
                </Link>
              </li>
              <li>
                <Link className="footer__section-link" to="/inbox/awaiting">
                  Ma boîte de réception
                </Link>
              </li>
              <li>
                <Link className="footer__section-link" to="/logout">
                  Se déconnecter
                </Link>
              </li>
            </ul>
          </div>
        )}
      </div>
      <div className="footer__rights">All Rights Reserved</div>
    </div>
  );
}

export default Footer;
