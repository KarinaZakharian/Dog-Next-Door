import { Navigate, Route, Routes } from 'react-router-dom';
import axiosInstance from '../../utils/axios';

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
import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import Booking from '../Petsitter/Booking/Booking';
import Account from '../Inbox/InboxAccount/Account';
import Upcoming from '../Inbox/InboxUpcoming/Upcoming';
import Uppast from '../Inbox/InboxUppast/Uppast';
import Demandes from '../Inbox/Demandes/Demandes';
import { reconnect } from '../../store/reducers/login';

function App() {
  const firstname = useAppSelector((state) => state.login.firstname);
  const dispatch = useAppDispatch();
  //const firstname = 'karina';
  // Au premier chargement de l'application
  useEffect(() => {
    // je récupère mon token dans le localstorage
    const token = localStorage.getItem('token');
    // Si j'ai un token
    if (token) {
      // Je le passes dans les headers de mon instance Axios
      axiosInstance.defaults.headers.common.Authorization = `Bearer ${token}`;
      // Je redéclenche mon appel à la BDD pour me reconnecté à partir du token
      axiosInstance
        .post('/login')
        // Vu que je suis dans un useEffect, je ne pas utilisé async/await, j'utilise les prommesses classique pour récupérer les data dans .then ou l'erreur dans le catch
        .then((response) => {
          const firstname = response.data.firstname;
          // Si j'ai une réponse positive de la base de donnée, je dispatche mon action pour reconnecté mon utilisateur : firstname = valeur
          dispatch(reconnect(firstname));
        })
        // Si j'ai une erreur, peut importe la quelle, je supprime mon token
        .catch((error) => {
          localStorage.clear();
        });
    }
  }, []);
  return (
    <div className="app">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/search" element={<Search />} />
        <Route path="/login" element={<Login />} />
        <Route path="/subscribe" element={<Signup />} />
        <Route path="/petsitter/:id" element={<Petsitter />} />
        <Route path="/account/inbox" element={<Account />} />
        <Route path="/account/inbox/upcoming" element={<Upcoming />} />
        <Route path="/account/inbox/uppast" element={<Uppast />} />
        <Route path="/account/inbox/demands" element={<Demandes />} />

        {firstname && (
          <>
            <Route path="/account/animal-form" element={<AnimalForm />} />
            <Route path="/account" element={<Profil />} />
          </>
        )}

        <Route path="*" element={<Error />} />
      </Routes>
    </div>
  );
}

export default App;
