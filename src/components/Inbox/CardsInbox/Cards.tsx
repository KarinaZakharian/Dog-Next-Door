import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
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

function AnimalCard({
  type,
  name,
  start_date,
  end_date,
  clientId,
}: AnimalProps) {
  const navigate = useNavigate();

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
      // Show a success message using a modal
      swal(`${acceptMessage}`, {
        icon: 'success',
        timer: 1000,
      });
      setTimeout(() => {
        // Redirect to the home page after a successful login
        navigate('/inbox/upcoming', { replace: true });
      }, 1000);
    }
  }, [acceptMessage, navigate]);

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
        <div className="main-info">
          <span className="animals-card__dates">{start_date} au</span>
          <span className="animals-card__dates">{end_date}</span>
        </div>
      </div>
      <div className="row2">
        <button type="button" className="card-button" onClick={handleAccept}>
          Accepter
        </button>
      </div>
    </div>
  );
}

export default AnimalCard;
