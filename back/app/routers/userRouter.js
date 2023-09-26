const express = require("express");
const {userController} = require('../controllers/index.js');
const userRouter= express.Router();

// userRouter.post("/login",userController.findUser, userController.checkUserInput);
userRouter.post("/login",userController.checkUserInput);
// userRouter.post("/account",userController.loggedUser);

module.exports = userRouter;