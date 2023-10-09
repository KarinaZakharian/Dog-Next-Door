import { useAppSelector } from '../../../hooks/redux';
import Card from './Card/Card';
import logo from '../../../assets/Logo-ODogNextDoor.svg';

import './SectionCards.scss';
import { UserProps } from '../../../@types/user';

function SectionCard() {
  const users: UserProps[] = useAppSelector(
    (state) => state.search.users
  ) as unknown as UserProps[];

  return (
    <div className="sectioncards">
      {users.length > 0 ? (
        users.map((user) => (
          <Card
            key={user.id}
            avatar={user.avatar}
            firstname={user.firstname}
            lastname={user.lastname}
            distance={user.distance}
            id={user.id}
            town={user.town}
            user_address={user.user_address}
            country={user.country}
          />
        ))
      ) : (
        <div className="sectioncards__noresult">
          <img src={logo} alt="" className="sectioncards__noresult-logo" />
          <h2>Pas de résultat</h2>
        </div>
      )}
    </div>
  );
}

export default SectionCard;
