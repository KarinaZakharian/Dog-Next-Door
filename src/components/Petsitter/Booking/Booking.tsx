/* eslint-disable prettier/prettier */
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import swal from 'sweetalert';
// import { success, fillProfilForm } from '../../../store/reducers/profil-form';
import { useAppDispatch, useAppSelector } from '../../../hooks/redux';
import { success } from '../../../store/reducers/booking';

import dog from '../../../assets/icons8-dog-100.png';
import cat from '../../../assets/icons8-cat-100.png';
import small from '../../../assets/icons8-dog-20.png';
import medium from '../../../assets/icons8-dog-35.png';
import big from '../../../assets/icons8-dog-55.png';
import geant from '../../../assets/icons8-dog-64.png';
import './Booking.scss';

import Input from '../../InputType/Input/Input';
import Button from '../../InputType/Button/Button';
import Header from '../../PageComponents/Header/Header';
import Footer from '../../PageComponents/Footer/Footer';
import RadioSimple from '../../InputType/RadioSimple/RadioSimple';
import Radio from '../../InputType/Radio/Radio';
import React from 'react';

import { fillBookingForm } from '../../../store/reducers/booking';
import { fetchUser } from '../../../store/reducers/profil';
import DateRangePickerComp from '../../InputType/DatePiker/DateRangePicker';

function Booking() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchUser());
  }, []);

  const error = useAppSelector((state) => state.booking.error);
  const message = useAppSelector((state) => state.booking.message);
  const animal = useAppSelector((state) => state.animalForm.animals);
  console.log(animal);

  // picking  the animal
  const [pickedAnimal, setAnimal] = useState(animal?.animal || '');
  function handleAnimalChange(value: string): void {
    setAnimal(value);
  }

  //  picking the size of the animal
  const [picked, setPicked] = useState(animal?.size || '');
  function handleRadioChange(value: string): void {
    setPicked(value);
  }

  // picking the meal hours
  const [pickedHour, setHour] = useState(animal?.mealhours || '');
  function handleHourChange(value: string): void {
    setHour(value);
  }

  // picking the walking hours
  const [pickedWalk, setWalk] = useState(animal?.walk || '');
  function handleWalkChange(value: string): void {
    setWalk(value);
  }

  // picking energy level

  const [pickedEnergy, setEnergy] = useState(animal?.energy || '');
  function handleEnergyChange(value: string): void {
    setEnergy(value);
  }

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const form = event.currentTarget;
    const formData = new FormData(form);

    const objData = Object.fromEntries(formData);
    console.log(objData);

    dispatch(fillBookingForm(formData));

    // dispatch(fillProfilForm(formData));
  };

  useEffect(() => {
    if (!error && message) {
      swal({
        icon: 'success',
        timer: 1000,
      });
      setTimeout(() => {
        dispatch(success());
        navigate('/', { replace: true });
      }, 1000);
    }

    if (error) {
      swal(`${error}`, {
        icon: 'error',
        timer: 1000,
      });
    }
  }, [error, message]);

  return (
    <div className="page-wrapper">
      <Header />

      <main className="main">
        <div className="container">
          <form className="animal-form" onSubmit={handleSubmit}>
            <p className="title-animal">Quel type d'animal ?</p>
            <div className="radio-animal">
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
            <Input name="name" placeholder="Nom" defaultValue={animal?.name} />
            <Input
              name="race"
              placeholder="Race(s)"
              defaultValue={animal?.race}
            />

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
                onRadioChange={handleWalkChange}
              />
              <RadioSimple
                name="walk"
                id="2"
                picked={pickedWalk}
                value="Entre 2 et 4 heures"
                onRadioChange={handleWalkChange}
              />
              <RadioSimple
                name="walk"
                id="3"
                picked={pickedWalk}
                value="Entre 4 et 8 heures"
                onRadioChange={handleWalkChange}
              />
              <RadioSimple
                name="walk"
                id="4"
                picked={pickedWalk}
                value="+ 8 heures"
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
                onRadioChange={handleHourChange}
              />
              <RadioSimple
                name="mealhours"
                id="twise"
                picked={pickedHour}
                value="Deux fois par jour"
                onRadioChange={handleHourChange}
              />
            </div>
            <p className="label">Niveau d'énergie</p>
            <div className="radio-wrapper">
              <RadioSimple
                name="energy"
                id="high"
                picked={pickedEnergy}
                value="Élève"
                onRadioChange={handleEnergyChange}
              />
              <RadioSimple
                name="energy"
                id="middle"
                picked={pickedEnergy}
                value="Modéré"
                onRadioChange={handleEnergyChange}
              />
              <RadioSimple
                name="energy"
                id="small"
                picked={pickedEnergy}
                value="Faible"
                onRadioChange={handleEnergyChange}
              />
            </div>
            <DateRangePickerComp legend={'Date de booking'} />
            <Button prop="Submit" />
          </form>
        </div>
      </main>
      <Footer />
    </div>
  );
}

export default Booking;
