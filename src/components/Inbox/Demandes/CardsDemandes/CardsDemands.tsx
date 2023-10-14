import cat from '../../../../assets/icons8-cat-100.png';
import dog from '../../../../assets/icons8-dog-100.png';
import Button from '../../../InputType/Button/Button';

import './CardsDemands.scss';

interface UserProps {
  firstname: string;
  lastname: string;
  start_date : string ;
  end_date : string ;
  status: string;
}

function DemandesCard({ firstname, lastname, start_date, end_date,status }: UserProps) {
  return (
    <div className="status-card">
      <span className="status-card__name">
        {firstname}
        {lastname}
      </span>
      <span className="status-card__dates">{start_date} {end_date}</span>
      <span className="status-card__status">{status}</span>
    </div>
  );
}

export default DemandesCard;
