import cat from '../../../assets/icons8-cat-100.png';
import dog from '../../../assets/icons8-dog-100.png';
import birthdayIcon from '../../../assets/birthday-cake-64.png';
import mealIcon from '../../../assets/dog-bowl-64.png';
import energyIcon from '../../../assets/energy-100.png';
import poopingIcon from '../../../assets/dog-pooping-100.png';
import sizeIcon from '../../../assets/size-64.png';

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
  console.log(type)
  return (
    <div className="myAnimal-card">
      <div className="section-animal">
        {type && type === 'Cat' ? (
          <img className="myAnimal-card__image" src={cat} alt="Avatar" />
        ) : (
          <img className="myAnimal-card__image" src={dog} alt="Avatar" />
        )}

        {name && <h3 className="myAnimal-card__title">{name}</h3>}

        {race && <p className="myAnimal-card__label">{race}</p>}
      </div>

      <div className="section-info">
        <div className="myAnimal-card__birthday">
          <img
            src={birthdayIcon}
            alt="birthday icon"
            className="myAnimal-card__icon"
          />
          {age && <p className="myAnimal-card__label">{age}</p>}
        </div>

        <div className="myAnimal-card__size">
          <img src={sizeIcon} alt="size icon" className="myAnimal-card__icon" />
          {size && <p className="myAnimal-card__label">{size}</p>}
        </div>
        

        <div className="myAnimal-card__meal">
          <img src={mealIcon} alt="meal icon" className="myAnimal-card__icon" />
          {repa && <p className="myAnimal-card__label">{repa}</p>}
        </div>

        <div className="myAnimal-card__energy">
          <img src={energyIcon} alt="" className="myAnimal-card__icon" />
          {energy && <p className="myAnimal-card__label">{energy}</p>}
        </div>

        <div className="myAnimal-card__pooping">
          <img src={poopingIcon} alt="" className="myAnimal-card__icon" />
          {pipi && <p className="myAnimal-card__label">{pipi}</p>}
        </div>
      </div>
    </div>
  );
}

export default AnimalCard;
