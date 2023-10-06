// Mise en place du router animal
const express = require("express");
const animalRouter = express.Router();

// Appel des services
const { checkTokenMember } = require('../services/tokenController.js');
const { controlWrapper:cw } = require('../services/errorService.js');
const { checkAddAnimalForm } = require('../services/validation/validationForm.js');

// Appel du controller animal
const { animalController } = require("../controllers");

// Routes post
animalRouter.post('/account/addanimal', checkAddAnimalForm, checkTokenMember, cw(animalController.createNewAnimal));

module.exports = animalRouter;