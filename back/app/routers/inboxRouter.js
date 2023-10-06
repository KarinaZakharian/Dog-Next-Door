const express = require("express");
const {inboxController} = require('../controllers/index.js');
const inboxRouter= express.Router();
const { checkTokenMember } = require('../services/tokenController.js')

// Import des services
const { controlWrapper:cw } = require('../services/errorService.js')

//!Route GET

inboxRouter.get("/inbox", checkTokenMember, cw(inboxController.findMessageByUser));

//!Route POST

module.exports = inboxRouter;