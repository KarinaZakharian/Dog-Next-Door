import { useAppDispatch, useAppSelector } from '../../../hooks/redux';
import Header from '../../PageComponents/Header/Header';
import Footer from '../../PageComponents/Footer/Footer';

import './AboutUs.scss';

function AboutUs() {
  const dispatch = useAppDispatch();

  return (
    <div className="page-wrapper">
      <Header />
      <main className="main-login">
        <div className="container-login"></div>
      </main>
      <Footer />
    </div>
  );
}

export default AboutUs;
