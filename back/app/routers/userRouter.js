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
<<<<<<< HEAD
userRouter.get("/login", (req,res) => {
    res.send("Login page")
})
userRouter.get("/subscribe", (req,res) => {
    res.send("Subscribe page")
})
userRouter.post("/login", checkTokenLogin, cw(userController.logInUser));
// userRouter.post("/account",userController.loggedUser);
userRouter.post("/signup", checkTokenMember, cw(userController.createUser));
=======
userRouter.post("/login", checkTokenLogin, checkLogInForm, cw(userController.logInUser));
// userRouter.post("/account",userController.loggedUser);
userRouter.post("/signup", checkSubscribeForm, cw(userController.createUser));
>>>>>>> a7f24220935b7052b7f8ce185bd1bfdab3a145f7

module.exports = userRouter;