import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../../hooks/redux';
import Footer from '../../PageComponents/Footer/Footer';
import Header from '../../PageComponents/Header/Header';

import '../InboxAccount/Account.scss';
import UpcomingCard from './CardsUpcoming/CardsUpcoming';
import { fetchUpcomingAnimal } from '../../../store/reducers/upcoming-inbox';

function Account() {
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(fetchUpcomingAnimal());
  }, []);
  const user = useAppSelector((state) => state.inboxUpcoming.user);
  console.log(user)
  return (
    <div>
      <Header />
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
              {user &&
              
                  <UpcomingCard
                  type={user.animal.type}
                  name={user.animal.name}
                  start_date={user.booking.start_date}
                  end_date={user.booking.end_date}
                 
                  />
             }
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}

export default Account;
