import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../../hooks/redux';
import Footer from '../../PageComponents/Footer/Footer';
import Header from '../../PageComponents/Header/Header';
import PastCard from './UppastCard/UppastCard';

import '../InboxAccount/Account.scss';
import { fetchMessageUser } from '../../../store/reducers/massage-inbox';
import Main from '../../PageComponents/Main/Main';

function Uppast() {
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(fetchMessageUser());
  }, [dispatch]);
  const users = useAppSelector((state) => state.inboxUppast.user);
  console.log('uppast data', users);
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
  users.map((user) => (
    <PastCard
      key={user.id} // Provide a unique key for each component
      firstname={user.firstname}
      lastname={user.lastname}
      id={user.id}
      start_date={user.booking.start_date}
      end_date={user.booking.end_date}
    />
  ))
) : (
  <div className="content__link-no-demand-container">
    <h2 className="content__link-no-demand-title">
      Vous n'avez pas de messages non lus...
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

export default Uppast;
