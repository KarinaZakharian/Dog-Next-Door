import cat from '../../../assets/icons8-cat-100.png';
import dog from '../../../assets/icons8-dog-100.png';

import './AnimalCard.scss';

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
    <div className="myAnimal-card">
      <div className="main-info">
        {type && type === 'Cat' && (
          <img className="myAnimal-card__image" src={cat} alt="Avatar" />
        )}
        {type && type === 'Dog' && (
          <img className="myAnimal-card__image" src={dog} alt="Avatar" />
        )}
        {name && <span className="myAnimal-card__info">{name}</span>}
        {race && <span className="myAnimal-card__info">{race}</span>}
        {age && <span className="myAnimal-card__info">{age}</span>}
      </div>
      {size && (
        <p className="myAnimal-card__label">
          La taille de {name} est {size}.
        </p>
      )}
      {repa && (
        <p className="myAnimal-card__label">
          {name} mange {repa} .
        </p>
      )}
      {energy && (
        <p className="myAnimal-card__label">
          Niveau d'energie de {name} est : {energy} .
        </p>
      )}
      {pipi && (
        <p className="myAnimal-card__label">
          {' '}
          Horaires des pauses pipi : {pipi}
        </p>
      )}
    </div>
  );
}

export default AnimalCard;