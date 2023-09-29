/* eslint-disable prettier/prettier */
// import Header from '../PageComponents/Header/Header';
import { Route, Routes } from 'react-router-dom';

// On import nos composants de pages
import Home from '../Home';
import Search from '../Search/Search';
import Login from '../Forms/Login/Login';
import Signup from '../Forms/Signup/Signup';
import Error from '../Error';

// on import le css
import './App.scss';
import ProfilForm from '../Profil/ProfilPage/ProfilForm/ProfilForm';

function App() {
  return (
    <div className="app">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/search" element={<Search />} />
        <Route path="/login" element={<Login />} />
        <Route path="/subscribe" element={<Signup />} />
        <Route path="/profil" element={<ProfilForm />} />
        <Route path="*" element={<Error />} />
      </Routes>
    </div>
  );
}

export default App;
