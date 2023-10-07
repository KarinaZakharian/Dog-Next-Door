const express = require("express");
const {inboxController} = require('../controllers/index.js');
const inboxRouter= express.Router();
const { checkTokenMember } = require('../services/tokenController.js')

// Import des services
const { controlWrapper:cw } = require('../services/errorService.js')

//!Route GET

inboxRouter.get("/inbox", checkTokenMember, cw(inboxController.findMessageByUser));
// inboxRouter.get("/inbox/past", checkTokenMember, cw(inboxController.findPastMessages));
// inboxRouter.get("/inbox/upcoming", checkTokenMember, cw(inboxController.findUpcomingMessages));
// inboxRouter.get("/inbox/awaiting", checkTokenMember, cw(inboxController.findawaitingMessages));

//!Route POST

module.exports = inboxRouter;