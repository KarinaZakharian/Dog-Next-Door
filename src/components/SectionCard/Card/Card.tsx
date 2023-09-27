import { User } from '../../../@types/types';

import './Card.scss';

interface UserProps {
  user: User;
}

function Card({ user }: UserProps) {
  return (
    <article>
      <img src={user.avatar} alt={user.firstname} />
      <div>
        <h3>{`#${user.firstname} - ${user.lastname}`}</h3>
      </div>
      <p>
        {user.town} {user.country}
      </p>
    </article>
  );
}

export default Card;
