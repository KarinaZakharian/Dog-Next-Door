import { Link } from 'react-router-dom';
import { CardProps } from '../../../../@types/user';

import './Card.scss';
import avatarLogo from '../../../../assets/Logo-ODogNextDoor.svg';

function Card({
  avatar,
  firstname,
  lastname,
  town,
  user_address,
  country,
  id,
  distance,
}: CardProps) {
  return (
    <Link className="card-link" to={'/petsitter/' + id}>
      <div className="card">
        <img
          className="card-image"
          src={avatar ? avatar : avatarLogo}
          alt="Avatar"
        />
        <div className="card-content">
          <h2 className="card-title">
            {firstname} {lastname}
          </h2>
          <p className="card-town">{town}</p>
          <p className="card-user_address">{user_address}</p>
          <p className="card-user_distance">
            Se situe à {distance} km de vous.
          </p>
          <p className="card-country">{country}</p>
        </div>
      </div>
    </Link>
  );
}

export default Card;
