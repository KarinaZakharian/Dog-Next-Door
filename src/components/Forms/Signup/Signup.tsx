/* eslint-disable prettier/prettier */
import Input from '../../InputType/Input/Input';
import Button from '../../InputType/Button/Button';
import Header from '../../PageComponents/Header/Header';
import './Signup.scss';

import picture from '../../../assets/woman-2711279.jpg';

import { useAppDispatch } from '../../../hooks/redux';
import { signup } from '../../../store/reducers/signup';

function SignUp() {
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

    dispatch(signup(formData));
  };
  return (
    <>
      <div className="container">
        <Header />
      </div>
      <main>
        <img src={picture} alt="main" />
        <div className="container">
          <form className="form" onSubmit={handleSubmit}>
            <Input
              name="nom"
              type="text"
              placeholder="Nom"
              aria-label="Votre Nom"
            />
            <Input
              name="prenom"
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
            />
            <Input
              name="password"
              type="password"
              placeholder="Mot de passe"
              aria-label="Mot de passe"
            />
            <Button prop="Submit" />
          </form>
        </div>
      </main>
    </>
  );
}

export default SignUp;
