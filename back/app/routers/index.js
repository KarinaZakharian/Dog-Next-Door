// Création de la route index
const express = require('express');
const router = express.Router();

// Appel des routers
const userRouter = require('./userRouter');
const inboxRouter = require('./inboxRouter');
const animalRouter = require('./animalRouter');
const bookingRouter = require('./bookingRouter');
const testimonialRouter = require('./testimonialRouter');

// Appel des services
const { errorNotFound } = require('../services/errorService');

//* Appel des routes users
router.use(userRouter);

//* Appel des routes inbox
router.use(inboxRouter);

//* Appel des routes animals
router.use(animalRouter);

//* Appel des routes bookings
router.use(bookingRouter);

//* Appel des routes testimonials
router.use(testimonialRouter);

//* Appel de l'erreur pour routes inconnues
router.use(errorNotFound);

module.exports = router;
