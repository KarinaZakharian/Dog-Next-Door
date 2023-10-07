import cat from '../../../assets/icons8-cat-100.png';
import dog from '../../../assets/icons8-dog-100.png';

import './Card.scss';

interface AnimalProps {
  type: string | null;
  name: string | null;
  race: string | null;
  age: string | null;
  size: string | null;
  pipi: string | null;
  repa: string | null;
  energy: string | null;
}

function AnimalCard({
  type,
  name,
  race,
  age,
  size,
  pipi,
  repa,
  energy,
}: AnimalProps) {
  return (
    <div className="card">
      <div className="main-info">
        {type && type === 'cat' && (
          <img className="card__image" src={cat} alt="Avatar" />
        )}
        {type && type === 'dog' && (
          <img className="card__image" src={dog} alt="Avatar" />
        )}
        {name && <span className="card__info">{name}</span>}
        {race && <span className="card__info">{race}</span>}
        {age && (
          <span className="card__info"> className='card__info'{age}</span>
        )}
      </div>
      {size && (
        <p className="card__label">
          La taille de {name} {size}
        </p>
      )}
      {repa && (
        <p className="card__label">
          {' '}
          {name} mange {repa}
        </p>
      )}
      {energy && (
        <p className="card__label">
          Niveau d'energie de {name} est {energy}
        </p>
      )}
      {pipi && (
        <p className="card__label"> Horaires des pauses pipi : {pipi}</p>
      )}
    </div>
  );
}

export default AnimalCard;
