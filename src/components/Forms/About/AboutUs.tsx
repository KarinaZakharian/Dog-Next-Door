import Header from '../../PageComponents/Header/Header';
import Footer from '../../PageComponents/Footer/Footer';
import david from '../../../../public/David.png';
import souf from '../../../../public/Souf.png';
import ilias from '../../../../public/Ilias.png';
import karina from '../../../../public/karina.png';

import './AboutUs.scss';
import PeopleCard from './AboutUsCard';

function AboutUs() {
  return (
    <div className="page-wrapper">
      <Header />
      <div className="wrapper-people">
        <div className="people-container">
          <h2 className="aboutUs-title">La team</h2>
          <h1 className="aboutUs-logo">O&apos;Dog Next Door</h1>
        </div>
        <div className="aboutUs-section">
          <PeopleCard
            avatar={ilias}
            firstname="Ilias"
            lastname="Yakdane"
            status="Product owner"
            spe="Développeur Back-end"
          />
          <PeopleCard
            avatar={karina}
            firstname="Karina"
            lastname="Zakharian"
            status="Lead dev front"
            spe="Développeur Front-end"
          />
          <PeopleCard
            avatar={souf}
            firstname="Soufiane"
            lastname="Ibnaïche"
            status="Scrum Master"
            spe="Développeur Back-end"
          />
          <PeopleCard
            avatar={david}
            firstname="David"
            lastname="Viau"
            status="Git Master"
            spe="Développeur Front-end"
          />
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default AboutUs;
