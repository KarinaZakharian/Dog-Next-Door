import cat from '../../../../assets/icons8-cat-100.png';
import dog from '../../../../assets/icons8-dog-100.png';

import './CardsUpcoming.scss';

interface AnimalProps {
  type: string | null;
  name: string | null;
  dates: string;
}

function UpcomingCard({ type, name, dates }: AnimalProps) {
  return (
    <div className="animal-card">
      <div className="main-info">
        {type && type === 'cat' && (
          <img className="animal-card__image" src={cat} alt="Avatar" />
        )}
        {type && type === 'dog' && (
          <img className="animal-card__image" src={dog} alt="Avatar" />
        )}
        {name && <span className="animal-card__info">{name}</span>}
      </div>
      <span className="animal-card__dates">{dates}</span>
    </div>
  );
}

export default UpcomingCard;
