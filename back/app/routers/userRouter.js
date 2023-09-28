const express = require("express");
const {userController} = require('../controllers/index.js');
const userRouter= express.Router();
const {checkTokenLogin} = require('../services/tokenController.js')

// userRouter.post("/login",userController.findUser, userController.checkUserInput);
userRouter.post("/login",checkTokenLogin, userController.checkUserInput);
// userRouter.post("/account",userController.loggedUser);
userRouter.post("/signup", userController.createUser);

module.exports = userRouter;