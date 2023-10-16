const express = require("express");
const {inboxController, bookingController} = require('../controllers/index.js');
const inboxRouter= express.Router();
const { checkTokenMember } = require('../services/tokenController.js')

// Import des services
const { controlWrapper:cw } = require('../services/errorService.js')

//!Route GET

inboxRouter.get("/inbox/awaiting", checkTokenMember, cw(inboxController.findBookingReceived));
inboxRouter.get("/inbox/uppast", checkTokenMember, cw(inboxController.findPastBooking));
inboxRouter.get("/inbox/upcoming", checkTokenMember, cw(inboxController.findUpcomingBooking));
inboxRouter.get("/inbox/demands", checkTokenMember, cw(inboxController.findBookingRequest));

//!Route POST

inboxRouter.post("/inbox/awaiting", checkTokenMember, cw(inboxController.acceptBooking));

module.exports = inboxRouter;