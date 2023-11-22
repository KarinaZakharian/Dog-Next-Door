import React, { useEffect } from 'react';

import { useAppDispatch, useAppSelector } from '../../../hooks/redux';
import Footer from '../../PageComponents/Footer/Footer';
import Header from '../../PageComponents/Header/Header';
import LinkAccount from '../Link/Link';
import AnimalCard from '../CardsInbox/Cards';

import './Account.scss';
import { fetchInboxAnimal } from '../../../store/reducers/account-inbox';

function Account() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchInboxAnimal());
  }, [dispatch]);

  const users = useAppSelector((state) => state.inboxAccount.user);
  console.log('account data', users);
  return (
    <div>
      <Header />
      <main className="main-account">
        <div className="container">
          <div className="content">
            <LinkAccount />
            <div>
              {users.length > 0 ? (
                users.map((user) => (
                  <AnimalCard
                    key={user.id} // Use a unique key for each user
                    type={user.animal.type}
                    name={user.animal.name}
                    start_date={user.booking.start_date}
                    end_date={user.booking.end_date}
                    clientId={user.id}
                  />
                ))
              ) : (
                <div className="content__link-no-demand-container">
                  <h2 className="content__link-no-demand-title">
                    Vous n'avez pas de messages non lus...
                  </h2>
                  <p className="content__link-no-demand-content">
                    Vous trouverez ici les messages que vous avez échangés avec
                    un pet sitter lorsque que vous n'avez pas encore confirmé la
                    réservation.
                  </p>
                  <p className="content__link-no-demand-content">
                    Les messages concernant vos prochaines gardes se trouvent
                    dans l'onglet Gardes à venir.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}

export default Account;
