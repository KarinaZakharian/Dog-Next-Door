import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../../hooks/redux';
import Footer from '../../PageComponents/Footer/Footer';
import Header from '../../PageComponents/Header/Header';

import '../InboxAccount/Account.scss';
import UpcomingCard from './CardsUpcoming/CardsUpcoming';
import { fetchUpcomingAnimal } from '../../../store/reducers/upcoming-inbox';
import LinkAccount from '../Link/Link';

function Account() {
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(fetchUpcomingAnimal());
  }, [dispatch]);
  const users = useAppSelector((state) => state.inboxUpcoming.user);

  return (
    <div>
      <Header />
      <main className="main-account">
        <div className="container">
          <div className="content">
            <LinkAccount />
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
                    Vous trouverez ici les messages que vous avez échangés avec
                    un pet sitter lorsque vous n&apos;avez pas encore confirmé
                    la réservation.
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
      <Footer />
    </div>
  );
}

export default Account;
