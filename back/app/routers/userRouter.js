const express = require("express");
const {userController} = require('../controllers/index.js');
const userRouter= express.Router();
const { checkTokenLogin, checkTokenMember, checkTokenRemove } = require('../services/tokenController.js')

// Import des services
const { controlWrapper:cw } = require('../services/errorService.js')
const { checkSubscribeForm, checkLogInForm, checkAccountForm } = require('../services/validation/validationForm.js');

//!Route GET

userRouter.get("/petsitter/:id", cw(userController.findUserById));

userRouter.get('/account', checkTokenMember , cw(userController.findUser));
// userRouter.get("/logout", checkTokenRemove);

userRouter.get("/test", (req,res)=> {
  const dateRange = "14/02/2023 au 17/02/2023";
const dates = dateRange.split(" au ");

// Assurez-vous que le format de date est "dd/MM/yyyy"
const dateFormat = "dd/MM/yyyy";

const date1 = new Date(dates[0].replace(/(\d{2})\/(\d{2})\/(\d{4})/, '$2/$1/$3'));
const date2 = new Date(dates[1].replace(/(\d{2})\/(\d{2})\/(\d{4})/, '$2/$1/$3'));

console.log("Date 1:", date1);
console.log("Date 2:", date2);
})

//!Route POST

userRouter.post("/login" , cw(userController.logInUser));

userRouter.post("/subscribe", cw(userController.createUser));

userRouter.post("/search", cw(userController.findUserByDistance));

userRouter.post("/petsitter/:id/booking", userController.createBooking);


//!Route PATCH
userRouter.patch("/account/form",checkTokenMember ,cw(userController.updateOptionnalInformation));

userRouter.patch("/account/form2",checkTokenMember ,cw(userController.updatePersonnalInformation));

module.exports = userRouter;

