import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import swal from 'sweetalert';
import * as Yup from 'yup';

import { useAppDispatch, useAppSelector } from '../../../hooks/redux';
import { signup, success } from '../../../store/reducers/signup';
import { signupSchema } from '../../../Validations/UserValidation';

import Input from '../../InputType/Input/Input';
import Button from '../../InputType/Button/Button';
import Header from '../../PageComponents/Header/Header';
import Footer from '../../PageComponents/Footer/Footer';
import AutoComplete from '../../InputType/Addresse/Addresse';
import Main from '../../PageComponents/Main/Main';
import './Signup.scss';

interface FormErrors {
  lastname?: string;
  firstname?: string;
  user_address?: string;
  user_password?: string;
  email?: string;
}

const initialErrors: FormErrors = {
  lastname: undefined,
  firstname: undefined,
  user_address: undefined,
  user_password: undefined,
  email: undefined,
};

function SignUp() {
  // Initialize navigation and dispatch

  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const [errors, setErrors] = useState<FormErrors>({});
  // State to store coordinates for address selection
  const [coordinates, setCoordinates] = useState({ x: 0, y: 0 });

  // Get error and success messages from the Redux store
  const errorMessage = useAppSelector((state) => state.signup.error);
  const message = useAppSelector((state) => state.signup.message);
  //console.log(errorMessage);
  console.log(errors.user_address);

  const signUp = async (formData: FormData) => {
    const objData = Object.fromEntries(formData);
    try {
      // Awaiting for Yup to validate text
      await signupSchema.validate(
        {
          lastname: objData.lastname,
          firstname: objData.firstname,
          user_address: objData.user_address,
          user_password: objData.user_password,
          email: objData.email,
        },
        { abortEarly: false }
      );

      // Reseting Warnings and displaying success message if all goes well
      setErrors({});
      dispatch(signup(formData));
    } catch (error) {
      // Reseting Succes Message

      // Setting error messages identified by Yup
      if (error instanceof Yup.ValidationError) {
        // Extracting Yup specific validation errors from list of total errors
        const yupErrors = {};
        error.inner.forEach((innerError) => {
          yupErrors[innerError.path] = innerError.message;
        });

        // Saving extracted errors
        setErrors(yupErrors);
      }
    }
  };

  // Function to handle form submission
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const form = event.currentTarget;
    const formData = new FormData(form);
    // Append coordinates to the form data
    formData.append('longitude', coordinates.x.toString());
    formData.append('latitude', coordinates.y.toString());
    await signUp(formData);
  };
  // Handle success and error messages using useEffect
  useEffect(() => {
    if (!errorMessage && message) {
      // Show a success message using a modal
      swal(`${message}`, {
        text: message,
        icon: 'success',
        timer: 1000,
      });
      setTimeout(() => {
        dispatch(success());
        // Redirect to the login page after a successful login
        navigate('/login', { replace: true });
      }, 1000);
    }

    if (errorMessage) {
      // Show an error message using a modal
      swal(`${errorMessage}`, {
        icon: 'error',
        buttons: [true],
      });
      dispatch(success());
    }
  }, [dispatch, errorMessage, message, navigate]);

  // console.log(errors);
  //console.log(successValidation);

  return (
    <div className="page-wrapper">
      <Header />
      <Main>
        <main className="main-signup">
          <div className="container-signup">
            <form className="form" onSubmit={handleSubmit}>
              <Input
                name="lastname"
                type="text"
                placeholder="Nom"
                aria-label="Votre Nom"
                style={{ borderColor: errors.lastname ? 'red' : 'initial' }}
              />

              {errors.lastname && <p className="error">{errors.lastname}</p>}
              <Input
                name="firstname"
                type="text"
                placeholder="Prénom"
                aria-label="Votre Prenom"
                style={{ borderColor: errors.firstname ? 'red' : 'initial' }}
              />
              {errors.firstname && <p className="error">{errors.firstname}</p>}
              <AutoComplete
                setCoordinates={setCoordinates}
                style={{ borderColor: errors.user_address ? 'red' : 'initial' }}
              />

              {errors.user_address && (
                <p className="error">{errors.user_address}</p>
              )}

              <Input
                name="email"
                type="email"
                placeholder="Adresse E-mail"
                aria-label="Adresse E-mail"
                style={{ borderColor: errors.email ? 'red' : 'initial' }}
              />
              {errors.email && <p className="error">{errors.email}</p>}
              <Input
                name="user_password"
                type="password"
                placeholder="Mot de passe"
                aria-label="Mot de passe"
                style={{
                  borderColor: errors.user_password ? 'red' : 'initial',
                }}
              />
              {errors.user_password && (
                <p className="error">{errors.user_password}</p>
              )}
              <Button prop="S'inscrire" />
            </form>
          </div>
        </main>
      </Main>
      <Footer />
    </div>
  );
}

export default SignUp;
