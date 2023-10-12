import React from 'react';

interface CardProps {
  avatar: string;
  firstname: string;
  lastname: string;
  linkidin: string;
  position: string;
}

function PeopleCard({
  avatar,
  firstname,
  lastname,
  linkidin,
  position,
}: CardProps) {
  return (
    <div className="people-card">
      <div>
        <img src={avatar} alt="Person Avatar" />
        <span>
          {firstname} {lastname}
        </span>
      </div>

      <div>
        <img />
        <span>{linkidin}</span>
      </div>

      <div>
        <img />
        <span>{position}</span>
      </div>
    </div>
  );
}

export default PeopleCard;
