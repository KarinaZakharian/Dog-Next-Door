/* eslint-disable prettier/prettier */
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import swal from 'sweetalert';
import {
  success,
  fillProfilForm,
  updateSignupForm,
} from '../../../store/reducers/profil-form';

import Input from '../../InputType/Input/Input';
import Button from '../../InputType/Button/Button';
import Header from '../../PageComponents/Header/Header';
import Footer from '../../PageComponents/Footer/Footer';
import './ProfilForm.scss';

import { useAppDispatch, useAppSelector } from '../../../hooks/redux';
import TextareaInput from '../../InputType/Textarea/Textarea';
import RadioSimple from '../../InputType/RadioSimple/RadioSimple';
import CheckboxGroup from '../../InputType/Checkbox/Checkbox';
import DateRangePickerComp from '../../InputType/DatePiker/DateRangePicker';

import {
  emailSchema,
  passwordSchema,
  firstnameSchema,
  lastnameSchema,
  citySchema,
} from '../../../Validations/UserValidation';
import AutoComplete from '../../InputType/Addresse/Addresse';

function ProfilForm() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const error = useAppSelector((state) => state.profilForm.error);
  const message = useAppSelector((state) => state.profilForm.message);
  const myMessage = useAppSelector((state) => state.profilForm.myMessage);
  const myError = useAppSelector((state) => state.profilForm.myError);
  console.log( "profil error, profil message", error,message, 'signup update error, message',myError, myMessage)

  const [emailValid, setEmailIsValid] = useState(true);
  const [passwordValid, setPasswordIsValid] = useState(true);
  const [firstnameValid, setfirstnameIsValid] = useState(true);
  const [lastnameValid, setlastnameIsValid] = useState(true);
  const [cityValid, setCityIsValid] = useState(true);
  const [coordinates, setCoordinates] = useState({ x: 0, y: 0 });

  const [selectedOptions1, setSelectedOptions1] = useState<string[]>([]);
  const [selectedOptions2, setSelectedOptions2] = useState<string[]>([]);

  const handleSelectionChange1 = (selectedOptions: string[]) => {
    setSelectedOptions1(selectedOptions);
  };

  const handleSelectionChange2 = (selectedOptions: string[]) => {
    setSelectedOptions2(selectedOptions);
  };

  const options = [
    'Maison fumeur',
    'Enfant âgés de 0 à 5 ans',
    'Chiens autorisés sur le canapé',
    'Animaux en cage à la maison',
    'Aucune de ces réponses',
  ];
  const size = [
    'Petit (0-7 kg)',
    'Moyen (7-18 kg)',
    'Grand (18-45 kg)',
    'Géant (45 kg)',
  ];

  const [pickedAccomodation, setAccomodation] = useState('');
  function handleAccomodationChange(value: string): void {
    setAccomodation(value);
  }

  const [pickedGarden, setGarden] = useState('');
  function handleGardenChange(value: string): void {
    setGarden(value);
  }

  const [pickedWalk, setWalk] = useState('');
  function handleWalkChange(value: string): void {
    setWalk(value);
  }

  const handleMySubmit = async (event: React.FormEvent<HTMLFormElement>) => {
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

    if (  emailIsValid &&
      passwordIsValid &&
      firstnameIsValid &&
      lastnameIsValid &&
      cityIsValid) {
      dispatch(updateSignupForm(formData));
    }
  };

  useEffect(() => {
    console.log('error', error);
    console.log('message', message);

    if (!myError && myMessage) {
      swal(`${myMessage}`, {
        
        icon: 'success',
        timer: 1000,
      });
      setTimeout(() => {
        dispatch(success());
        navigate('/account', { replace: true });
      }, 1000);
    }

    if (myError) {
      swal(`${myError}`, {
        icon: 'error',
        button: true,
      });
    }
  }, [myError, myMessage]);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const form = event.currentTarget;
    const formData = new FormData(form);

    const objData = Object.fromEntries(formData);
    console.log(objData);

    dispatch(fillProfilForm(formData));
    // console.log(objData);
  };

  useEffect(() => {
    if (!error && message) {
      swal({
        icon: 'success',
        timer: 1000,
      });
      setTimeout(() => {
        dispatch(success());
        navigate('/account', { replace: true });
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

      <main className="main">
        <div className="container">
          <form className="profil-form" onSubmit={handleMySubmit}>
            <p className="form__title">
              Complétez les informations demandées pour que votre profil soit
              approuvé
            </p>
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
            <DateRangePickerComp legend="Disponibilité" />
            <Button prop="Enregistrer" />
          </form>
          <form className="profil-form" onSubmit={handleSubmit}>
            <p className="form__title">
              Complétez les informations demandées pour que votre profil soit
              approuvé
            </p>
            <TextareaInput
              name="description"
              label="Ma description"
              placeholder="About me"
            />
            <p>Mon logement</p>
            <div className="radio-wrapper">
              <RadioSimple
                name="accomodation"
                id="maison"
                picked={pickedAccomodation}
                value="Maison"
                onRadioChange={handleAccomodationChange}
              />
              <RadioSimple
                name="accomodation"
                id="appartement"
                picked={pickedAccomodation}
                value="Appartement"
                onRadioChange={handleAccomodationChange}
              />
              <RadioSimple
                name="accomodation"
                id="ferme"
                picked={pickedAccomodation}
                value="Ferme"
                onRadioChange={handleAccomodationChange}
              />
            </div>
            <p>Quel type de jardin avez-vous ?</p>
            <div className="radio-wrapper">
              <RadioSimple
                name="garden"
                id="clos"
                picked={pickedGarden}
                value="Jardin clos"
                onRadioChange={handleGardenChange}
              />
              <RadioSimple
                name="garden"
                id="non-clo"
                picked={pickedGarden}
                value="Jardin non clos"
                onRadioChange={handleGardenChange}
              />
              <RadioSimple
                name="garden"
                id="pas-jardin"
                picked={pickedGarden}
                value="Pas de jardin"
                onRadioChange={handleGardenChange}
              />
            </div>
            <CheckboxGroup
              name="additionnal_information"
              legend="À quoi les propriétaires peuvent-ils s'attendre lorsqu'ils vous confient la garde de leur animal de compagnie ?"
              options={options}
              onSelectionChange={handleSelectionChange1}
            />
            <CheckboxGroup
              name="animal_size"
              legend="Quels types d'animaux pouvez-vous accueillir à votre domicile ?"
              options={size}
              onSelectionChange={handleSelectionChange2}
            />
            <p>
              À quelle fréquence pouvez-vous emmener les animaux que vous gardez
              faire leurs besoins ?
            </p>
            <div className="radio-wrapper">
              <RadioSimple
                name="walking_duration"
                id="1"
                picked={pickedWalk}
                value="Entre 0 et 2 heures"
                onRadioChange={handleWalkChange}
              />
              <RadioSimple
                name="walking_duration"
                id="2"
                picked={pickedWalk}
                value="Entre 2 et 4 heures"
                onRadioChange={handleWalkChange}
              />
              <RadioSimple
                name="walking_duration"
                id="3"
                picked={pickedWalk}
                value="Entre 4 et 8 heures"
                onRadioChange={handleWalkChange}
              />
              <RadioSimple
                name="walking_duration"
                id="4"
                picked={pickedWalk}
                value="+ 8 heures"
                onRadioChange={handleWalkChange}
              />
            </div>

            <Button prop="Enregistrer" />
          </form>
        </div>
      </main>
      <Footer />
    </div>
  );
}

export default ProfilForm;
