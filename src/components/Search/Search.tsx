// on import nos composants pour la création de la page /Search
import Header from '../PageComponents/Header/Header';
import Footer from '../PageComponents/Footer/Footer';
import SectionCard from '../SectionCard/SectionCards';
import SectionMap from '../SectionMap/SectionMap';

// On import notre css
import './Search.scss';

function Search() {
  return (
    <div className="search" id="Map">
      <Header />
      <SectionMap />
      <SectionCard />
      <Footer />
    </div>
  );
}

export default Search;
