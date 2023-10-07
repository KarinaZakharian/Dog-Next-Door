/* eslint-disable prettier/prettier */
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import swal from 'sweetalert';

import Input from '../../InputType/Input/Input';
import Button from '../../InputType/Button/Button';
import Header from '../../PageComponents/Header/Header';
import Footer from '../../PageComponents/Footer/Footer';
import AutoComplete from '../../InputType/Addresse/Addresse';
import './Signup.scss';

import { useAppDispatch, useAppSelector } from '../../../hooks/redux';
import { signup, success } from '../../../store/reducers/signup';
import {
  emailSchema,
  passwordSchema,
  firstnameSchema,
  lastnameSchema,
  citySchema,
} from '../../../Validations/UserValidation';

function SignUp() {
  const [emailValid, setEmailIsValid] = useState(true);
  const [passwordValid, setPasswordIsValid] = useState(true);
  const [firstnameValid, setfirstnameIsValid] = useState(true);
  const [lastnameValid, setlastnameIsValid] = useState(true);
  const [cityValid, setCityIsValid] = useState(true);
  const [coordinates, setCoordinates] = useState({ x: 0, y: 0 });
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const error = useAppSelector((state) => state.signup.error);
  // const firstname = useAppSelector((state) => state.signup.firstname);
  const message = useAppSelector((state) => state.signup.message);
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
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
      dispatch(signup(formData));
    }
  };

  useEffect(() => {
    console.log('error', error);
    console.log('message', message);

    if (!error && message) {
      swal(`${message}`, {
        text: message,
        icon: 'success',
        timer: 1000,
      });
      setTimeout(() => {
        dispatch(success());
        navigate('/login', { replace: true });
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
    <div className="page-wrapper">
      <Header />

      <main className="main-signup">
        <div className="container-signup">
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
              <p className="error">
                Votre adresse e-mail n&apos;est pas valide
              </p>
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

            <Button prop="S'inscrire" />
          </form>
        </div>
      </main>
      <Footer />
    </div>
  );
}

export default SignUp;
