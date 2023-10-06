// Création de la route index
const express = require("express");
const router = express.Router();

// Appel des routers
const userRouter = require('./userRouter');
const inboxRouter = require('./inboxRouter');
const animalRouter = require('./animalRouter');

// Appel des services
const {errorNotFound} = require('../services/errorService');

// Appel de la route acceuil de l'API
userRouter.get("/", (req,res) => {
    res.send("API O'DogNextDoor");
});

// Appel des routes users
router.use(userRouter);
router.use(inboxRouter);

// Appel des routes animals
router.use(animalRouter);


// Appel de l'erreur pour routes inconnues
router.use(errorNotFound);

module.exports = router;