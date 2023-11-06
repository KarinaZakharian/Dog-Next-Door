import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../../hooks/redux';
import Footer from '../../PageComponents/Footer/Footer';
import Header from '../../PageComponents/Header/Header';

import '../InboxAccount/Account.scss';
import UpcomingCard from './CardsUpcoming/CardsUpcoming';
import { fetchUpcomingAnimal } from '../../../store/reducers/upcoming-inbox';
import Main from '../../PageComponents/Main/Main';

function Account() {
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(fetchUpcomingAnimal());
  }, [dispatch]);
  const users = useAppSelector((state) => state.inboxUpcoming.user);
  console.log('upcoming', users);

  return (
    <div>
      <Header />
      <Main>
        <main className="main-account">
          <div className="container">
            <div className="content">
              <div className="content__header">
                <Link className="content__link" to="/inbox/awaiting">
                  Demandes en attente
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
                  users.map((user, index) => (
                    <UpcomingCard
                      key={index}
                      type={user.animal.type}
                      name={user.animal.name}
                      start_date={user.booking.start_date}
                      end_date={user.booking.end_date}
                    />
                  ))
                ) : (
                  <div className="content__link-no-demand-container">
                    <h2 className="content__link-no-demand-title">
                      Vous n&apos;avez pas de messages non lus...
                    </h2>
                    <p className="content__link-no-demand-content">
                      Vous trouverez ici les messages que vous avez échangés
                      avec un pet sitter lorsque vous n&apos;avez pas encore
                      confirmé la réservation.
                    </p>
                    <p className="content__link-no-demand-content">
                      Les messages concernant vos prochaines gardes se trouvent
                      dans l&apos;onglet Gardes à venir.
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </main>
      </Main>
      <Footer />
    </div>
  );
}

export default Account;
