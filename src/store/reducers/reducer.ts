/* eslint-disable prettier/prettier */
/* eslint-disable import/extensions */
import loginReducer from './login';
import signupReducer from './signup';

const reducer = {
  signup: signupReducer,
  login: loginReducer,
};

export default reducer;
