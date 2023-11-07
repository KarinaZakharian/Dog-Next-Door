import './UppastCard.scss';

interface PastCardProps {
  firstname: string;
  lastname: string;
  start_date: string;
  end_date: string;
}

function PastCard({
  firstname,
  lastname,
  start_date,
  end_date,
}: PastCardProps) {
  return (
    <div className="animals-card">
      <div className="row">
        <div className="main-info">
          {firstname}
          {lastname}
        </div>
        <span className="animals-card__dates">
          {start_date}-{end_date}
        </span>
      </div>
    </div>
  );
}

export default PastCard;
