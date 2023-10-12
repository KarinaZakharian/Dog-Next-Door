/* eslint-disable prettier/prettier */
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import swal from 'sweetalert';
import { success, updateSignupForm } from '../../../store/reducers/profil-form';

import Input from '../../InputType/Input/Input';
import Button from '../../InputType/Button/Button';
import './ProfilForm.scss';
import close_icon from '../../../assets/icons8-close-64.png';

import { useAppDispatch, useAppSelector } from '../../../hooks/redux';

import {
  emailSchema,
  passwordSchema,
  firstnameSchema,
  lastnameSchema,
  citySchema,
} from '../../../Validations/UserValidation';
import AutoComplete from '../../InputType/Addresse/Addresse';
import { SignupProps } from '../../../@types/user';

function SignupForm({
  isSignupContainerVisible,
  setIsSignupContainerVisible,
}: SignupProps) {
  // Initialize navigation and dispatch
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  // Function to hide the booking container
  const hideSignupContainer = () => {
    setIsSignupContainerVisible(false);
  };

  const [emailValid, setEmailIsValid] = useState(true);
  const [passwordValid, setPasswordIsValid] = useState(true);
  const [firstnameValid, setfirstnameIsValid] = useState(true);
  const [lastnameValid, setlastnameIsValid] = useState(true);
  const [cityValid, setCityIsValid] = useState(true);
  const [coordinates, setCoordinates] = useState({ x: 0, y: 0 });

  const myMessage = useAppSelector((state) => state.profilForm.myMessage);
  const myError = useAppSelector((state) => state.profilForm.myError);

  // Function to handle form submission
  const handleMySubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const form = event.currentTarget;
    const formData = new FormData(form);
    formData.append('longitude', coordinates.x.toString());
    formData.append('latitude', coordinates.y.toString());
    const objData = Object.fromEntries(formData);
    console.log('body envoyé dans la requête du signup', objData);

    // Validation of email using Yup with emailSchema, change the input color, and display an error message in case of validation failure
    const emailIsValid = await emailSchema.isValid({
      email: `${objData.email}`,
    });
    setEmailIsValid(emailIsValid);

    // Validation of password using Yup with emailSchema, change the input color, and display an error message in case of validation failure
    const passwordIsValid = await passwordSchema.isValid({
      user_password: `${objData.user_password}`,
    });
    setPasswordIsValid(passwordIsValid);

    // Validation of firstname using Yup with emailSchema, change the input color, and display an error message in case of validation failure
    const firstnameIsValid = await firstnameSchema.isValid({
      firstname: `${objData.firstname}`,
    });
    setfirstnameIsValid(firstnameIsValid);
    // Validation of firstname using Yup with emailSchema, change the input color, and display an error message in case of validation failure
    const lastnameIsValid = await lastnameSchema.isValid({
      lastname: `${objData.lastname}`,
    });
    setlastnameIsValid(lastnameIsValid);

    const cityIsValid = await citySchema.isValid({
      city: `${objData.city}`,
    });
    setCityIsValid(cityIsValid);

    if (
      emailIsValid &&
      passwordIsValid &&
      firstnameIsValid &&
      lastnameIsValid &&
      cityIsValid
    ) {
      dispatch(updateSignupForm(formData));
    }
  };

  useEffect(() => {
    console.log('error', myError);
    console.log('message', myMessage);

    if (!myError && myMessage) {
      swal(`${myMessage}`, {
        icon: 'success',
        timer: 1000,
      });
      setTimeout(() => {
        dispatch(success());
        hideSignupContainer();
      }, 1000);
    }

    if (myError) {
      swal(`${myError}`, {
        icon: 'error',
        button: true,
      });
    }
  }, [myError, myMessage]);

  return (
    <div
      className={`form-container ${isSignupContainerVisible ? '' : 'display'}`}
    >
      <div className="booking-card">
        <button className="close-button" onClick={hideSignupContainer}>
          <img className="close-button__image" src={close_icon} alt="Cat" />
        </button>
      </div>
      <form className="profil-form" onSubmit={handleMySubmit}>
        <p className="form__title">
          Complétez les informations demandées pour que votre profil soit
          approuvé
        </p>
        <Input
          name="lastname"
          type="text"
          placeholder="Nom"
          aria-label="Votre Nom"
          style={{ borderColor: lastnameValid ? 'initial' : 'red' }}
        />
        {!lastnameValid && <p className="error">Inscrivez votre nom</p>}
        <Input
          name="firstname"
          type="text"
          placeholder="Prénom"
          aria-label="Votre Prenom"
          style={{ borderColor: firstnameValid ? 'initial' : 'red' }}
        />
        {!firstnameValid && <p className="error">Inscrivez votre prénom</p>}
        <AutoComplete
          style={{ borderColor: cityValid ? 'initial' : 'red' }}
          setCoordinates={setCoordinates}
        />
        {!cityValid && <p className="error">Inscrivez votre adresse</p>}
        <Input
          name="email"
          type="email"
          placeholder="Adresse E-mail"
          aria-label="Adresse E-mail"
          style={{ borderColor: emailValid ? 'initial' : 'red' }}
        />
        {!emailValid && (
          <p className="error">Votre adresse e-mail n&apos;est pas valide</p>
        )}
        <Input
          name="user_password"
          type="password"
          placeholder="Mot de passe"
          aria-label="Mot de passe"
          style={{ borderColor: passwordValid ? 'initial' : 'red' }}
        />
        {!passwordValid && (
          <p className="error">Votre password n'est pas valide</p>
        )}

        <Button prop="Enregistrer" />
      </form>
    </div>
  );
}

export default SignupForm;
