import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

import '../InboxAccount/Account.scss';

function LinkAccount() {
  const location = useLocation();
  const [currentPage, setCurrentPage] = useState('');

  useEffect(() => {
    // Extract the pathname from the location object
    setCurrentPage(location.pathname);
  }, [location]);

  return (
    <div className="content__header">
      <Link
        className={`content__link ${
          currentPage === '/inbox/awaiting' ? 'active' : ''
        }`}
        to="/inbox/awaiting"
      >
        Demande en attente
      </Link>
      <Link
        className={`content__link ${
          currentPage === '/inbox/upcoming' ? 'active' : ''
        }`}
        to="/inbox/upcoming"
      >
        Gardes à venir
      </Link>
      <Link
        className={`content__link ${
          currentPage === '/inbox/uppast' ? 'active' : ''
        }`}
        to="/inbox/uppast"
      >
        Gardes passées
      </Link>
      <Link
        className={`content__link ${
          currentPage === '/inbox/demands' ? 'active' : ''
        }`}
        to="/inbox/demands"
      >
        Votre demande
      </Link>
    </div>
  );
}

export default LinkAccount;
