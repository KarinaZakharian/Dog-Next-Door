/* eslint-disable prettier/prettier */
/* eslint-disable import/extensions */
import loginReducer from './login';
import signupReducer from './signup';
import homeReducer from './home';
import profilFormReducer from './profil-form';
import animalFormReducer from './animal-form';
import searchReducer from './search';
import sitterReducer from './sitter';
import profilReduser from './profil';
import bookingFormReducer from './booking';
import accountReducer from './account-inbox';
import upcomingReducer from './upcoming-inbox';
import demandsReducer from './demandes-inbox';
import messageReducer from './massage-inbox';

const reducer = {
  signup: signupReducer,
  login: loginReducer,
  home: homeReducer,
  profilForm: profilFormReducer,
  animalForm: animalFormReducer,
  search: searchReducer,
  sitter: sitterReducer,
  profil: profilReduser,
  booking: bookingFormReducer,
  inboxAccount: accountReducer,
  inboxUpcoming: upcomingReducer,
  inboxDemands: demandsReducer,
  inboxUppast: messageReducer,
};

export default reducer;
