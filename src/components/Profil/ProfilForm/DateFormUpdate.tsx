import { FormEvent, useEffect } from 'react';
import swal from 'sweetalert';
import { success, updateDateForm } from '../../../store/reducers/profil';
import { useAppDispatch, useAppSelector } from '../../../hooks/redux';
import { DateProps, UpdateProps } from '../../../@types/user';

import Button from '../../InputType/Button/Button';

import './ProfilForm.scss';
import close_icon from '../../../assets/icons8-close-64.png';
import DateRangePickerComp from '../../InputType/DatePiker/DateRangePicker';
import React from 'react';

function DateFormUpdate({
  isUpdateContainerVisible,
  setIsUpdateContainerVisible,
}: UpdateProps) {
  const hideDateContainer = () => {
    setIsUpdateContainerVisible(false);
  };
  const dispatch = useAppDispatch();
  const dateError = useAppSelector((state) => state.profil.user.updateError);
  const dateMessage = useAppSelector(
    (state) => state.profil.user.updateMessage
  );
  //console.log(dateMessage);

  function handleSubmit(event: FormEvent<HTMLFormElement>): void {
    event.preventDefault();

    const form = event.currentTarget;
    const formData = new FormData(form);
    dispatch(updateDateForm(formData));
  }

  useEffect(() => {
    // console.log('error', error);
    // console.log('message', message);

    if (!dateError && dateMessage) {
      swal(`${dateMessage}`, {
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
      className={`form-container ${isUpdateContainerVisible ? '' : 'display'}`}
    >
      <form className="profil-form" onSubmit={handleSubmit}>
        <DateRangePickerComp legend="Votre dispo" />
        <div className="button-container">
          <Button prop="Enregistrer" />
          <button
            className="popup-close-button"
            type="button"
            onClick={hideDateContainer}
          >
            Fermer
          </button>
        </div>
      </form>
    </div>
  );
}

export default DateFormUpdate;
