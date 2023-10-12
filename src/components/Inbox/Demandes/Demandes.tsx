import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../../hooks/redux';
import Footer from '../../PageComponents/Footer/Footer';
import Header from '../../PageComponents/Header/Header';

import '../InboxAccount/Account.scss';
import DemandesCard from './CardsDemandes/CardsDemands';
import { fetchStatus } from '../../../store/reducers/demandes-inbox';

function Demandes() {
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(fetchStatus());
  }, []);

  const users = useAppSelector((state) => state.inboxDemands.user);

  return (
    <div>
      <Header />
      <main className="main-account">
        <div className="container">
          <div className="content">
            <div className="content__header">
              <Link className="content__link" to="/account/inbox">
                Demandes en attente
              </Link>
              <Link className="content__link" to="/account/inbox/upcoming">
                Gardes à venir
              </Link>
              <Link className="content__link" to="/account/inbox/uppast">
                Gardes passées
              </Link>
              <Link className="content__link" to="/account/inbox/demands">
                Votre demands
              </Link>
            </div>
            <div>
              {users &&
                users.map((user, index) => (
                  <DemandesCard
                    key={index} // It's a good practice to provide a unique key for each component
                    lastname={user.lastname}
                    firstname={user.firstname}
                    dates={user.dates}
                    status={user.status}
                  />
                ))}
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}

export default Demandes;
