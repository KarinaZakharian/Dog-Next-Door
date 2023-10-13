// Mise en place du router animal
const express = require("express");
const bookingRouter = express.Router();

// Appel des services
const { checkTokenMember } = require('../services/tokenController.js');
const { controlWrapper:cw } = require('../services/errorService.js');
const { checkAddAnimalForm } = require('../services/validation/validationForm.js');
const {checkGetAnimal} = require("../services/animalController.js");

// Appel du controller animal
const { bookingController } = require("../controllers/index.js");


//Routes get

// Routes post
bookingRouter.post("/account", checkGetAnimal, cw(bookingController.addNewBooking));
bookingRouter.post("/petsitter/:id/booking", checkTokenMember ,bookingController.createNewBooking);

module.exports = bookingRouter;