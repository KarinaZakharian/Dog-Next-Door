/* eslint-disable prettier/prettier */
/* eslint-disable import/extensions */
import loginReducer from './login';
import signupReducer from './signup';
import homeReducer from './home';
import profilFormReducer from './profil-form';
import animalFormReducer from './animal-form';
import searchReducer from './search';
import sitterReducer from './sitter';

const reducer = {
  signup: signupReducer,
  login: loginReducer,
  home: homeReducer,
  profilForm: profilFormReducer,
  animalForm: animalFormReducer,
  search: searchReducer,
  sitter: sitterReducer
};

export default reducer;
