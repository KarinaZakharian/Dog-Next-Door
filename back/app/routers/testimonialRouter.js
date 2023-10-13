const express = require('express');
const { testimonialController } = require('../controllers/index.js');
const testimonialRouter = express.Router();
const { checkTokenMember } = require('../services/tokenController.js');

// Import des services
const { controlWrapper: cw } = require('../services/errorService.js');

//!Route GET

// Route POST

testimonialRouter.post(
  '/testimonial/add-comment',
  checkTokenMember,
  testimonialController.createTestimonial
);

module.exports = testimonialRouter;
