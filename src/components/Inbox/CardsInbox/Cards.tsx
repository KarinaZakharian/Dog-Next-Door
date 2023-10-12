import cat from '../../../assets/icons8-cat-100.png';
import dog from '../../../assets/icons8-dog-100.png';
import Button from '../../InputType/Button/Button';

import './Cards.scss';

interface AnimalProps {
  type: string | null;
  name: string | null;
  dates: string;
}

function AnimalCard({ type, name, dates }: AnimalProps) {
  return (
    <div className="animals-card">
      <div className="row">
        <div className="main-info">
          {type && type === 'cat' && (
            <img className="animals-card__image" src={cat} alt="Avatar" />
          )}
          {type && type === 'dog' && (
            <img className="animals-card__image" src={dog} alt="Avatar" />
          )}
          {name && <span className="animal-card__info">{name}</span>}
        </div>
        <span className="animals-card__dates">{dates}</span>
      </div>
      <div className="row2">
        <button onClick={handleAccept}>Accepter</button>
        <button onClick={handleDecline}>Décline</button>
      </div>
    </div>
  );
}

export default AnimalCard;
