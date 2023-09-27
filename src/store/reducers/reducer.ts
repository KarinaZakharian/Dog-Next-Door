/* eslint-disable prettier/prettier */
/* eslint-disable import/extensions */
import loginReducer from './login';
import signupReducer from './signup';
import homeReducer from './home';

const reducer = {
  signup: signupReducer,
  login: loginReducer,
  home: homeReducer,
};

export default reducer;
