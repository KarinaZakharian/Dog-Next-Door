/* eslint-disable prettier/prettier */
/* eslint-disable import/extensions */
import loginReducer from './login';
import signupReducer from './signup';
import homeReducer from './home';
import profilFormReducer from './profil-form';

const reducer = {
  signup: signupReducer,
  login: loginReducer,
  home: homeReducer,
  profilForm: profilFormReducer,
};

export default reducer;
