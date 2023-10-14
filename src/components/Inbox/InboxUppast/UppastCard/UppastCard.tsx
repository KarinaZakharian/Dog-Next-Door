import { SetStateAction, useState } from 'react';
import cat from '../../../../assets/icons8-cat-100.png';
import dog from '../../../../assets/icons8-dog-100.png';
import Button from '../../../InputType/Button/Button';
import Comment from '../../InboxUppast/Message/Message';

import './UppastCard.scss';

interface PastCardProps {
 firstname: string;
 lastname : string;
 start_date: string ;
 end_date :string ;
 id : string
}

function PastCard({ firstname, lastname, start_date, end_date, id }: PastCardProps) {
  const [isMessageOpen, setMessageOpen] = useState(false);

  function handelMessage() {
    setMessageOpen(true);
  }
  return (
    <div className="animals-card">
      <div className="row">
        <div className="main-info">
          {firstname}{lastname}
        </div>
        <span className="animals-card__dates">{end_date}</span>
        <span className="animals-card__dates">{start_date}</span>
      </div>
      <div className="row2">
        <button onClick={handelMessage}>Add comment</button>
      </div>
      <Comment
        clientId={id}
        isMessageOpen={isMessageOpen}
        setMessageOpen={setMessageOpen}
      />
    </div>
  );
}

export default PastCard;
