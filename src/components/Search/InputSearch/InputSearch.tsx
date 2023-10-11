import { useState } from 'react';
import AutoComplete from '../../InputType/Addresse/Addresse';
import Button from '../../InputType/Button/Button';
import DateRangePickerComp from '../../InputType/DatePiker/DateRangePicker';
import Radio from '../../InputType/Radio/Radio';
import CheckboxGroup from '../../InputType/Checkbox/Checkbox';
import { searchThunk } from '../../../store/reducers/search';
import { useAppDispatch, useAppSelector } from '../../../hooks/redux';

import dog from '../../../assets/icons8-dog-100.png';
import cat from '../../../assets/icons8-cat-100.png';
import small from '../../../assets/icons8-dog-20.png';
import medium from '../../../assets/icons8-dog-35.png';
import big from '../../../assets/icons8-dog-55.png';
import geant from '../../../assets/icons8-dog-64.png';

import './InputSearch.scss';
import RadioSimple from '../../InputType/RadioSimple/RadioSimple';

function InputSearch() {
  const animal = useAppSelector((state) => state.home.animal);
  const city = useAppSelector((state) => state.home.city);
  const date = useAppSelector((state) => state.home.date);
  const size = useAppSelector((state) => state.home.size);
  const searchRadius = useAppSelector((state) => state.home.radius);

  console.log(animal, city, date, size, searchRadius);
  const dispatch = useAppDispatch();

  const [coordinates, setCoordinates] = useState({ x: 0, y: 0 });
  const center = useState({ lat: 0, lng: 0 });

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
    dispatch(searchThunk(formData));
  }

  return (
    <main className="inputsearch">
      <h3 className="inputsearch__title-animal">
        Je recherche un service pour mon
      </h3>
      <form className="inputsearch__form" onSubmit={handleSubmit}>
        <div className="inputsearch__container">
          <div className="inputsearch__left">
            <div className="inputsearch__radio-animal">
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
            />
          </div>

          <div className="inputsearch__right">
            <div className="inputsearch__radio-animal">
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
            </div>

            <DateRangePickerComp legend="Disponibilités" />
          </div>
        </div>
        <Button prop="Rechercher" />
      </form>
    </main>
  );
}

export default InputSearch;
