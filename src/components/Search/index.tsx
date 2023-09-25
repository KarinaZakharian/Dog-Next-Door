// on import nos composants pour la création de la page /Search
import SectionCard from '../SectionCard';
import SectionMap from '../SectionMap/SectionMap';

// On import notre css
import './styles.scss';

function Search() {
  return (
    <div className="search" id="Map">
      <SectionCard />
      <SectionMap />
    </div>
  );
}

export default Search;
