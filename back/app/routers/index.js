const express = require('express');
const router = express.Router();
const userRouter = require('./userRouter');
const { errorNotFound } = require('../services/errorService');

userRouter.get('/', (req, res) => {
  res.send("API O'DogNextDoor");
});

router.use(userRouter);

router.use(errorNotFound);

module.exports = router;
