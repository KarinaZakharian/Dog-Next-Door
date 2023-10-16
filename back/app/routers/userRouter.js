const express = require('express');
const {
  userController,
  bookingController,
} = require('../controllers/index.js');
const userRouter = express.Router();
const {
  checkTokenLogin,
  checkTokenMember,
  checkTokenRemove,
  checkToken
} = require('../services/tokenController.js');
const { checkGetAnimal } = require('../services/animalController.js');
// Import des services
const { controlWrapper: cw } = require('../services/errorService.js');
const {
  checkSubscribeForm,
  checkLogInForm,
  checkAccountForm,
} = require('../services/validation/validationForm.js');

//!Route GET
userRouter.get('/petsitter/:id', cw(userController.findUserById));

userRouter.get('/account', checkTokenMember, cw(userController.findUser));
// userRouter.get("/logout", checkTokenRemove);
//!Route POST
userRouter.post('/login', checkTokenLogin, cw(userController.logInUser));
userRouter.post('/subscribe', cw(userController.createUser));

userRouter.post('/search', checkToken, cw(userController.findUserByDistance));
userRouter.post(
  '/account/adddisponibility',
  checkTokenMember,
  cw(userController.createUserNewDisponibility)
);

//!Route PATCH
userRouter.patch(
  '/account/form',
  checkTokenMember,
  cw(userController.updateOptionnalInformation)
);
userRouter.patch(
  '/account/form2',
  checkTokenMember,
  cw(userController.updatePersonnalInformation)
);

userRouter.patch("/account/update-disponibility", checkTokenMember, cw(userController.updateDisponibility))
module.exports = userRouter;
