import React from 'react';
import './Testiamonies.scss';

interface TestimonyProps {
  testimony: string | null;
  lastname: string | null;
  firstname: string | null;
}

function TestimonyCard({ testimony, lastname, firstname }: TestimonyProps) {
  return (
    <div className="testimony-card">
      <p className="testimony-card__name">
        {firstname} {lastname}
      </p>
      <p className="testimony-card__label">{testimony}</p>
    </div>
  );
}

export default TestimonyCard;
