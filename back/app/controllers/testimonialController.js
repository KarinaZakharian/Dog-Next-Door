const testimonialDatamapper = require('../datamappers/testimonialDatamapper');
const APIError = require('../services/APIError.js');
const jwt = require('jsonwebtoken');

const testimonialController = {
  findTestimonialByUser: async (req, res) => {
    //! On récupère l'id avec le token de l'utilisateur
    const petSitterId = req.params.id;

    try {
      const testimonialPetSitter =
        await testimonialDatamapper.getTestimonialPetSitter(petSitterId);
      res.json(testimonialPetSitter);
    } catch (error) {
      res.status(500).json(error.toString());
    }
  },

  createTestimonial: async (req, res) => {
    const testimonialInformation = req.body;
    const petSitterId = '';
    const userId = req.userId;
    // récupérer l'id du pet sitter

    // insertion depuis le datamapper testimonial
    const sendedTestimonial = await testimonialDatamapper.addNewTestimonial(
      petSitterId,
      testimonialInformation,
      userId
    );
    // Envoi du message de succès pour l'envoi du commentaire

    res.json({ message: 'Votre commentaire a été ajouté avec succès' });
  },
};

module.exports = testimonialController;
