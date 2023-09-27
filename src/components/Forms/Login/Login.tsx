/* eslint-disable prettier/prettier */
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import swal from 'sweetalert';

import Input from '../../InputType/Input/Input';
import Button from '../../InputType/Button/Button';
import Header from '../../PageComponents/Header/Header';
import Footer from '../../PageComponents/Footer/Footer';
import './Login.scss';

import { useAppDispatch, useAppSelector } from '../../../hooks/redux';
import { login } from '../../../store/reducers/login';
import { loginSchema } from '../../../Validations/UserValidation';

function Login() {
  const firstname = useAppSelector((state) => state.login.firstname);
  const error = useAppSelector((state) => state.login.error);
  console.log(error);
  console.log(firstname);

  const [valid, setIsValid] = useState(true);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const form = event.currentTarget;
    const formData = new FormData(form);
    const objData = Object.fromEntries(formData);
    console.log(objData);

    const isValid = await loginSchema.isValid(objData);
    setIsValid(isValid);

    if (isValid && !error) {
      swal({
        icon: 'success',
        buttons: [false],
        timer: 1500,
      });
      setTimeout(() => {
        dispatch(login(formData));
        navigate('/', { replace: true });
      }, 1500);
      // const formJson = Object.fromEntries(formData.entries());
      // console.log(formJson);
      // je veux dispatcher une action pour me connecter
      // → appel API : est-on dans la BDD ?
      // → « action asynchrone » = thunk
    }
    if (!isValid) {
      swal({
        icon: 'error',
      });
    }
    if (error) {
      swal(`${error}`, {
        icon: 'error',
      });
    }
  };
  return (
    <div className="page-wrapper">
      <Header />

      <main className="main">
        <div className="container">
          <form onSubmit={handleSubmit}>
            <Input
              label="email"
              name="email"
              type="email"
              placeholder="E-mail"
              aria-label="Adresse E-mail"
              style={{ borderColor: valid ? 'initial' : 'red' }}
            />

            <Input
              label="password"
              name="user_password"
              type="password"
              placeholder="Mot de passe"
              aria-label="Mot de passe"
              style={{ borderColor: valid ? 'initial' : 'red' }}
            />
            {!valid && (
              <p className="error">
                Le mot de passe ou l'email que vous avez saisi est incorrect.
                Veuillez réessayer.
              </p>
            )}
            <Button prop="Submit" />
          </form>
        </div>
      </main>
      <Footer />
    </div>
  );
}

export default Login;
