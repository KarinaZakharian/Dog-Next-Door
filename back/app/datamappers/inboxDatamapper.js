const client = require('../services/clientPg');

const inboxDatamapper = {
  //! Get message of users
  getMessagesById: async (id) => {
    try {
      const userId = id;
      const query = `
            SELECT *,  
            json_build_object('id',b.id, 'start_date',b.start_date,'end_date',b.end_date,'message', b.message,'booking_status', b.booking_status,'user_id', b.user_id,'sender_id',b.sender_id) as booking
            FROM "user" u
            LEFT JOIN "booking" b
            ON u."id" = b."sender_id"
            WHERE b."sender_id"=$1 AND b."booking_status" = 'en attente'`;

      const value = [userId];
      const bookingFound = await client.query(query, value);
      return bookingFound.rows[0];
    } catch (error) {
      return console.error('Problème de recherche BDD utilisateur');
    }
  },

  //! Get message of users
  getPastMessages: async (id) => {
    try {
      const userId = id;
      const query = `
            WITH petsitter AS (
                SELECT * FROM "user" WHERE "id" = $2
            )
            SELECT u.*, 
            json_build_object('id',b.id, 'start_date',b.start_date,'end_date',b.end_date,'booking_status', b.booking_status,'user_id', b.user_id,'sender_id',b.sender_id) as booking,
            json_build_object('id', a.id,'name', a.animal_name, 'type', a.type, 'user_id', a.user_id, 'race', a.race, 'petsitter_firsname', p.firstname, 'petsitter_lastname', p.lastname) as animal
            FROM "user" u, "booking" b, "animal" a, petsitter p
            WHERE u."id"=$1 AND b."booking_status" = 'Passé' AND a."user_id" = $2;`;

      const value = [userId];
      const bookingFound = await client.query(query, value);
      return bookingFound.rows;
    } catch (error) {
      return console.error('Problème de recherche BDD utilisateur');
    }
  },

  //! Get message of users
  // getUpcomingMessages : async (id) => {
  //     try {
  //         const userId = id;
  //         const query = `
  //         SELECT *,
  //         json_build_object('id',b.id, 'start_date',b.start_date,'end_date',b.end_date,'message', b.message,'booking_status', b.booking_status,'user_id', b.user_id,'sender_id',b.sender_id) as booking
  //         FROM "user" u
  //         LEFT JOIN "booking" b
  //         ON u."id" = b."user_id"
  //         WHERE b."user_id"=$1 AND b."booking_status" = 'à venir'`;

  //         const value = [userId];
  //         const bookingFound = await client.query(query, value);
  //         return bookingFound.rows[0];

  //     } catch (error) {
  //         return console.error("Problème de recherche BDD utilisateur")
  //     }
  // },

  getBookingRequest: async (id, pet_sitter_id) => {
    try {
      const userId = id;

      const query = `
            WITH petsitter AS (
                SELECT * FROM "user" WHERE "id" = $2
            )
            SELECT u.*, 
            json_build_object('id',b.id, 'start_date',b.start_date,'end_date',b.end_date,'booking_status', b.booking_status,'user_id', b.user_id,'sender_id',b.sender_id) as booking,
            json_build_object('id', a.id,'name', a.animal_name, 'type', a.type, 'user_id', a.user_id, 'race', a.race, 'petsitter_firstname', p.firstname, 'petsitter_lastname', p.lastname) as animal
            FROM "user" u, "booking" b, "animal" a, petsitter p
            WHERE u."id"=$1 AND a."user_id" = $1 AND b."sender_id" = $1`;

      const value = [userId, pet_sitter_id];
      const bookingFound = await client.query(query, value);

      return bookingFound.rows;
    } catch (error) {
      return console.error('Problème de recherche BDD utilisateur');
    }
  },

  getBookingReceived: async (id) => {
    try {
      const userId = id;
      const query = `
            SELECT u.*,  
            json_build_object('id',b.id, 'start_date',b.start_date,'end_date',b.end_date,'message', b.message,'booking_status', b.booking_status,'user_id', b.user_id,'sender_id',b.sender_id) as booking,
            json_build_object('id', a.id,'name', a.animal_name, 'size', a.size, 'birth_date', a.birth_date, 'type', a.type, 'energy', a.energy, 'mealhours', a.mealhours, 'walk', a.walk, 'user_id', a.user_id, 'race', a.race) as animal
            FROM "user" u
            LEFT JOIN "booking" b ON u."id" = b."user_id"
            LEFT JOIN "animal" a ON b."sender_id" = a."user_id"
           
            WHERE b."user_id" = $1 AND b."booking_status" = 'En attente'`;

      const value = [userId];
      const bookingFound = await client.query(query, value);
      return bookingFound.rows;
    } catch (error) {
      return console.error('Problème de recherche BDD utilisateur');
    }
  },

  bookingAccepted: async (id) => {
    try {
      const clientId = id;
      const query = `
            UPDATE "booking"
            SET "booking_status" = $1 
            WHERE "user_id" = $2
            `;
      const value = ['A venir', clientId];
      const result = await client.query(query, value);
      return result.rowCount;
    } catch (error) {
      return console.error('Problème de recherche BDD utilisateur');
    }
  },

  getUpcomingBooking: async (id, user_request) => {
    try {
      const userId = id;
      const userRequest = user_request;

      query = `
                WITH petsitter AS (
                    SELECT * FROM "user" WHERE "id" = $2
               )
               SELECT 
               json_build_object('id',b.id, 'start_date',b.start_date,'end_date',b.end_date,'booking_status', b.booking_status,'user_id', b.user_id,'sender_id',b.sender_id) as booking,
               json_build_object('id', a.id,'name', a.animal_name, 'type', a.type, 'user_id', a.user_id, 'race', a.race, 'petsitter_firsname', p.firstname, 'petsitter_lastname', p.lastname) as animal
               FROM "user" u, "booking" b, "animal" a, petsitter p
               WHERE u."id" = $1 AND b."booking_status" = 'A venir' AND a."user_id" = $2 AND b."user_id" = $1`;
      values = [userId, userRequest];

      const bookingFound = await client.query(query, values);
      console.log(bookingFound.rows);
      return bookingFound.rows;
    } catch (error) {
      console.log(error);
      return console.error('Problème de recherche BDD utilisateur');
    }
  },

  getPastBooking: async (id, user_id) => {
    try {
      const userId = id;
      const query = `
            WITH petsitter AS (
                SELECT * FROM "user" WHERE "id" = $2
            )
            SELECT u.*, 
            json_build_object('id',b.id, 'start_date',b.start_date,'end_date',b.end_date,'booking_status', b.booking_status,'user_id', b.user_id,'sender_id',b.sender_id) as booking,
            json_build_object('id', a.id,'name', a.animal_name, 'type', a.type, 'user_id', a.user_id, 'race', a.race, 'petsitter_firstname', p.firstname, 'petsitter_lastname', p.lastname) as animal
            FROM "user" u, "booking" b, "animal" a, petsitter p
            WHERE u."id"=$1 AND b."booking_status" = 'Passé' AND a."user_id" = $2 AND b."user_id" = $1`;

      const value = [userId, user_id];
      const bookingFound = await client.query(query, value);
      return bookingFound.rows;
    } catch (error) {
      return console.error('Problème de recherche BDD utilisateur');
    }
  },

  getUserBooking: async (id) => {
    try {
      const query = `
                select * FROM booking WHERE "user_id" = $1
            `;

      const value = [id];
      const result = await client.query(query, value);
      return result.rows[0];
    } catch (error) {
      return console.error('Problème de recherche BDD utilisateur');
    }
  },
  getSenderBooking: async (id) => {
    try {
      const query = `
                select * FROM booking WHERE "sender_id" = $1
            `;

      const value = [id];
      const result = await client.query(query, value);
      return result.rows[0];
    } catch (error) {
      return console.error('Problème de recherche BDD utilisateur');
    }
  },

  addTestimony: async (userTestimony) => {
    const testimonyMessage = userTestimony.comment;
    const petsitterId = parseInt(userTestimony.client_id);
    const senderUser = userTestimony.userId;
    const query = `
      INSERT INTO "testimonial" ("body", "user_id", "sender_id")
      VALUES ($1, $2, $3)
      `;
    const values = [testimonyMessage, petsitterId, senderUser];

    const testimonyAdded = client.query(query, values);
    return testimonyAdded.rowCount;
  },

  getAllTestimonies: async (user_id) => {
    const query = `
        SELECT * 
        FROM "testimonial" 
        WHERE user_id = $1
        `;
    const value = [user_id];
    const result = await client.query(query, value);
    return result.rows;
  },
};

module.exports = inboxDatamapper;
