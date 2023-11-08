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
  const dateError = useAppSelector((state) => state.profil.user.dateError);
  const dateMessage = useAppSelector((state) => state.profil.user.dateMessage);

  function handleSubmit(event: FormEvent<HTMLFormElement>): void {
    event.preventDefault();

    const form = event.currentTarget;
    const formData = new FormData(form);
    dispatch(fillDateForm(formData));
  }

  useEffect(() => {
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

export default DateForm;
