import data from '../../../../fakeData/data.json';

import './Card.scss';

function Card() {
  return (
    <article>
      <img
        src={user.avatar}
        alt={user.firstname}
      />
      <div>
        <h3>
          {`#${user.firstname} - ${user.lastname}`}
        </h3>
      </div>
      <p>
        {user.town} {user.country}
      </p>
    </article>;
  );
}

export default Card;
