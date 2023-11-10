import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import swal from 'sweetalert';

import { useAppDispatch, useAppSelector } from '../../../hooks/redux';
import { success, fillBookingForm } from '../../../store/reducers/booking';

import dog from '../../../assets/icons8-dog-100.png';
import cat from '../../../assets/icons8-cat-100.png';
import bd_icon from '../../../assets/icons8-birth-date-16.png';
import energy_icon from '../../../assets/icons8-energy-30.png';
import food_icon from '../../../assets/icons8-dog-bowl-30.png';
import close_icon from '../../../assets/icons8-close-64.png';

import Button from '../../InputType/Button/Button';
import BookingRangePickerComp from '../../InputType/DatePiker/BookingDatePicker';
import { BookingProps } from '../../../@types/user';

import './Booking.scss';

function Booking({
  isBookingContainerVisible,
  setIsBookingContainerVisible,
  disponibility_date,
  id,
}: BookingProps) {
  // Initialize navigation and dispatch
  // console.log('Sitter dispo in booking ', disponibility_date);

  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  // information from the Redux store
  const error = useAppSelector((state) => state.booking.error);
  const message = useAppSelector((state) => state.booking.message);
  const animal = useAppSelector((state) => state.profil.user.animal);

  // Access specific properties within the 'animal' object
  const type = animal?.type || null;
  const name = animal?.name || null;
  const dateBirth = animal?.birth_date || null;
  const energy = animal?.energy || null;
  const food = animal?.mealhours || null;
  const race = animal?.race || null;

  // Function to hide the booking container
  const hideBookingContainer = () => {
    setIsBookingContainerVisible(false);
  };

  // Function to handle form submission
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const form = event.currentTarget;
    const formData = new FormData(form);

    formData.append('petsitterId', id);
    formData.append('start_date', disponibility_date.start_date);
    formData.append('end_date', disponibility_date.end_date);
    formData.append('disponibility_id', disponibility_date.id);

    dispatch(fillBookingForm(formData));

    // dispatch(fillProfilForm(formData));
  };

  useEffect(() => {
    // Handle success or error messages
    if (!error && message) {
      swal(`${message}`, {
        icon: 'success',
        timer: 1500,
      });
      setTimeout(() => {
        dispatch(success());
        navigate('/', { replace: true });
      }, 1500);
    }

    if (error) {
      swal(`${error}`, {
        icon: 'error',
        timer: 1500,
      });
      setTimeout(() => {
        dispatch(success());
        navigate('/account', { replace: true });
      }, 1500);
    }
  }, [dispatch, error, message, navigate]);

  return (
    <div
      className={`booking-container ${
        isBookingContainerVisible ? '' : 'display'
      }`}
    >
      <div className="booking-card">
        <button
          type="button"
          className="close-button"
          onClick={hideBookingContainer}
        >
          <img className="close-button__image" src={close_icon} alt="Cat" />
        </button>
        <p className="booking-card__title">Votre animal </p>

        <div className="main-info">
          {type === 'Cat' && (
            <img className="booking-card__image" src={cat} alt="Cat" />
          )}
          {type === 'Dog' && (
            <img className="booking-card__image" src={dog} alt="Dog" />
          )}
          {name && <span className="booking-card__info">{name}</span>}
          {race && <span className="booking-card__info">{race}</span>}
          {dateBirth && (
            <div className="booking-card__ad-info">
              <img
                className="booking-card__ad-image"
                src={bd_icon}
                alt="borth_date"
              />
              <span className="booking-card__info">{dateBirth}</span>
            </div>
          )}
          {energy && (
            <div className="booking-card__ad-info">
              <img
                className="booking-card__ad-image"
                src={energy_icon}
                alt="energy_level"
              />
              <span className="booking-card__info">{energy}</span>
            </div>
          )}
          {food && (
            <div className="booking-card__ad-info">
              <img
                className="booking-card__ad-image"
                src={food_icon}
                alt="borth_date"
              />
              <span className="booking-card__info">{food}</span>
            </div>
          )}
        </div>

        <form className="animal-form" onSubmit={handleSubmit}>
          <p className="booking-card__title">
            Sélectionnez les dates d'arrivée et de départ
          </p>
          <BookingRangePickerComp
            minDate={new Date(`${disponibility_date.start_date}`)}
            maxDate={new Date(`${disponibility_date.end_date}`)}
          />
          <Button prop="Submit" />
        </form>
      </div>
    </div>
  );
}

export default Booking;
