import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import swal from 'sweetalert';

import Input from '../../InputType/Input/Input';
import Button from '../../InputType/Button/Button';
import Header from '../../PageComponents/Header/Header';
import Footer from '../../PageComponents/Footer/Footer';
import Main from '../../PageComponents/Main/Main';
import './Login.scss';

import { useAppDispatch, useAppSelector } from '../../../hooks/redux';
import { login } from '../../../store/reducers/login';
import { loginSchema } from '../../../Validations/UserValidation';

function Login() {
  const firstname = useAppSelector((state) => state.login.firstname);
  const error = useAppSelector((state) => state.login.error);
  // console.log('error:', error);
  console.log('firstname', firstname);
  console.log('firstname', firstname);

  const [valid, setIsValid] = useState(true);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const form = event.currentTarget;
    const formData = new FormData(form);
    const objData = Object.fromEntries(formData);
    // console.log(objData);
    // console.log(objData);

    const isValid = await loginSchema.isValid(objData);
    setIsValid(isValid);

    if (isValid) {
      dispatch(login(formData));
    }
  };
  useEffect(() => {
    if (firstname) {
      swal({
        icon: 'success',
        timer: 1000,
      });

      setTimeout(() => {
        navigate('/', { replace: true });
      }, 1000);
    }

    if (error) {
      swal(`${error}`, {
        icon: 'error',
        button: true,
      });
    }
  }, [firstname, error]);

  return (
    <div className="page-wrapper">
      <Header />
      {/* <Main /> */}
      <main className="main-login">
        <div className="container">
          <form className="login__form" onSubmit={handleSubmit}>
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
            {!valid && (
              <p className="error">
                Le mot de passe ou l'email que vous avez saisi est incorrect.
                Veuillez réessayer.
              </p>
            )}
            <Button prop="Connexion" />
          </form>
        </div>
      </main>
      <Footer />
    </div>
  );
}

export default Login;
