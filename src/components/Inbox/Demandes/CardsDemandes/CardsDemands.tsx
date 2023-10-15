import cat from '../../../../assets/icons8-cat-100.png';
import dog from '../../../../assets/icons8-dog-100.png';
import Button from '../../../InputType/Button/Button';

import './CardsDemands.scss';

interface UserProps {
  firstname: string;
  lastname: string;
  start_date: string;
  end_date: string;
  status: string;
}

function DemandesCard({
  firstname,
  lastname,
  start_date,
  end_date,
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

  return (
    <div className="status-card">
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
  );
}

export default DemandesCard;
