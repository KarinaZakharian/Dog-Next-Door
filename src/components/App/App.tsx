import { Navigate, Route, Routes } from 'react-router-dom';

// On import nos composants de pages
import Home from '../Home/index';
import Search from '../Search/Search';
import Login from '../Forms/Login/Login';
import Signup from '../Forms/Signup/Signup';
import Error from '../Error';
import ProfilForm from '../Profil/ProfilForm/ProfilForm';
import AnimalForm from '../Profil/AnimalForm/AnimalForm';
import Profil from '../Profil/ProfilPage/Profil';
import Petsitter from '../Petsitter/Petsitter';
// on import le css
import './App.scss';
import { useAppSelector } from '../../hooks/redux';

function App() {
  // const firstname = useAppSelector((state) => state.login.firstname);
  const firstname = 'karina';

  return (
    <div className="app">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/search" element={<Search />} />
        <Route path="/login" element={<Login />} />
        <Route path="/subscribe" element={<Signup />} />
        <Route path="/petsitter/:id" element={<Petsitter />} />
        <Route path="/account/animal-form" element={<AnimalForm />} />

        {firstname && (
          <>
            <Route path="/account" element={<Profil />} />
            <Route path="/account/form" element={<ProfilForm />} />
          </>
        )}

        <Route path="*" element={<Error />} />
      </Routes>
    </div>
  );
}

export default App;
