import { FormEvent, useState } from 'react';
import AutoComplete from '../../InputType/Addresse/Addresse';
import Button from '../../InputType/Button/Button';
import DateRangePickerComp from '../../InputType/DatePiker/DateRangePicker';
import Radio from '../../InputType/Radio/Radio';
import CheckboxGroup from '../../InputType/Checkbox/Checkbox';

import { search } from '../../../store/reducers/search';
import { useAppDispatch, useAppSelector } from '../../../hooks/redux';

import dog from '../../../assets/icons8-dog-100.png';
import cat from '../../../assets/icons8-cat-100.png';
import small from '../../../assets/icons8-dog-20.png';
import medium from '../../../assets/icons8-dog-35.png';
import big from '../../../assets/icons8-dog-55.png';
import geant from '../../../assets/icons8-dog-64.png';

import './InputSearch.scss';
import RadioSimple from '../../InputType/RadioSimple/RadioSimple';

// import { addData } from '../../../store/reducers/home';
import { searchThunk } from '../../../store/reducers/search';

function InputSearch() {
  const animal = useAppSelector((state) => state.home.animal);
  const city = useAppSelector((state) => state.home.city);
  const date = useAppSelector((state) => state.home.date);
  const size = useAppSelector((state) => state.home.size);
  const searchRadius = useAppSelector((state) => state.home.radius);

  console.log(animal, city, date, size, searchRadius);
  const dispatch = useAppDispatch();

  const [coordinates, setCoordinates] = useState({ x: 0, y: 0 });

  const [selectedOptions1, setSelectedOptions1] = useState<string[]>([]);
  const handleSelectionChange1 = (selectedOptions: string[]) => {
    setSelectedOptions1(selectedOptions);
  };

  const options = [
    'Maison fumeur',
    'Enfant âgés de 0 à 5 ans',
    'Chiens autorisés sur le canapé',
    'Animaux en cage à la maison',
    'Aucune de ces réponses',
  ];

  // picking the walking hours
  const [pickedWalk, setWalk] = useState('');
  function handleWalkChange(value: string): void {
    setWalk(value);
  }

  // picking the radius
  const [pickedRadius, setRadius] = useState(searchRadius);
  function handleRadiusChange(value: string): void {
    setRadius(value);
  }

  const [picked, setPicked] = useState(size);
  function handleRadioChange(value: string): void {
    setPicked(value);
  }

  const [pickedAnimal, setAnimal] = useState(animal);
  function handleAnimalChange(value: string): void {
    setAnimal(value);
  }

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const form = event.currentTarget;
    const formData = new FormData(form);
    formData.append('longitude', coordinates.x.toString());
    formData.append('latitude', coordinates.y.toString());
    // const objData = Object.fromEntries(formData);
    dispatch(searchThunk(formData));
    // console.log(objData);
  }

  return (
    <main className="inputSearch">
      <div className="inputSearch__container">
        <form className="inputSearch__form" onSubmit={handleSubmit}>
          <p className="inputSearch__title-animal">
            Je recherche un service pour mon
          </p>
          <div className="inputSearch__radio-animal">
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
          <AutoComplete
            style={{ borderColor: 'initial' }}
            setCoordinates={setCoordinates}
            searchedCity={city}
          />
          <p>Distance autour de chez moi</p>
          <div className="radiosimple-wrapper">
            <RadioSimple
              name="radius"
              id="5km"
              picked={pickedRadius}
              value="5"
              onRadioChange={handleRadiusChange}
            />
            <RadioSimple
              name="radius"
              id="10km"
              picked={pickedRadius}
              value="10"
              onRadioChange={handleRadiusChange}
            />
            <RadioSimple
              name="radius"
              id="20"
              picked={pickedRadius}
              value="20"
              onRadioChange={handleRadiusChange}
            />
            <RadioSimple
              name="radius"
              id="35"
              picked={pickedRadius}
              value="35"
              onRadioChange={handleRadiusChange}
            />
          </div>
          <DateRangePickerComp legend="Pour ces jours" />
          <p className="inputSearch__title-size">La taille de mon animal</p>
          <div className="inputSearch__radio">
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

          <CheckboxGroup
            name="additional options"
            legend="À quoi les propriétaires peuvent-ils s'attendre lorsqu'ils vous confient la garde de leur animal de compagnie ?"
            options={options}
            onSelectionChange={handleSelectionChange1}
          />

          <p>Horaires des pauses pipi</p>
          <div className="radiosimple-wrapper">
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
          <Button prop="Rechercher" />
        </form>
      </div>
    </main>
  );
}

export default InputSearch;
