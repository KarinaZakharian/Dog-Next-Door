/* eslint-disable prettier/prettier */

import { FormEvent, useEffect } from 'react';
import swal from 'sweetalert';
import { success, fillDateForm } from '../../../store/reducers/profil-form';
import { useAppDispatch, useAppSelector } from '../../../hooks/redux';
import { DateProps } from '../../../@types/user';

import Button from '../../InputType/Button/Button';

import './ProfilForm.scss';
import close_icon from '../../../assets/icons8-close-64.png';
import DateRangePickerComp from '../../InputType/DatePiker/DateRangePicker';

function DateForm({
  isDateContainerVisible,
  setIsDateContainerVisible,
}: DateProps) {
  const hideDateContainer = () => {
    setIsDateContainerVisible(false);
  };
  const dispatch = useAppDispatch();
  const error = useAppSelector((state) => state.profilForm.dateError);
  const message = useAppSelector((state) => state.profilForm.dateMessage);

  function handleSubmit(event: FormEvent<HTMLFormElement>): void {
    event.preventDefault();

    const form = event.currentTarget;
    const formData = new FormData(form);

    dispatch(fillDateForm(formData));
  }

  useEffect(() => {
    console.log('error', error);
    console.log('message', message);

    if (!error && message) {
      swal(`${message}`, {
        icon: 'success',
        timer: 1000,
      });
      setTimeout(() => {
        dispatch(success());
        hideDateContainer();
      }, 1000);
    }

    if (error) {
      swal(`${error}`, {
        icon: 'error',
        button: true,
      });
    }
  }, [error, message]);

  return (
    <div
      className={`form-container ${isDateContainerVisible ? '' : 'display'}`}
    >
      <div className="booking-card">
        <button className="close-button" onClick={hideDateContainer}>
          <img className="close-button__image" src={close_icon} alt="Cat" />
        </button>
      </div>
      <form className="profil-form" onSubmit={handleSubmit}>
        <DateRangePickerComp legend="Votre dispo" />
        <Button prop="Enregistrer" />
      </form>
    </div>
  );
}

export default DateForm;
