import { FormEvent, useEffect, useState } from 'react';
import swal from 'sweetalert';
import { fillProfilForm, success } from '../../../store/reducers/profil-form';
import { useAppDispatch, useAppSelector } from '../../../hooks/redux';
import { FormProps } from '../../../@types/user';

import TextareaInput from '../../InputType/Textarea/Textarea';
import RadioSimple from '../../InputType/RadioSimple/RadioSimple';
import CheckboxGroup from '../../InputType/Checkbox/Checkbox';
import Button from '../../InputType/Button/Button';

import './ProfilForm.scss';
import close_icon from '../../../assets/icons8-close-64.png';

function ProfilForm({
  isFormContainerVisible,
  setIsFormContainerVisible,
}: FormProps) {
  const hideFormContainer = () => {
    setIsFormContainerVisible(false);
  };
  const dispatch = useAppDispatch();

  const error = useAppSelector((state) => state.profilForm.fillError);
  const message = useAppSelector((state) => state.profilForm.fillMessage);

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

  function handleSubmit(event: FormEvent<HTMLFormElement>): void {
    event.preventDefault();

    const form = event.currentTarget;
    const formData = new FormData(form);

    dispatch(fillProfilForm(formData));
  }

  useEffect(() => {
    if (!error && message) {
      swal(`${message}`, {
        icon: 'success',
        timer: 1000,
      });
      setTimeout(() => {
        dispatch(success());
        hideFormContainer();
      }, 1000);
    }

    if (error) {
      swal(`${error}`, {
        icon: 'error',
        buttons: [true],
      });
    }
  }, [error, message]);

  return (
    <div
      className={`form-container ${isFormContainerVisible ? '' : 'display'}`}
    >
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
        <p className="label-form">Mon logement</p>
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
        <p className="label-form">Quel type de jardin avez-vous ?</p>
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
        <p className="label-form">
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
        <div className="button-container">
          <Button prop="Enregistrer" />
          <button
            className="popup-close-button"
            type="button"
            onClick={hideFormContainer}
          >
            Fermer
          </button>
        </div>
      </form>
    </div>
  );
}

export default ProfilForm;
