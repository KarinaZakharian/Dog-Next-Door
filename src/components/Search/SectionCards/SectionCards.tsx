import { useAppDispatch, useAppSelector } from '../../../hooks/redux';
import Card from './Card/Card';
import { searchReducer } from '../../../store/reducers/searchReducer';

import { UserProps } from '../../../@types/types';

import classes from './SectionCards.module.scss';

function SectionCard() {
  const dispatch = useAppDispatch();

  const users = useAppSelector((state) => state.search.users);
  console.log(users);

  return (
    <div className={classes.sectioncards}>
      {users.map((user) => (
        <Card
          key={user.id}
          avatar={user.avatar}
          firstname={user.firstname}
          lastname={user.lastname}
          town={user.town}
          user_address={user.user_address}
          country={user.country}
        />
      ))}
    </div>
  );
}

export default SectionCard;
