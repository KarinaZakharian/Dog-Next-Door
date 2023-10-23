import { useState } from 'react';
import AutoComplete from '../../InputType/Addresse/Addresse';
import Button from '../../InputType/Button/Button';
import Radio from '../../InputType/Radio/Radio';
import { searchThunk } from '../../../store/reducers/search';
import { useAppDispatch, useAppSelector } from '../../../hooks/redux';

import dog from '../../../assets/icons8-dog-100.png';
import cat from '../../../assets/icons8-cat-100.png';

import './InputSearch.scss';
import RadioSimple from '../../InputType/RadioSimple/RadioSimple';

function InputSearch() {
  const animal = useAppSelector((state) => state.home.animal);
  const size = useAppSelector((state) => state.home.size);
  const searchRadius = useAppSelector((state) => state.home.radius);
  const dispatch = useAppDispatch();
  const [coordinates, setCoordinates] = useState({ x: 0, y: 0 });
  const center = useState({ lat: 0, lng: 0 });

  // picking the radius
  const [pickedRadius, setRadius] = useState(searchRadius);
  function handleRadiusChange(value: string): void {
    setRadius(value);
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
                onRadioChange={() => handleAnimalChange}
              />
              <Radio
                name="animal"
                id="dog"
                value="Dog"
                picked={pickedAnimal}
                img={dog}
                label=""
                onRadioChange={() => handleAnimalChange}
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
                  id="5"
                  picked={pickedRadius}
                  value="5"
                  onRadioChange={() => handleRadiusChange}
                  label="5 km"
                />
                <RadioSimple
                  name="radius"
                  id="10"
                  picked={pickedRadius}
                  value="10"
                  onRadioChange={() => handleRadiusChange}
                  label="5 km"
                />
                <RadioSimple
                  name="radius"
                  id="20"
                  picked={pickedRadius}
                  value="20"
                  onRadioChange={() => handleRadiusChange}
                  label="5 km"
                />
                <RadioSimple
                  name="radius"
                  id="35"
                  picked={pickedRadius}
                  value="35"
                  onRadioChange={() => handleRadiusChange}
                  label="5 km"
                />
              </div>
            </div>
          </div>
        </div>
        <Button prop="Rechercher" />
      </form>
    </main>
  );
}

export default InputSearch;
