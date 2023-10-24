import { FormEvent, useEffect } from 'react';
import swal from 'sweetalert';
import { success, fillDateForm } from '../../../store/reducers/profil';
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
  const dateError = useAppSelector((state) => state.profil.dateError);
  const dateMessage = useAppSelector((state) => state.profil.dateMessage);

  function handleSubmit(event: FormEvent<HTMLFormElement>): void {
    event.preventDefault();

    const form = event.currentTarget;
    const formData = new FormData(form);
    dispatch(fillDateForm(formData));
  }

  useEffect(() => {
    // console.log('error', error);
    // console.log('message', message);

    if (!dateError && dateMessage) {
      swal({
        icon: 'success',
        timer: 1000,
      });
      setTimeout(() => {
        dispatch(success());
        hideDateContainer();
      }, 1000);
    }

    if (dateError) {
      swal(`${dateError}`, {
        icon: 'error',
        buttons: [true],
      });
    }
  }, [dateError, dateMessage]);
  return (
    <div
      className={`form-container ${isDateContainerVisible ? '' : 'display'}`}
    >
      <div className="booking-card">
        <button
          type="button"
          className="close-button"
          onClick={hideDateContainer}
        >
          <img
            className="close-button__image"
            src={close_icon}
            alt="Close icon"
          />
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
