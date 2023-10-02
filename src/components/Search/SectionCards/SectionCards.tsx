import Card from './Card/Card';
import data from '../../../../fakeData/data.json';

import { UserProps } from '../../../@types/types';

import classes from './SectionCards.module.scss';

function SectionCard() {
  const users: UserProps[] = data;

  return (
    <div className={classes.sectioncards}>
      {users.map((user) => (
        <Card
          key={user.id}
          avatar={user.avatar}
          firstname={user.firstname}
          lastname={user.lastname}
          town={user.town}
          country={user.country}
          description={user.description}
        />
      ))}
    </div>
  );
}

export default SectionCard;
