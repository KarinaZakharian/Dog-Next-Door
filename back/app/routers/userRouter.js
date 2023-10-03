const express = require("express");
const {userController} = require('../controllers/index.js');
const userRouter= express.Router();
const { checkTokenLogin, checkTokenMember } = require('../services/tokenController.js')

// Import des services
const { controlWrapper:cw } = require('../services/errorService.js')
const { checkSubscribeForm, checkLogInForm } = require('../services/validation/validationForm.js');

//!Route GET
userRouter.get("/login", (req,res) => {
    res.send("Login page")
})
userRouter.get("/subscribe", (req,res) => {
    res.send("Subscribe page")
})
//!Route POST
userRouter.post("/login", checkTokenLogin, cw(userController.logInUser));

userRouter.post("/subscribe", checkTokenLogin, cw(userController.createUser));

module.exports = userRouter;