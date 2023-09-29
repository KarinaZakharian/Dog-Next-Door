import { Link } from 'react-router-dom';
import { UserProps } from '../../../../@types/types';

import './Card.scss';

function Card({ avatar, firstname, lastname, town, country, description }: UserProps) {
  return (
    <Link className='card-link' to={''}>
      <div className="card">
        <img className='card-image' src={avatar} alt="Avatar" />
        <div className='card-content'>
          <h2 className='card-title'>
            {firstname} {lastname}
          </h2>
          <p className='card-town'>{town}</p>
          <p className='card-country'>{country}</p>
          <p className="card-description">{description}</p>
        </div>
      </div>
    </Link>
  );
}

export default Card;