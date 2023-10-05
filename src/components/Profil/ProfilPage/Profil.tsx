import Header from '../../PageComponents/Header/Header';
import Footer from '../../PageComponents/Footer/Footer';
import DateRangeComp from '../../InputType/DatePiker/DateRangeSelect';
import './Profil.scss';
import { useAppDispatch, useAppSelector } from '../../../hooks/redux';

import avatar from '../../../assets/Logo-ODogNextDoor.svg';

import { useEffect } from 'react';
import { fetchUser } from '../../../store/reducers/profil';

function Profil() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchUser());
  }, [dispatch]);

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

  console.log(
    'first Name',
    firstname,
    'accomodation',
    accommodation,
    'size',
    size,
    'description',
    description,
    'garden',
    garden,
    'options',
    additionnal_information,
    'city',
    user_address
  );

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
            <h3 className="profil-title">Disponibilité de {lastname}</h3>
            <DateRangeComp />
          </div>
          <div className="main-profil">
            <h1>
              {firstname} {lastname}
            </h1>
            {description && <p>{description}</p>}
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}

export default Profil;
