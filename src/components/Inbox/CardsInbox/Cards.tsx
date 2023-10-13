import { useEffect } from 'react';
import swal from 'sweetalert';
import cat from '../../../assets/icons8-cat-100.png';
import dog from '../../../assets/icons8-dog-100.png';
import { useAppDispatch, useAppSelector } from '../../../hooks/redux';
import { clientAccept } from '../../../store/reducers/account-inbox';

import './Cards.scss';

interface AnimalProps {
  type: string;
  name: string;
  dates: string;
  clientId: string;
}

function AnimalCard({ type, name, dates, clientId }: AnimalProps) {
  const acceptMessage = useAppSelector(
    (state) => state.inboxAccount.acceptMessage
  );
  const declineMessage = useAppSelector(
    (state) => state.inboxAccount.declineMessage
  );

  const dispatch = useAppDispatch();
  function handleAccept() {
    const formData = new FormData();
    formData.append('clientId', clientId.toString());
    formData.append('answer', 'true');
    dispatch(clientAccept(formData));
  }

  function handleDecline() {
    const formData = new FormData();
    formData.append('clientId', clientId.toString());
    formData.append('answer', 'true');
    dispatch(clientAccept(formData));
  }

  useEffect(() => {
    if (acceptMessage) {
      // Show a success message using a modal
      swal(`${acceptMessage}`, {
        icon: 'success',
        timer: 1000,
      });
    }

    if (declineMessage) {
      // Show an error message using a modal
      swal(`${declineMessage}`, {
        icon: 'success',
        timer: 1000,
      });
    }
  }, [acceptMessage, declineMessage]);

  return (
    <div className="animals-card">
      <div className="row">
        <div className="main-info">
          {type && type === 'cat' && (
            <img className="animals-card__image" src={cat} alt="Avatar" />
          )}
          {type && type === 'dog' && (
            <img className="animals-card__image" src={dog} alt="Avatar" />
          )}
          {name && <span className="animal-card__info">{name}</span>}
        </div>
        <span className="animals-card__dates">{dates}</span>
      </div>
      <div className="row2">
        <button onClick={handleAccept}>Accepter</button>
        <button onClick={handleDecline}>Décline</button>
      </div>
    </div>
  );
}

export default AnimalCard;
