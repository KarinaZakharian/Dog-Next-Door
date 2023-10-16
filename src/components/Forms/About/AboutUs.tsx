import Header from '../../PageComponents/Header/Header';
import Footer from '../../PageComponents/Footer/Footer';
import Main from '../../PageComponents/Main/Main';

import './AboutUs.scss';

function AboutUs() {

  return (
    <div className="page-wrapper">
      <Header />
      <Main>
        <div className="about-us">
          <h1 className="about-us__title">À propos de nous!</h1>
          <p className="about-us__text">
            lorem ipsum dolor sit amet, consectetur adipiscing elit. sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
          </p>
        </div>
      </Main>
      <Footer />
    </div>
  );
}

export default AboutUs;
