import { UserProps } from '../../../@types/types';

import './Card.scss';

function Card({ image, firstname, lastname, town, country }: UserProps) {
  return (
    <div className="card">
      <img src={image} alt="Avatar" />
      <div>
        <h2>
          {firstname} {lastname}
        </h2>
        <p>{town}</p>
        <p>{country}</p>
      </div>
    </div>
  );
}

export default Card;
