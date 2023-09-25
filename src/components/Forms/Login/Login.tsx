/* eslint-disable prettier/prettier */
import { useNavigate } from 'react-router-dom';
import Input from '../../InputType/Input/Input';
import Button from '../../InputType/Button/Button';
import Header from '../../PageComponents/Header/Header';
import Footer from '../../PageComponents/Footer/Footer';
import './Login.scss';
import picture from '../../../assets/woman-2711279.jpg';

import { useAppDispatch } from '../../../hooks/redux';
import { login } from '../../../store/reducers/login';

function Login() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const form = event.currentTarget;
    const formData = new FormData(form);

    // const formJson = Object.fromEntries(formData.entries());
    // console.log(formJson);
    // je veux dispatcher une action pour me connecter
    // → appel API : est-on dans la BDD ?
    // → « action asynchrone » = thunk
    dispatch(login(formData));
    navigate('/', { replace: true });
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
            />

            <Input
              label="password"
              name="password"
              type="password"
              placeholder="Mot de passe"
              aria-label="Mot de passe"
            />

            <Button prop="Submit" />
          </form>
        </div>
      </main>
      <Footer />
    </div>
  );
}

export default Login;
