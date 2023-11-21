import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../../hooks/redux';
import Footer from '../../PageComponents/Footer/Footer';
import Header from '../../PageComponents/Header/Header';
import AnimalCard from '../CardsInbox/Cards';

import './Account.scss';
import { fetchInboxAnimal } from '../../../store/reducers/account-inbox';
import Main from '../../PageComponents/Main/Main';

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
            <div className="content__header">
              <Link className="content__link" to="/inbox/awaiting">
                Demande en attente
              </Link>
              <Link className="content__link" to="/inbox/upcoming">
                Gardes à venir
              </Link>
              <Link className="content__link" to="/inbox/uppast">
                Gardes passées
              </Link>
              <Link className="content__link" to="/inbox/demands">
                Votre demande
              </Link>
            </div>
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
