import { Link } from 'react-router-dom';
import { UserProps } from '../../../../@types/types';

import './Card.scss';
import { useDispatch } from 'react-redux';
import { setUserId } from '../../../../store/reducers/sitter';

function Card({
  avatar,
  firstname,
  lastname,
  town,
  user_address,
  country,
  id,
  // distance,
}: UserProps) {
  const dispatch = useDispatch(); // Get the dispatch function

  // Function to handle when the link is clicked
  const handleLinkClick = () => {
    console.log('cards id',id)
    // Dispatch the action with the user ID
    dispatch(setUserId(id));
  };
  return (
    <Link className="card-link" to={'/petsitter/' + id} >
      <div className="card">
        <img className="card-image" src={avatar} alt="Avatar" />
        <div className="card-content">
          <h2 className="card-title">
            {firstname} {lastname}
          </h2>
          <p className="card-town">{town}</p>
          <p className="card-user_address">{user_address}</p>
          <p className="card-country">{country}</p>
        </div>
      </div>
    </Link>
  );
}

export default Card;
