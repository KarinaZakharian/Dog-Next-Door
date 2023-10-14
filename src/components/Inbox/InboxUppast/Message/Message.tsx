import React from 'react';
import { useEffect } from 'react';
import swal from 'sweetalert';

import { useAppDispatch, useAppSelector } from '../../../../hooks/redux';
import { success, fillBookingForm } from '../../../../store/reducers/booking';

// import close_icon from '../../../../assets/icons/close_icon.svg';

import Button from '../../../InputType/Button/Button';
import close_icon from '../../../../assets/icons8-close-64.png'

import TextareaInput from '../../../InputType/Textarea/Textarea';
import { MessageProps } from '../../../../@types/user';
import { sendMessage } from '../../../../store/reducers/massage-inbox';

function Comment({ isMessageOpen, setMessageOpen, clientId }: MessageProps) {
  // Initialize navigation and dispatch
  const messageError = useAppSelector((state) => state.inboxUppast.messageError);
  const messageMessage = useAppSelector((state) => state.inboxUppast.messageMessage);
  function handelMessage() {
    setMessageOpen(false);
  }

  const dispatch = useAppDispatch();

  // Function to handle form submission
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const form = event.currentTarget;
    const formData = new FormData(form);
    formData.append('clientId', clientId);

    const objData = Object.fromEntries(formData);
    console.log(objData);

    dispatch(sendMessage(formData));

    // dispatch(fillProfilForm(formData));
  };

  useEffect(() => {
    // Handle success or error messages
    if (!messageError && messageMessage) {
      swal({
        icon: 'success',
        timer: 1000,
      });
      setTimeout(() => {
        dispatch(success());
        navigate('/', { replace: true });
      }, 1000);
    }

    if (messageError) {
      swal(`${messageError}`, {
        icon: 'error',
        timer: 1000,
      });
    }
  }, [messageError, messageMessage]);

  return (
    <div className={`comment-container ${isMessageOpen ? '' : 'display'}`}>
      <div className="comment-card">
        <button className="close-button" onClick={handelMessage}>
          <img className="close-button__image" src={close_icon} alt="Cat" />
        </button>
        <form className="comment-form" onSubmit={handleSubmit}>
          <p className="comment-card__title">
            Sélectionnez les dates d'arrivée et de départ
          </p>
          <TextareaInput
            label={'Add your comment'}
            placeholder={'comment'}
            name={'comment'}
            rows={10}
            cols={10}
          />
          <Button prop="Submit" />
        </form>
      </div>
    </div>
  );
}

export default Comment;
