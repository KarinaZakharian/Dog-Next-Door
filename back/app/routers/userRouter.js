const express = require("express");
const {userController} = require('../controllers/index.js');
const userRouter= express.Router();
const { checkTokenLogin, checkTokenMember } = require('../services/tokenController.js')

// Import des services
const { controlWrapper:cw } = require('../services/errorService.js')
const { checkSubscribeForm, checkLogInForm, checkAccountForm } = require('../services/validation/validationForm.js');

//!Route GET

userRouter.get("/petsitter/:id",userController.findUserById);

//!Route POST
userRouter.post("/login" , cw(userController.logInUser));

userRouter.post("/subscribe", cw(userController.createUser));

userRouter.post("/search", cw(userController.findUserByDistance));

userRouter.post("/account/form",checkTokenMember ,cw(userController.createUserOptionnalInformation));

module.exports = userRouter;


