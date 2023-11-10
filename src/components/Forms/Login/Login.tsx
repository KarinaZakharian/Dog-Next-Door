import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import swal from 'sweetalert';

import { useAppDispatch, useAppSelector } from '../../../hooks/redux';
import { login } from '../../../store/reducers/profil';
import { loginSchema } from '../../../Validations/UserValidation';

import Input from '../../InputType/Input/Input';
import Button from '../../InputType/Button/Button';
import Header from '../../PageComponents/Header/Header';
import Footer from '../../PageComponents/Footer/Footer';
import Main from '../../PageComponents/Main/Main';

import './Login.scss';

function Login() {
  // Initialize navigation and dispatch
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  // Get user data from Redux store
  const firstname = useAppSelector((state) => state.profil.user.firstname);
  const error = useAppSelector((state) => state.profil.user.error);

  // State to manage form validation
  const [valid, setIsValid] = useState(true);

  // Function to handle form submission
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const form = event.currentTarget;
    const formData = new FormData(form);
    const objData = Object.fromEntries(formData);

    // Validate the form data using a schema
    const isValid = await loginSchema.isValid(objData);
    setIsValid(isValid);

    if (isValid) {
      dispatch(login(formData));
    }
  };
  // Handle success and error messages using useEffect
  useEffect(() => {
    if (firstname) {
      // Show a success message using a modal
      swal({
        icon: 'success',
        timer: 1000,
      });

      setTimeout(() => {
        // Redirect to the home page after a successful login
        navigate('/', { replace: true });
      }, 1000);
    }

    if (error) {
      // Show an error message using a modal
      swal(`${error}`, {
        icon: 'error',
        buttons: [true],
      });
    }
  }, [firstname, error, navigate]);

  return (
    <div className="page-wrapper">
      <Header />
      <Main>
        <main className="main-login">
          <div className="container-login">
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
              {/* Display an error message for invalid login */}
              {!valid && (
                <p className="error">
                  Le mot de passe ou l&aps;email que vous avez saisi est
                  incorrect. Veuillez réessayer.
                </p>
              )}
              <Button prop="Connexion" />
            </form>
          </div>
        </main>
      </Main>
      <Footer />
    </div>
  );
}

export default Login;
