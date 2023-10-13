const client = require('../services/clientPg');

const testimonialDatamapper = {
  getTestimonialPetSitter: async (id) => {
    const petSitterId = id;
    const query = `
    SELECT * 
    FROM "user" u 
    LEFT JOIN "testimonial" t ON u."id = t."user_id
    WHERE u."id" = $1`;

    const value = [petSitterId];
    const testimonialUser = await client.query(query, value);
    return testimonialUser.rows[0];
  },

  addNewTestimonial: async (sitterId, testimonial, userId) => {
    const data = testimonial;
    const userIdentifiant = userId;
    const petSitterId = id;

    // Requete query pour insérer un commentaire
    const query = `
    INSERT INTO "testimonial" ("body","rating","pet_sitter_id","user_id")
    VALUES ($1, $2, $3, $4)`;
  },
};

module.exports = testimonialDatamapper;
