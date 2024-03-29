import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import swal from 'sweetalert';
import { useAppDispatch, useAppSelector } from '../../../hooks/redux';
import { success, updateAnimalForm } from '../../../store/reducers/animal-form';

import Input from '../../InputType/Input/Input';
import Button from '../../InputType/Button/Button';
import RadioSimple from '../../InputType/RadioSimple/RadioSimple';
import Radio from '../../InputType/Radio/Radio';
import CalendarComp from '../../InputType/DatePiker/DateSelect';

import dog from '../../../assets/icons8-dog-100.png';
import cat from '../../../assets/icons8-cat-100.png';
import small from '../../../assets/icons8-dog-20.png';
import medium from '../../../assets/icons8-dog-35.png';
import big from '../../../assets/icons8-dog-55.png';
import geant from '../../../assets/icons8-dog-64.png';
import './AnimalForm.scss';
import { nameSchema, raceSchema } from '../../../Validations/UserValidation';

function AnimalFormUpdate({}) {
  const hideFormContainer = () => {
    navigate('/account', { replace: true });
  };

  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const error = useAppSelector((state) => state.animalForm.updateError);
  const message = useAppSelector((state) => state.animalForm.updateMessage);
  const animal = useAppSelector((state) => state.profil.user.animal);

  // Access specific properties within the 'animal' object
  const type = animal?.type || null;
  const name = animal?.name || null;
  const dateBirth = animal?.birth_date || null;
  const sizeAnimal = animal?.size || null;
  const walk = animal?.walk || null;
  const energy = animal?.energy || null;
  const food = animal?.mealhours || null;
  const race = animal?.race || null;

  // picking  the animal
  const [pickedAnimal, setAnimal] = useState('');
  function handleAnimalChange(value: string): void {
    setAnimal(value);
  }

  //  picking the size of the animal
  const [picked, setPicked] = useState(sizeAnimal || '');
  function handleRadioChange(value: string): void {
    setPicked(value);
  }

  // picking the meal hours
  const [pickedHour, setHour] = useState(food || '');
  function handleHourChange(value: string): void {
    setHour(value);
  }

  // picking the walking hours
  const [pickedWalk, setWalk] = useState(walk || '');
  function handleWalkChange(value: string): void {
    setWalk(value);
  }

  // picking energy level
  const [pickedEnergy, setEnergy] = useState(energy || '');
  function handleEnergyChange(value: string): void {
    setEnergy(value);
  }

  const [nameValid, setNameIsValid] = useState(true);
  const [raceValid, setRaceIsValid] = useState(true);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;
    const formData = new FormData(form);
    console.log(Object.fromEntries(formData));
    const objData = Object.fromEntries(formData);

    const nameIsValid = await nameSchema.isValid({
      name: `${objData.name}`,
    });
    setNameIsValid(nameIsValid);
    const raceIsValid = await raceSchema.isValid({
      race: `${objData.race}`,
    });
    setRaceIsValid(raceIsValid);
    if (nameIsValid && raceIsValid) {
      dispatch(updateAnimalForm(formData));
    }
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
        buttons: [true],
      });
    }
  }, [dispatch, error, message, navigate]);

  return (
    <div className={`form-container `}>
      <form className="animal-form" onSubmit={handleSubmit}>
        <h2 className="animal-form__title">
          Modifier les informations de votre animal
        </h2>

        <div className="animal-form__type">
          <Radio
            name="animal"
            id="cat"
            value="Cat"
            picked={pickedAnimal}
            img={cat}
            label=""
            onRadioChange={handleAnimalChange}
          />
          <Radio
            name="animal"
            id="dog"
            value="Dog"
            picked={pickedAnimal}
            img={dog}
            label=""
            onRadioChange={handleAnimalChange}
          />
        </div>

        <Input
          name="name"
          placeholder="Nom"
          defaultValue={name}
          style={{ borderColor: nameValid ? 'initial' : 'red' }}
        />
        {!nameValid && (
          <p className="error">Inscrivez le nom de votre animal</p>
        )}
        <Input
          name="race"
          placeholder="Race(s)"
          defaultValue={race}
          style={{ borderColor: raceValid ? 'initial' : 'red' }}
        />
        {!raceValid && (
          <p className="error">Inscrivez la race de votre animal</p>
        )}
        <CalendarComp />

        <p className="label">La taille de mon animal</p>
        <div className="radio">
          <Radio
            name="size"
            id="small"
            value="Petit"
            picked={picked}
            img={small}
            label="0-7 kg"
            onRadioChange={handleRadioChange}
          />
          <Radio
            name="size"
            id="medium"
            value="Moyen"
            picked={picked}
            img={medium}
            label="7-18 kg"
            onRadioChange={handleRadioChange}
          />
          <Radio
            name="size"
            id="large"
            value="Grand"
            picked={picked}
            img={big}
            label="18-45 kg"
            onRadioChange={handleRadioChange}
          />
          <Radio
            name="size"
            id="geant"
            value="Geant"
            picked={picked}
            img={geant}
            label="45+ kg"
            onRadioChange={handleRadioChange}
          />
        </div>

        <p className="label">Horaires des pauses pipi</p>
        <div className="radio-wrapper">
          <RadioSimple
            name="walk"
            id="1"
            picked={pickedWalk}
            value="Entre 0 et 2 heures"
            label="Entre 0 et 2 heures"
            onRadioChange={handleWalkChange}
          />
          <RadioSimple
            name="walk"
            id="2"
            picked={pickedWalk}
            value="Entre 2 et 4 heures"
            label="Entre 2 et 4 heures"
            onRadioChange={handleWalkChange}
          />
          <RadioSimple
            name="walk"
            id="3"
            picked={pickedWalk}
            value="Entre 4 et 8 heures"
            label="Entre 4 et 8 heures"
            onRadioChange={handleWalkChange}
          />
          <RadioSimple
            name="walk"
            id="4"
            picked={pickedWalk}
            value="+ 8 heures"
            label="+ 8 heures"
            onRadioChange={handleWalkChange}
          />
        </div>

        <p className="label">Horaires des repas</p>
        <div className="radio-wrapper">
          <RadioSimple
            name="mealhours"
            id="morning"
            picked={pickedHour}
            value="Le matin"
            label="Le matin"
            onRadioChange={handleHourChange}
          />
          <RadioSimple
            name="mealhours"
            id="twise"
            picked={pickedHour}
            value="Deux fois par jour"
            label="Deux fois par jour"
            onRadioChange={handleHourChange}
          />
        </div>

        <p className="label">Niveau d&apos;énergie</p>
        <div className="radio-wrapper">
          <RadioSimple
            name="energy"
            id="high"
            picked={pickedEnergy}
            value="Élève"
            label="Élève"
            onRadioChange={handleEnergyChange}
          />
          <RadioSimple
            name="energy"
            id="middle"
            picked={pickedEnergy}
            value="Modéré"
            label="Modéré"
            onRadioChange={handleEnergyChange}
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

export default AnimalFormUpdate;
