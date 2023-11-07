import { useState } from 'react';
import Comment from '../Comment/Comment';
import './CardsDemands.scss';

interface UserProps {
  firstname: string;
  lastname: string;
  start_date: string;
  end_date: string;
  status: string;
  id: string;
}

function DemandesCard({
  firstname,
  lastname,
  start_date,
  end_date,
  id,
  status,
}: UserProps) {
  let statusClass = '';
  switch (status) {
    case 'En attente':
      statusClass = 'yellow-text';
      break;
    case 'Validé':
      statusClass = 'green-text';
      break;
    case 'A venir':
      statusClass = 'orange-text';
      break;
    case 'Passé':
      statusClass = 'red-text';
      break;
    default:
      // Handle cases where status doesn't match any of the known values
      statusClass = 'unknown-text';
      break;
  }
  const [isMessageOpen, setMessageOpen] = useState(false);

  function handelMessage() {
    setMessageOpen(true);
  }
  return (
    <div className="status-card">
      <div className="status-card__main">
        <div className="status-card__info">
          <span>{firstname}</span>
          <span> {lastname}</span>
        </div>
        <div className="status-card__info">
          <span>{start_date}</span>
          <span>au</span>
          <span> {end_date}</span>
        </div>
        <div className={` ${statusClass}`}>
          <span>{status}</span>
        </div>
      </div>
      {status === 'Passé' && (
        <div className="status-card_button">
          <div className="row2">
            <button className="card-button" onClick={handelMessage}>
              Ajouter une commentaire
            </button>
          </div>
          <Comment
            clientId={id}
            isMessageOpen={isMessageOpen}
            setMessageOpen={setMessageOpen}
          />
        </div>
      )}
    </div>
  );
}

export default DemandesCard;
