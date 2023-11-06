import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../../hooks/redux';
import Footer from '../../PageComponents/Footer/Footer';
import Header from '../../PageComponents/Header/Header';
import Main from '../../PageComponents/Main/Main';

import '../InboxAccount/Account.scss';
import DemandesCard from './CardsDemandes/CardsDemands';
import { fetchStatus } from '../../../store/reducers/demandes-inbox';

function Demandes() {
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(fetchStatus());
  }, [dispatch]);

  const users = useAppSelector((state) => state.inboxDemands.user);

  console.log('demand data', users);

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
                  Votre demands
                </Link>
              </div>
              <div>
                {users ? (
                  users.map((user, index) => (
                    <DemandesCard
                      // It's a good practice to provide a unique key for each component
                      key={index}
                      lastname={user.animal.petsitter_lastname}
                      firstname={user.animal.petsitter_firstname}
                      start_date={user.booking.start_date}
                      end_date={user.booking.end_date}
                      status={user.booking.booking_status}
                    />
                  ))
                ) : (
                  <div className="content__link-no-demand-container">
                    <h2 className="content__link-no-demand-title">
                      Vous n&apos;avez pas de messages non lus...
                    </h2>
                    <p className="content__link-no-demand-content">
                      Vous trouverez ici les messages que vous avez échangés
                      avec un pet sitter lorsque que vous n'avez pas encore
                      confirmé la réservation.
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
      </Main>
      <Footer />
    </div>
  );
}

export default Demandes;
