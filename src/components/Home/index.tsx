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
import search from '../../assets/search-blue.png';
import swap from '../../assets/swap-blue.png';
import security from '../../assets/security-blue.png';
import avatar1 from '../../../public/avatar1.jpg';
import avatar2 from '../../../public/avatar2.jpg';
import avatar3 from '../../../public/avatar3.jpg';
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
          <h2 className="fonctionnality__title">Échange</h2>
          <p className="fonctionnality__content">
            Chez <strong>O'Dog Next Door</strong>, le pet sitting est un échange
            chaleureux et convivial entre passionnés d'animaux. Offrez
            l'hospitalité à l'animal d'un autre membre, et en retour, votre
            propre compagnon est accueilli chez eux, le tout gratuitement.
            Ainsi, l'hébergement de vos petits amis reste accessible et basé sur
            un échange équitable et bienveillant.
          </p>
        </div>
        <div className="fonctionnality__card">
          <img src={search} alt="" className="fonctionnality__img" />
          <h2 className="fonctionnality__title">Rechercher</h2>
          <p className="fonctionnality__content">
            Trouvez le pet sitter idéal près de chez vous avec{' '}
            <strong>O'Dog Next Door</strong> ! Naviguez à travers les profils de
            nos membres partout en France et découvrez un univers dédié à
            l'amour des animaux. Votre compagnon à quatre pattes sera choyé par
            une communauté fiable et attentionnée à deux pas de votre domicile.
          </p>
        </div>
        <div className="fonctionnality__card">
          <img src={security} alt="" className="fonctionnality__img" />
          <h2 className="fonctionnality__title">Identité vérifié</h2>
          <p className="fonctionnality__content">
            Soyez assurés de la confiance et de la sécurité avec{' '}
            <strong>O'Dog Next Door</strong>. Tous nos pet sitters valident leur
            identité et leur adresse avant de rejoindre la communauté. Nous
            mettons un point d'honneur à vérifier chaque profil pour que vous
            puissiez confier votre animal avec une tranquillité d’esprit
            absolue. O'Dog Next Door, votre réseau de pet sitting de confiance !
          </p>
        </div>
      </section>
      <section className="marketing">
        <div className="marketing__left-space"></div>
        <div className="marketing__right-space">
          <h3 className="marketing__title">Partager</h3>
          <p className="marketing__content">
            Chez <strong>O'Dog Next Door</strong>, partager des moments précieux
            est au cœur de notre mission. En confiant votre animal à notre
            communauté de pet sitters dévoués, non seulement vous assurez à
            votre compagnon un environnement bienveillant, mais aussi une
            opportunité d’enrichissement social en côtoyant d'autres animaux.
            Laissez votre petit ami profiter de nouvelles aventures tout en
            bénéficiant vous-même d'une tranquillité d'esprit, sachant qu'il
            crée des liens joyeux et sécurisants dans un foyer aimant.
          </p>
        </div>
      </section>
      <section className="testimonials">
        <h2 className="testimonials__title">Votre avis compte</h2>
        <div className="testimonials__cards">
          <div className="testimonials__card">
            <img
              src={avatar1}
              alt="avatar"
              className="testimonials__card-avatar"
            />
            <h5 className="testimonials__card-name">Coralie H.</h5>
            <p className="testimonials__card-content">
              Expérience top avec O'Dog Next Door ! Bella a été chouchoutée par
              un pet sitter attentionné, et j’ai voyagé l’esprit léger. Service
              hautement recommandé !
            </p>
          </div>
          <div className="testimonials__card">
            <img
              src={avatar2}
              alt="avatar"
              className="testimonials__card-avatar"
            />
            <h5 className="testimonials__card-name">John D.</h5>
            <p className="testimonials__card-content">
              Partir en week-end est désormais un plaisir sans culpabilité.
              Oscar et Missy ont été aimés et dorlotés comme à la maison. O'Dog
              Next Door, c'est notre choix sûr pour chaque absence !
            </p>
          </div>
          <div className="testimonials__card">
            <img
              src={avatar3}
              alt="avatar"
              className="testimonials__card-avatar"
            />
            <h5 className="testimonials__card-name">Brandon L.</h5>
            <p className="testimonials__card-content">
              Un vrai bonheur d'utiliser O'Dog Next Door ! Nougat est revenu de
              son séjour aussi joyeux et détendu que nous de nos vacances. Une
              solution en or pour nos escapades !
            </p>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
}

export default Home;
