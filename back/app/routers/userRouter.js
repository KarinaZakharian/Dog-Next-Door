const express = require("express");
const {userController} = require('../controllers/index.js');
const userRouter= express.Router();
const { checkTokenLogin, checkTokenMember } = require('../services/tokenController.js')

// Import des services
const { controlWrapper:cw } = require('../services/errorService.js')
const { checkSubscribeForm, checkLogInForm } = require('../services/validation/validationForm.js');

// // userRouter.post("/login",userController.findUser, userController.checkUserInput);
// userRouter.post("/login", checkTokenLogin, cw(checkLogInForm, userController.logInUser));
// // userRouter.post("/account",userController.loggedUser);
// userRouter.post("/signup", checkTokenMember, cw(checkSubscribeForm, userController.createUser));

// userRouter.post("/login",userController.findUser, userController.checkUserInput);
userRouter.get("/login", (req,res) => {
    res.send("Login page")
})
userRouter.get("/subscribe", (req,res) => {
    res.send("Subscribe page")
})
userRouter.post("/login", checkTokenLogin, cw(userController.logInUser));
// userRouter.post("/account",userController.loggedUser);
userRouter.post("/signup", checkTokenMember, cw(userController.createUser));

module.exports = userRouter;