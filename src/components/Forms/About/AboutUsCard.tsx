import './AboutUs.scss';

interface CardProps {
  avatar: string;
  firstname: string;
  lastname: string;
  status: string;
  spe: string;
}

function PeopleCard({ avatar, firstname, lastname, status, spe }: CardProps) {
  return (
    <div className="people-card">
      <div className="people-card-imgcont">
        <img className="people-card-avatar" src={avatar} alt="Person Avatar" />
      </div>
      <div className="people-card-content">
        <span className="people-card-name">
          {firstname} {lastname}
        </span>
        <span className="people-card-status">{status}</span>
        <span className="people-card-spe">{spe}</span>
      </div>
    </div>
  );
}

export default PeopleCard;
