// Mise en place du router animal
<<<<<<< HEAD
const express = require('express');
=======
const express = require("express");
>>>>>>> 1d9cdbd (merge FixTsError and karina/end)
const bookingRouter = express.Router();

// Appel des services
const { checkTokenMember } = require('../services/tokenController.js');
<<<<<<< HEAD
const { controlWrapper: cw } = require('../services/errorService.js');
const {
  checkAddAnimalForm,
} = require('../services/validation/validationForm.js');
const { checkGetAnimal } = require('../services/animalController.js');

// Appel du controller animal
const { bookingController } = require('../controllers/index.js');
=======
const { controlWrapper:cw } = require('../services/errorService.js');
const { checkAddAnimalForm } = require('../services/validation/validationForm.js');
const {checkGetAnimal} = require("../services/animalController.js");

// Appel du controller animal
const { bookingController } = require("../controllers/index.js");

>>>>>>> 1d9cdbd (merge FixTsError and karina/end)

//Routes get

// Routes post
<<<<<<< HEAD
bookingRouter.post('/account', cw(bookingController.addNewBooking));
bookingRouter.post(
  '/petsitter/:id/booking',
  checkTokenMember,
  checkGetAnimal,
  bookingController.createNewBooking
);

module.exports = bookingRouter;
=======
bookingRouter.post("/account", cw(bookingController.addNewBooking));
bookingRouter.post("/petsitter/:id/booking", checkTokenMember,checkGetAnimal ,bookingController.createNewBooking);

module.exports = bookingRouter;
>>>>>>> 1d9cdbd (merge FixTsError and karina/end)
