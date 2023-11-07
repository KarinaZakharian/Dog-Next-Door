import React from 'react';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import swal from 'sweetalert';
import './Comment.scss';

import { useAppDispatch, useAppSelector } from '../../../../hooks/redux';

// import close_icon from '../../../../assets/icons/close_icon.svg';

import Button from '../../../InputType/Button/Button';
import close_icon from '../../../../assets/icons8-close-64.png';

import TextareaInput from '../../../InputType/Textarea/Textarea';
import { MessageProps } from '../../../../@types/user';
import {
  sendMessage,
  success,
} from '../../../../store/reducers/demandes-inbox';

function Comment({ isMessageOpen, setMessageOpen, clientId }: MessageProps) {
  const navigate = useNavigate();
  // Initialize navigation and dispatch
  const messageError = useAppSelector(
    (state) => state.inboxDemands.messageError
  );
  const messageMessage = useAppSelector(
    (state) => state.inboxDemands.messageMessage
  );
  function handelMessage() {
    setMessageOpen(false);
  }

  const dispatch = useAppDispatch();

  // Function to handle form submission
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const form = event.currentTarget;
    const formData = new FormData(form);
    formData.append('client_id', clientId);

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
      <button className="close-button" onClick={handelMessage}>
        <img className="close-button__image" src={close_icon} alt="Cat" />
      </button>
      <p className="form__title">Veuillez ajouter votre commentaire</p>
      <form className="comment-form" onSubmit={handleSubmit}>
        <TextareaInput
          label=""
          placeholder="Votre commentaire"
          name="comment"
        />
        <Button prop="Ajouter" />
      </form>
    </div>
  );
}

export default Comment;
