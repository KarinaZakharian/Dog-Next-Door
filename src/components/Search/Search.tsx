// on import nos composants pour la création de la page /Search
import Header from '../PageComponents/Header/Header';
import Footer from '../PageComponents/Footer/Footer';
import SectionCards from './SectionCards/SectionCards';
import SectionMap from './SectionMap/SectionMap';

// On import notre css
import './Search.scss';
import Input from '../InputType/Input/Input';
import InputSearch from './InputSearch/InputSearch';

function Search() {
  return (
    <div className="search" id="Map">
      <Header />
      <SectionMap />
      <SectionCards />
      <InputSearch />
      <Footer />
    </div>
  );
}

export default Search;
