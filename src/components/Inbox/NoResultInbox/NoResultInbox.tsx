import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../../hooks/redux';
import AnimalCard from '../CardsInbox/Cards';

import './Account.scss';
import { fetchInboxAnimal } from '../../../store/reducers/account-inbox';

function Account() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchInboxAnimal());
  }, []);

  const user = useAppSelector((state) => state.inboxAccount.user);

  return (
    <div className="content">
      {Array.isArray(user) ? (
        user.map((user, index) => (
          <AnimalCard
            key={index} // Use a unique key for each user
            type={user.animal.type}
            name={user.animal.name}
            start_date={user.booking.start_date}
            end_date={user.booking.end_date}
            clientId={user.id}
          />
        ))
      ) : user ? (
        <AnimalCard
          type={user.animal.type}
          name={user.animal.name}
          start_date={user.booking.start_date}
          end_date={user.booking.end_date}
          clientId={user.id}
        />
      ) : (
        <div className="content__link-no-demand-container">
          <h2 className="content__link-no-demand-title">
            Vous n'avez pas de messages non lus...
          </h2>
          <p className="content__link-no-demand-content">
            Vous trouverez ici les messages que vous avez échangés avec un pet
            sitter lorsque que vous n'avez pas encore confirmé la réservation.
          </p>
          <p className="content__link-no-demand-content">
            Les messages concernant vos prochaines gardes se trouvent dans
            l'onglet Gardes à venir.
          </p>
        </div>
      )}
    </div>
  );
}

export default Account;
