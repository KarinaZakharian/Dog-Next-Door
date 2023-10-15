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

  if (status === 'en attente') {
    statusClass = 'yellow-text';
  } else if (status === 'approuvé') {
    statusClass = 'green-text';
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
