/* eslint-disable prettier/prettier */

import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import swal from 'sweetalert';

import { useState } from 'react';
import swal from 'sweetalert';

import Input from '../../InputType/Input/Input';
import Button from '../../InputType/Button/Button';
import Header from '../../PageComponents/Header/Header';
import Footer from '../../PageComponents/Footer/Footer';
import './Signup.scss';

import { useAppDispatch, useAppSelector } from '../../../hooks/redux';
import { signup } from '../../../store/reducers/signup';

function SignUp() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const error = useAppSelector((state) => state.signup.error);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const form = event.currentTarget;
    const formData = new FormData(form);

<<<<<<< HEAD
=======
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
      lastname: `${objData.firstname}`,
    });
    setlastnameIsValid(lastnameIsValid);

    const cityIsValid = await citySchema.isValid({
      city: `${objData.firstname}`,
    });
    setCityIsValid(cityIsValid);

    if (
      emailIsValid &&
      passwordIsValid &&
      firstnameIsValid &&
      lastnameIsValid &&
      cityIsValid &&
      !error
    ) {
      swal('Nous vous remercions de vous être inscrit sur notre site', {
        icon: 'success',
        buttons: [false],
        timer: 1500,
      });
      setTimeout(() => {
        navigate('/login', { replace: true });
        dispatch(signup(formData));
      }, 1500);
    } else if (error) {
      swal(`${error}`, {
        icon: 'error',
      });
      console.log('error');
    } else {
      swal("Erreur d'inscription", {
        icon: 'error',
      });
      console.log('form is not valid');
    }
>>>>>>> 9deeb12 (Add error handling for Signup)
    // const formJson = Object.fromEntries(formData.entries());
    // console.log(formJson);
    // je veux dispatcher une action pour me connecter
    // → appel API : est-on dans la BDD ?
    // → « action asynchrone » = thunk
    // navigate('/login', { replace: true });
    // dispatch(signup(formData));
  };
  return (
    <div className="page-wrapper">
      <Header />

      <main className="main">
        <div className="container">
          <form className="form" onSubmit={handleSubmit}>
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
            />
            <Input
              name="adresse"
              type="text"
              placeholder="Votre Adresse"
              aria-label="Votre Adresse"
            />
            <Input
              name="code_postal"
              type="text"
              placeholder="Code Postal"
              aria-label="Votre Code Postal"
            />
            <Input
              name="ville"
              type="text"
              placeholder="Votre Ville"
              aria-label="Votre Ville"
            />
            <Input
              name="email"
              type="email"
              placeholder="Adresse E-mail"
              aria-label="Adresse E-mail"
              style={{ borderColor: emailValid ? 'initial' : 'red' }}
            />
            {!emailValid && (
              <p className="error">Votre adresse e-mail n'est pas valide</p>
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

            <Button prop="Submit" />
          </form>
        </div>
      </main>
      <Footer />
    </div>
  );
}

export default SignUp;
