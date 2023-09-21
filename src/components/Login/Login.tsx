
import Input from '../InputType/Input/Input';
import Button from '../InputType/Button/Button';
import './Login.scss';

function Login() {
  return (
    <form>
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
