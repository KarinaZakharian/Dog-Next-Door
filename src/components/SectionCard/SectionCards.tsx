import Card from './Card/Card';
import data from '../../../fakeData/data.json';

import { User } from '../../@types/types';

import './SectionCards.scss';

function SectionCard() {
  const users: User[] = data;

  return (
    <div className="sectioncards">
      {users.map((user) => (
        <Card
          key={user.id}
          avatar={user.avatar}
          firstname={user.firstname}
          lastname={user.lastname}
          town={user.town}
          country={user.country}
        />
      ))}
    </div>
  );
}

export default SectionCard;
