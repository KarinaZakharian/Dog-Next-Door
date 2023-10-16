import Footer from '../PageComponents/Footer/Footer';
import Header from '../PageComponents/Header/Header';
import Main from '../PageComponents/Main/Main';
import './Error.scss';

function Error() {
  return (
    <div>
      <Header />
      <Main>
        <div className="error-container">
          <h2>Arf encore un bug...</h2>
          <p></p>
        </div>
      </Main>
      <Footer />
    </div>
  );
}

export default Error;
