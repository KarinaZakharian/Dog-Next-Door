import { useEffect } from 'react';
import swal from 'sweetalert';
import cat from '../../../assets/icons8-cat-100.png';
import dog from '../../../assets/icons8-dog-100.png';
import { useAppDispatch, useAppSelector } from '../../../hooks/redux';
import { clientAccept } from '../../../store/reducers/account-inbox';

import './Cards.scss';

interface AnimalProps {
  type: 'Cat' | 'Dog';
  name: string;
  start_date: string;
  end_date: string;
  clientId: string;
}

function DisponibilityCards({
  type,
  name,
  start_date,
  end_date,
  clientId,
}: AnimalProps) {
  const acceptMessage = useAppSelector(
    (state) => state.inboxAccount.acceptMessage
  );

  const dispatch = useAppDispatch();
  function handleAccept() {
    const formData = new FormData();
    formData.append('clientId', clientId.toString());
    formData.append('answer', 'true');
    dispatch(clientAccept(formData));
  }

  useEffect(() => {
    if (acceptMessage) {
      swal(`${acceptMessage}`, {
        icon: 'success',
        timer: 1000,
      });
    }
  }, [acceptMessage]);

  return (
    <div className="animals-card">
      <div className="row">
        <div className="main-info">
          {type && type === 'Cat' && (
            <img className="animals-card__image" src={cat} alt="Avatar" />
          )}
          {type && type === 'Dog' && (
            <img className="animals-card__image" src={dog} alt="Avatar" />
          )}
          {name && <span className="animal-card__info">{name}</span>}
        </div>
        <span className="animals-card__dates">
          {start_date}
          {end_date}
        </span>
      </div>
      <div className="row2">
        <button type="button" onClick={handleAccept}>
          Accepter
        </button>
      </div>
    </div>
  );
}

export default DisponibilityCards;
