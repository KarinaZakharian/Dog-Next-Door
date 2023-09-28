const express = require("express");
const {userController} = require('../controllers/index.js')

const userRouter= express.Router();

userRouter.post("/login", userController.findUser);

module.exports = userRouter;