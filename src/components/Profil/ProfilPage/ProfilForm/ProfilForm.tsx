/* eslint-disable prettier/prettier */
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import swal from 'sweetalert';

import Input from '../../../InputType/Input/Input';
import Button from '../../../InputType/Button/Button';
import Header from '../../../PageComponents/Header/Header';
import Footer from '../../../PageComponents/Footer/Footer';
import './ProfilForm.scss';

import { useAppDispatch, useAppSelector } from '../../../../hooks/redux';
import TextareaInput from '../../../InputType/Textarea/Textarea';
import Radio from '../../../InputType/RadioSimple/RadioSimple';
import CheckboxGroup from '../../../InputType/Checkbox/Checkbox';

function ProfilForm() {
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

  const navigate = useNavigate();
  const dispatch = useAppDispatch();

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
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const form = event.currentTarget;
    const formData = new FormData(form);

    // Add the selectedOptions to the formData

    formData.append('additionalOptions', options);
    formData.append('size', size);

    const objData = Object.fromEntries(formData);
    console.log(objData);
    // console.log(objData);
  };

  return (
    <div className="page-wrapper">
      <Header />

      <main className="main">
        <div className="container">
          <form onSubmit={handleSubmit}>
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
              <Radio
                name="accommodation"
                id="maison"
                picked={pickedAccomodation}
                value="Maison"
                onRadioChange={handleAccomodationChange}
              />
              <Radio
                name="accommodation"
                id="appartement"
                picked={pickedAccomodation}
                value="Appartement"
                onRadioChange={handleAccomodationChange}
              />
              <Radio
                name="accommodation"
                id="ferme"
                picked={pickedAccomodation}
                value="Ferme"
                onRadioChange={handleAccomodationChange}
              />
            </div>
            <p>Quel type de jardin avez-vous ?</p>
            <div className="radio-wrapper">
              <Radio
                name="garden"
                id="clos"
                picked={pickedGarden}
                value="Jardin clos"
                onRadioChange={handleGardenChange}
              />
              <Radio
                name="garden"
                id="non-clo"
                picked={pickedGarden}
                value="Jardin non clos"
                onRadioChange={handleGardenChange}
              />
              <Radio
                name="garden"
                id="pas-jardin"
                picked={pickedGarden}
                value="Pas de jardin"
                onRadioChange={handleGardenChange}
              />
            </div>
            <CheckboxGroup
              legend="À quoi les propriétaires peuvent-ils s'attendre lorsqu'ils vous confient la garde de leur animal de compagnie ?"
              options={options}
            />
            <CheckboxGroup
              legend="Quels types d'animaux pouvez-vous accueillir à votre domicile ?"
              options={size}
            />
            <p>
              À quelle fréquence pouvez-vous emmener les animaux que vous gardez
              faire leurs besoins ?
            </p>
            <div className="radio-wrapper">
              <Radio
                name="walk"
                id="1"
                picked={pickedWalk}
                value="Entre 0 et 2 heures"
                onRadioChange={handleWalkChange}
              />
              <Radio
                name="walk"
                id="2"
                picked={pickedWalk}
                value="Entre 2 et 4 heures"
                onRadioChange={handleWalkChange}
              />
              <Radio
                name="walk"
                id="3"
                picked={pickedWalk}
                value="Entre 4 et 8 heures"
                onRadioChange={handleWalkChange}
              />
              <Radio
                name="walk"
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
