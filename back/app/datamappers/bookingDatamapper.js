const { log } = require('console');
const client = require('../services/clientPg');

const bookingDatamapper = {
  // getAllDisponibilitiesByUser : () => {

  //   const userId = id;
  //   const sitterId = petSitterId;
  //   const query= `
  //   SELECT *
  //     SELECT *
  //     FROM "user_has_disponibility"
  //     WHERE "user_id" = $1 AND "disponibility_id" = $2
  //   `;
  //   const values = [userId,sitterId];
  //   const result = await client.query(query, values);
  //   return result.rows[0];
  // },

  getOneUserDisponibility: async (petSitterId, disponbility_id) => {
    const sitterId = petSitterId;
    const disponibilityId = disponbility_id;
    const query = `
    SELECT *
    FROM "disponibility"
    WHERE id = (
      SELECT "disponibility_id" 
      FROM "user_has_disponibility"
      WHERE "user_id" = $1 AND "disponibility_id" =$2
    )  
    `;
    const values = [sitterId, disponibilityId];
    const result = await client.query(query, values);
    
    return result.rows[0];
  },

  addBooking: async (petSitterId,userId, booking) => {
    try {
      const pet_sitter_id = petSitterId;
      const idConnectedUser = userId;
      const {
        start_date,
        end_date,
        message,
        booking_status,
        user_id,
        sender_id,
        disponibility_id,
      } = booking;

      //! Fonctions sql qui permet d'ajouter une réservations et de supprimer une disponibilité
      const query = `
      SELECT * FROM add_booking($1,$2,$3,$4,$5,$6,$7)
      `;
      const values = [
        start_date,
        end_date,
        'Réservation accepté',
        'en attente',
        pet_sitter_id,
        idConnectedUser,
        disponibility_id,
      ];
      console.log(values);
      const result = await client.query(query, values);
      return result.rows[0];
    } catch (error) {
      console.log(error);
      return error;
    }
  },
};

module.exports = bookingDatamapper;
