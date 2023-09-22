/* eslint-disable prettier/prettier */
import Input from '../InputType/Input/Input';
import Button from '../InputType/Button/Button';
import './Login.scss';

function Login() {
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const form = event.currentTarget;
    const formData = new FormData(form);

    // const formJson = Object.fromEntries(formData.entries());
    // console.log(formJson);
    // je veux dispatcher une action pour me connecter
    // → appel API : est-on dans la BDD ?
    // → « action asynchrone » = thunk
    const objData = Object.fromEntries(formData.entries());
    console.log(objData);
  };
  return (
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
  );
}

export default Login;
