import cat from '../../../../assets/icons8-cat-100.png';
import dog from '../../../../assets/icons8-dog-100.png';

import './CardsUpcoming.scss';

interface AnimalProps {
  type: 'cat'| 'dog';
  name: string ;
  start_date: string;
  end_date:string ;
}

function UpcomingCard({ type, name, start_date, end_date }: AnimalProps) {
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
      <span className="animal-card__dates">{start_date} {end_date}</span>
    </div>
  );
}

export default UpcomingCard;
