import { Link } from 'react-router-dom';
import { UserProps } from '../../../../@types/types';

import './Card.scss';

function Card({
  avatar,
  firstname,
  lastname,
  town,
  user_address,
  country,
}: UserProps) {
  return (
    <Link className="card-link" to={''}>
      <div className="card">
        <img className="card-image" src={avatar} alt="Avatar" />
        <div className="card-content">
          <h2 className="card-title">
            {firstname} {lastname}
          </h2>
          <p className="card-town">{town}</p>
          <p className="card-user_address">{user_address}</p>
          <p className="card-country">{country}</p>
        </div>
      </div>
    </Link>
  );
}

export default Card;
