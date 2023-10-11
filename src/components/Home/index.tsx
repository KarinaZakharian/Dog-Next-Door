import { useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { useNavigate } from 'react-router-dom';
import { addData } from '../../store/reducers/home';
import { searchThunk } from '../../store/reducers/search';

import Footer from '../PageComponents/Footer/Footer';
import Header from '../PageComponents/Header/Header';
import Radio from '../InputType/Radio/Radio';
import AutoComplete from '../InputType/Addresse/Addresse';
import DateRangePickerComp from '../InputType/DatePiker/DateRangePicker';
import Button from '../InputType/Button/Button';
import RadioSimple from '../InputType/RadioSimple/RadioSimple';

import dog from '../../assets/icons8-dog-100.png';
import cat from '../../assets/icons8-cat-100.png';
import small from '../../assets/icons8-dog-20.png';
import medium from '../../assets/icons8-dog-35.png';
import big from '../../assets/icons8-dog-55.png';
import geant from '../../assets/icons8-dog-64.png';
import search from '../../assets/search.png';
import swap from '../../assets/swap.png';
import security from '../../assets/security.png';
import marketImg from '../../assets/marketImg.png';
import './index.scss';

function Home() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const error = useAppSelector((state) => state.search.error);
  const message = useAppSelector((state) => state.search.message);
  const [coordinates, setCoordinates] = useState({ x: 0, y: 0 });

  const [picked, setPicked] = useState('');
  function handleRadioChange(value: string): void {
    setPicked(value);
  }

  const [pickedAnimal, setAnimal] = useState('');
  function handleAnimalChange(value: string): void {
    setAnimal(value);
  }

  // picking the radius
  const [pickedRadius, setRadius] = useState('');
  function handleRadiusChange(value: string): void {
    setRadius(value);
  }

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const form = event.currentTarget;
    const formData = new FormData(form);
    formData.append('longitude', coordinates.x.toString());
    formData.append('latitude', coordinates.y.toString());
    const objData = Object.fromEntries(formData);
    dispatch(searchThunk(formData));
    // console.log(objData);
    dispatch(addData(objData));
    navigate('/search', { replace: true });
  }

  return (
    <div className="page-wrapper">
      <Header />
      <main className="main">
        <div className="container-home">
          <form className="main-form" onSubmit={handleSubmit}>
            <p className="main-form__title-animal">
              Je recherche un service pour mon
            </p>
            <div className="main-form__radio-animal">
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
            <p className="main-form__label">Distance autour de chez moi</p>
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
            <p className="main-form__label">La taille de mon animal</p>
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
            <Button prop="Rechercher" />
          </form>
        </div>
      </main>
      <section className="fonctionnality">
        <div className="fonctionnality__card">
          <img src={swap} alt="" className="fonctionnality__img" />
          <h2 className="fonctionnality__title">Échanger</h2>
          <p className="fonctionnality__content">
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Dolorem,
            porro. Accusamus sint porro quam delectus. Magni assumenda delectus
            illo neque!
          </p>
        </div>
        <div className="fonctionnality__card">
          <img src={search} alt="" className="fonctionnality__img" />
          <h2 className="fonctionnality__title">Rechercher</h2>
          <p className="fonctionnality__content">
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Dolorem,
            porro. Accusamus sint porro quam delectus. Magni assumenda delectus
            illo neque!
          </p>
        </div>
        <div className="fonctionnality__card">
          <img src={security} alt="" className="fonctionnality__img" />
          <h2 className="fonctionnality__title">Identité validé</h2>
          <p className="fonctionnality__content">
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Dolorem,
            porro. Accusamus sint porro quam delectus. Magni assumenda delectus
            illo neque!
          </p>
        </div>
      </section>
      <section className="marketing">
        <div className="marketing__left-space"></div>
        <div className="marketing__right-space">
          <h3 className="marketing__title">Partager</h3>
          <p className="marketing__content">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Aut dolores
            numquam aliquam ut minima accusantium quaerat, amet quisquam harum
            error molestias magnam consequuntur minus debitis, dolore alias,
            iusto nesciunt vero.
          </p>
        </div>
      </section>
      <Footer />
    </div>
  );
}

export default Home;
