import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../../hooks/redux';
import Footer from '../../PageComponents/Footer/Footer';
import Header from '../../PageComponents/Header/Header';

import '../InboxAccount/Account.scss';
import DemandesCard from './CardsDemandes/CardsDemands';

function Demandes() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const fakeData = [
    {
      firstname: 'John',
      lastname: 'Doe',
      dates: 'July 5, 2023 - July 10, 2023',
      status: 'Pending',
    },
    {
      firstname: 'Jane',
      lastname: 'Smith',
      dates: 'June 15, 2023 - June 22, 2023',
      status: 'Accepted',
    },
  ];
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
              {fakeData.map((user, index) => (
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
