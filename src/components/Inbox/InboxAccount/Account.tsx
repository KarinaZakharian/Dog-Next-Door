import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../../hooks/redux';
import Footer from '../../PageComponents/Footer/Footer';
import Header from '../../PageComponents/Header/Header';
import AnimalCard from '../CardsInbox/Cards';

import './Account.scss';
import { fetchInboxAnimal } from '../../../store/reducers/account-inbox';

function Account() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchInboxAnimal());
  }, []);

  const animals = useAppSelector((state) => state.inboxAccount.animal);
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
              {animals &&
                animals.map((animal, index) => (
                  <AnimalCard
                    key={index} // It's a good practice to provide a unique key for each component
                    type={animal.type}
                    name={animal.name}
                    dates={animal.dates}
                    id={animal.user.id}
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

export default Account;
