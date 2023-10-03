<<<<<<< HEAD
const express = require('express');
const { userController } = require('../controllers/index.js');
const userRouter = express.Router();
const {
  checkTokenLogin,
  checkTokenMember,
} = require('../services/tokenController.js');
const express = require('express');
const { userController } = require('../controllers/index.js');
const userRouter = express.Router();
const {
  checkTokenLogin,
  checkTokenMember,
} = require('../services/tokenController.js');

// Import des services
const { controlWrapper: cw } = require('../services/errorService.js');
const {
  checkSubscribeForm,
  checkLogInForm,
} = require('../services/validation/validationForm.js');
const { controlWrapper: cw } = require('../services/errorService.js');
const {
  checkSubscribeForm,
  checkLogInForm,
} = require('../services/validation/validationForm.js');

//!Route GET
userRouter.get('/login', (req, res) => {
  res.send('Login page');
userRouter.get('/login', (req, res) => {
  res.send('Login page');
});
userRouter.get('/subscribe', (req, res) => {
  res.send('Subscribe page');
userRouter.get('/subscribe', (req, res) => {
  res.send('Subscribe page');
=======
const express = require("express");
const {userController} = require('../controllers/index.js');
const userRouter= express.Router();
const { checkTokenLogin, checkTokenMember } = require('../services/tokenController.js')

// Import des services
const { controlWrapper:cw } = require('../services/errorService.js')
const { checkSubscribeForm, checkLogInForm, checkAccountForm } = require('../services/validation/validationForm.js');

//!Route GET
userRouter.get("/login", (req,res) => {
    res.send("Login page")
});
userRouter.get("/subscribe", (req,res) => {
    res.send("Subscribe page")
>>>>>>> bef16ac (change back folder with last version)
});




//!Route POST
userRouter.post("/login", checkTokenLogin, cw(userController.logInUser));

<<<<<<< HEAD
userRouter.post('/subscribe', checkTokenLogin, cw(userController.createUser));
userRouter.post('/login', checkTokenLogin, cw(userController.logInUser));

userRouter.post('/subscribe', checkTokenLogin, cw(userController.createUser));

userRouter.post('/search', userController.findUserByZipCode);
userRouter.post('/search', userController.findUserByZipCode);
=======
userRouter.post("/subscribe", checkTokenLogin, cw(userController.createUser));

userRouter.post("/search", cw(userController.findUserByZipCode));
>>>>>>> bef16ac (change back folder with last version)

userRouter.post("/account", checkAccountForm, checkTokenMember, cw(userController.createUserOptionnalInformation));

<<<<<<< HEAD
module.exports = userRouter;

=======
module.exports = userRouter;
>>>>>>> bef16ac (change back folder with last version)
