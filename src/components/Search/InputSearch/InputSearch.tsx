import { FormEvent, useState } from 'react';
import AutoComplete from '../../InputType/Addresse/Addresse';
import Button from '../../InputType/Button/Button';
import DateRangePickerComp from '../../InputType/DatePiker/DateRangePicker';
import Radio from '../../InputType/Radio/Radio';

import { search } from '../../../store/reducers/search';
import { useAppDispatch } from '../../../hooks/redux';

import dog from '../../../assets/icons8-dog-100.png';
import cat from '../../../assets/icons8-cat-100.png';
import small from '../../../assets/icons8-dog-20.png';
import medium from '../../../assets/icons8-dog-35.png';
import big from '../../../assets/icons8-dog-55.png';
import geant from '../../../assets/icons8-dog-64.png';

import './InputSearch.scss';

function InputSearch() {
  const [picked, setPicked] = useState('');
  function handleRadioChange(value: string): void {
    setPicked(value);
  }

  const [pickedAnimal, setAnimal] = useState('');
  function handleAnimalChange(value: string): void {
    setAnimal(value);
  }
  const dispatch = useAppDispatch();
  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const formData = new FormData(form);
    const objData = Object.fromEntries(formData);
    console.log(objData);
    dispatch(search(objData));
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
            setCoordinates={undefined}
          />
          <DateRangePickerComp />
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
          <Button prop="Rechercher" />
        </form>
      </div>
    </main>
  );
}

export default InputSearch;
