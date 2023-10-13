import { SetStateAction, useState } from 'react';
import cat from '../../../../assets/icons8-cat-100.png';
import dog from '../../../../assets/icons8-dog-100.png';
import Button from '../../../InputType/Button/Button';
import Comment from '../../InboxUppast/Message/Message';

import './UppastCard.scss';

interface AnimalProps {
  type: string | null;
  name: string | null;
  dates: string;
}

function PastCard({ type, name, dates }: AnimalProps) {
  const [isMessageOpen, setMessageOpen] = useState(false);

  function handelMessage() {
    setMessageOpen(true);
  }
  return (
    <div className="animals-card">
      <div className="row">
        <div className="main-info">
          {type && type === 'cat' && (
            <img className="animals-card__image" src={cat} alt="Avatar" />
          )}
          {type && type === 'dog' && (
            <img className="animals-card__image" src={dog} alt="Avatar" />
          )}
          {name && <span className="animal-card__info">{name}</span>}
        </div>
        <span className="animals-card__dates">{dates}</span>
      </div>
      <div className="row2">
        <button onClick={handelMessage}>Add comment</button>
      </div>
      <Comment
        clientId={''}
        isMessageOpen={isMessageOpen}
        setMessageOpen={setMessageOpen}
      />
    </div>
  );
}

export default PastCard;
