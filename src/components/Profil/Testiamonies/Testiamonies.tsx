import React from 'react';
import './Testiamonies.scss';

interface TestimonyProps {
  testimony: string;
}

function TestimonyCard({ testimony }: TestimonyProps) {
  return (
    <div className="testimony-card">
      <p className="testimony-card__label">{testimony}</p>
    </div>
  );
}

export default TestimonyCard;
