import './UppastCard.scss';

interface PastCardProps {
  firstname: string;
  lastname: string;
  start_date: string;
  end_date: string;
  status: string;
}

function PastCard({
  firstname,
  lastname,
  start_date,
  end_date,
  status,
}: PastCardProps) {

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
    <div className="animals-card">
      <div className="row">
        <div className="main-info">
          <span className="info"> {firstname}</span>
          <span className="info"> {lastname}</span>
        </div>
        <div className={` ${statusClass}`}>
          <span>{status}</span>
        </div>
        <span className="animals-card__dates">
          {start_date} - {end_date}
        </span>
      </div>
    </div>
  );
}

export default PastCard;
