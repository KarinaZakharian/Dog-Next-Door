/* eslint-disable prettier/prettier */

import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import swal from 'sweetalert';

import Input from '../../InputType/Input/Input';
import Button from '../../InputType/Button/Button';
import Header from '../../PageComponents/Header/Header';
import Footer from '../../PageComponents/Footer/Footer';
import AutoComplete from '../../InputType/Addresse/Addresse';
import './Signup.scss';

import { useAppDispatch } from '../../../hooks/redux';
import { signup } from '../../../store/reducers/signup';
import {
  emailSchema,
  passwordSchema,
  firstnameSchema,
  lastnameSchema,
} from '../../../Validations/UserValidation';

function SignUp() {
  const [emailValid, setEmailIsValid] = useState(true);
  const [passwordValid, setPasswordIsValid] = useState(true);
  const [firstnameValid, setfirstnameIsValid] = useState(true);
  const [lastnameValid, setlastnameIsValid] = useState(true);

  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const form = event.currentTarget;
    const formData = new FormData(form);
    const objData = Object.fromEntries(formData);

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

    if (
      emailIsValid &&
      passwordIsValid &&
      firstnameIsValid &&
      lastnameIsValid
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
    } else {
      swal("Erreur d'inscription", {
        icon: 'error',
      });
      console.log('form is not valid');
    }
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
              style={{ borderColor: firstnameValid ? 'initial' : 'red' }}
            />
            {!firstnameValid && <p className="error">Inscrivez votre prénom</p>}
            <AutoComplete />
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
