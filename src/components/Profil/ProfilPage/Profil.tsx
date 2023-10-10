import Header from '../../PageComponents/Header/Header';
import Footer from '../../PageComponents/Footer/Footer';
import DateRangeComp from '../../InputType/DatePiker/DateRangeSelect';
import './Profil.scss';
import { useAppDispatch, useAppSelector } from '../../../hooks/redux';

import avatar from '../../../assets/Logo-ODogNextDoor.svg';

import { useEffect } from 'react';
import { fetchUser } from '../../../store/reducers/profil';
import { Link } from 'react-router-dom';
import Button from '../../InputType/Button/Button';
import AnimalCard from '../AnimalCard/AnimalCard';

function Profil() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchUser());
  }, []);
  const animals = useAppSelector((state) => state.profil.animal);
  const firstname = useAppSelector((state) => state.profil.firstname);
  const lastname = useAppSelector((state) => state.profil.lastname);
  const user_address = useAppSelector((state) => state.profil.user_address);
  const size = useAppSelector((state) => state.profil.animal_size);
  const description = useAppSelector((state) => state.profil.description);
  const garden = useAppSelector((state) => state.profil.garden);
  const accommodation = useAppSelector((state) => state.profil.accomodation);
  const additionnal_information = useAppSelector(
    (state) => state.profil.additionnal_information
  );
  const walking_duration = useAppSelector(
    (state) => state.profil.walking_duration
  );
  const disponibility_date = useAppSelector(
    (state) => state.profil.disponibility_date
  );

  const type = useAppSelector((state) => state.profil.animal);
  const name = useAppSelector((state) => state.profil.name);
  const date_birth = useAppSelector((state) => state.profil.date_birth);
  const size_animal = useAppSelector((state) => state.profil.size);
  const walk = useAppSelector((state) => state.profil.walk);
  const energy = useAppSelector((state) => state.profil.energy);
  const food = useAppSelector((state) => state.profil.mealhuars);

  const renderSize = () => {
    if (size !== undefined && size !== null) {
      if (Array.isArray(size)) {
        return size.map((item, index) => <li key={index}>{item}</li>);
      } else if (typeof size === 'string') {
        // Assuming 'size' is a string like "Petit (0-7 kg)"
        const sizes = size.split(',');
        return sizes.map((item, index) => <li key={index}>{item}</li>);
      } else {
        return <li>{size}</li>;
      }
    }
    return null;
  };

  const renderOptions = () => {
    if (
      additionnal_information !== undefined &&
      additionnal_information !== null
    ) {
      if (Array.isArray(additionnal_information)) {
        return additionnal_information.map((item, index) => (
          <li key={index}>{item}</li>
        ));
      } else if (typeof additionnal_information === 'string') {
        const options = additionnal_information.split(',');
        return options.map((item, index) => <li key={index}>{item}</li>);
      } else {
        return <li>{additionnal_information}</li>;
      }
    }
    return null;
  };

  return (
    <div className="page-wrapper">
      <Header />
      <div className="profil-wrapper">
        <div className="container-profil">
          <div className="aside-profil">
            <img className="main-img" src={avatar} />

            <h3 className="profil-title">
              {lastname} peut effectuer la garde à son domicile
            </h3>
            <ul>{renderSize()}</ul>
            <h3 className="profil-title">À propos du domicile du {lastname}</h3>
            <ul>
              {accommodation && <li>{accommodation}</li>}
              {garden && <li>{garden}</li>}
              {/* Map through the 'additional options' array and render each option in an <li> element */}
              {renderOptions()}
            </ul>
            {walking_duration && <p>Disponibilité de promenade</p>}
            {walking_duration && <p>{walking_duration}</p>}
            <h3 className="profil-title">Disponibilité de {lastname}</h3>
            {disponibility_date && <DateRangeComp />}
          </div>
          <div className="main-profil">
            <h1>
              {firstname} {lastname}
            </h1>
            {description && <p>{description}</p>}
            {animals && (
              <AnimalCard
                type={type}
                name={name}
                race={''}
                age={date_birth}
                size={size_animal}
                pipi={walk}
                repa={food}
                energy={energy}
              />
            )}
            <Link className="link-animal" to={'/account/animal-form'}>
              <Button prop="Ajoutez votre animal de compagnie" />
            </Link>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}

export default Profil;
