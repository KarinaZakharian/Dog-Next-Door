import { Route, Routes } from 'react-router-dom';

// On import nos composants de pages
import Home from '../Home/index';
import Search from '../Search/Search';
import Login from '../Forms/Login/Login';
import Signup from '../Forms/Signup/Signup';
import Error from '../Error';

// on import le css
import './App.scss';
import ProfilForm from '../Profil/ProfilForm/ProfilForm';
import AnimalForm from '../Profil/AnimalForm/AnimalForm';

function App() {
  return (
    <div className="app">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/search" element={<Search />} />
        <Route path="/login" element={<Login />} />
        <Route path="/subscribe" element={<Signup />} />
        <Route path="/profil/form" element={<ProfilForm />} />
        <Route path="/profil/animal" element={<AnimalForm />} />
        <Route path="*" element={<Error />} />
      </Routes>
    </div>
  );
}

export default App;
