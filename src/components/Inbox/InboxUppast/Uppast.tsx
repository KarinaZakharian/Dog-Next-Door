import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../../hooks/redux';
import Footer from '../../PageComponents/Footer/Footer';
import Header from '../../PageComponents/Header/Header';
import PastCard from './UppastCard/UppastCard';

import '../InboxAccount/Account.scss';

function Uppast() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const animals = [
    {
      type: 'cat',
      name: 'Whiskers',
      dates: 'July 5, 2023 - July 10, 2023',
    },
    {
      type: 'dog',
      name: 'Rex',
      dates: 'June 15, 2023 - June 22, 2023',
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
            </div>
            <div>
              {animals.map((animal, index) => (
                <PastCard
                  key={index} // It's a good practice to provide a unique key for each component
                  type={animal.type}
                  name={animal.name}
                  dates={animal.dates}
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

export default Uppast;
