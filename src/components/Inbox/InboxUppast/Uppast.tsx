import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../../hooks/redux';
import Footer from '../../PageComponents/Footer/Footer';
import Header from '../../PageComponents/Header/Header';
import PastCard from './UppastCard/UppastCard';

import '../InboxAccount/Account.scss';
import { fetchMessageUser } from '../../../store/reducers/massage-inbox';

function Uppast() {

  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(fetchMessageUser());
  }, []);
  const user = useAppSelector((state) => state.inboxUppast.user);
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
                <PastCard
             // It's a good practice to provide a unique key for each component
                  firstname={user.firstname}
                  lastname={user.lastname}
                  id={user.id}
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

export default Uppast;
