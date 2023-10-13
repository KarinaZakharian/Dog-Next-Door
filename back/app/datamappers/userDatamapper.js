const { log } = require('console');
const client = require('../services/clientPg');
const userDatamapper = {
  getOneUserByEmail: async (newUser) => {
    try {
      const getUser = newUser;
      const query = `SELECT * FROM "user"
      WHERE "email"=$1`;
      const value = [getUser.email];
      const userFound = await client.query(query, value);
      return userFound.rows[0];
    } catch (error) {
      return console.error('Problème de recherche BDD utilisateur');
    }
  },

  getOneUserById: async (id) => {
    try {
      const userId = id;
      //! Afficher commentaire par pet_sitter
      // const query = `
      // SELECT u.*,
      // json_build_object('id', a.id,'name', a.animal_name, 'size', a.size, 'birth_date', a.birth_date, 'type', a.type, 'energy', a.energy, 'mealhours', a.mealhours, 'walk', a.walk, 'user_id', a.user_id, 'race', a.race) as animal,
      // json_build_object('id', d.id, 'start_date', d.start_date, 'end_date', d.end_date) as disponibility,
      // json_build_object('id', t.id, 'body', t.body, 'rating', t.rating, 'pet_sitter_id', t.pet_sitter_id,'user_id', t.user_id) as testimonial
      // FROM "user" u
      // LEFT JOIN "animal" a ON a."user_id" = u."id"
      // LEFT JOIN "disponibility" d ON d."id" IN (
      //   SELECT disponibility_id
      //   FROM "user_has_disponibility"
      //   WHERE "user_id" = $1
      //   )
      //   LEFT JOIN "testimonial" t ON u."id" = t."pet_sitter_id"
      //   WHERE u."id"=$1;`;
      const query = `
      SELECT u.*, 
      json_build_object('id', a.id,'name', a.animal_name, 'size', a.size, 'birth_date', a.birth_date, 'type', a.type, 'energy', a.energy, 'mealhours', a.mealhours, 'walk', a.walk, 'user_id', a.user_id, 'race', a.race) as animal,
      json_build_object('id', d.id, 'start_date', d.start_date, 'end_date', d.end_date) as disponibility
      FROM "user" u
      LEFT JOIN "animal" a ON a."user_id" = u."id" 
      LEFT JOIN "disponibility" d ON d."id" IN (
        SELECT disponibility_id
        FROM "user_has_disponibility"
        WHERE "user_id" = $1
        )
        WHERE u."id"=$1;`;
      const value = [userId];
      const userFound = await client.query(query, value);
      return userFound.rows[0];
    } catch (error) {
      return console.error('Problème de recherche BDD utilisateur');
    }
  },

  addUser: async (newUser) => {
    try {
      const userToAdd = newUser;
      // console.log(userToAdd);
      const query = `INSERT INTO "user"
        ("firstname", "lastname", "email", "user_address", "user_password", "latitude", "longitude")
        VALUES ($1, $2, $3, $4, $5, $6, $7)`;
      const {
        firstname,
        lastname,
        email,
        user_address,
        user_password,
        latitude,
        longitude,
      } = userToAdd;
      const values = [
        firstname,
        lastname,
        email,
        user_address,
        user_password,
        latitude,
        longitude,
      ];

      const result = await client.query(query, values);

      return result;
    } catch (error) {
      return error;
    }
  },

  getUsersByDistance: async (searchParameters) => {
    // try{
    const resultSearch = searchParameters;
    const latitude = parseFloat(resultSearch.latitude);
    const longitude = parseFloat(resultSearch.longitude);

    const radius_km = parseInt(resultSearch.radius);

    const values = [latitude, longitude, radius_km];

    //! Requête qui permet de rechercher un utilisateur dans un périmètre donné en choisissant le rayon au km
    const query = `WITH user_search AS(
        SELECT * , ROUND(CAST(6371 * (2 * ATAN2(SQRT((SIN((RADIANS("user"."latitude" - $1)) / 2)* SIN((RADIANS("user"."latitude" - $1)) / 2) + COS(RADIANS($1)) * COS(RADIANS("user"."latitude")) * SIN((RADIANS("user"."longitude" - $2)) / 2) * SIN((RADIANS("user"."longitude" - $2)) / 2))), SQRT(1 - (SIN((RADIANS("user"."latitude" - $1)) / 2) * SIN((RADIANS("user"."latitude" - $1)) / 2) + COS(RADIANS($1)) * COS(RADIANS("user"."latitude")) * SIN((RADIANS("user"."longitude" - $2)) / 2) * SIN((RADIANS("user"."longitude" - $2)) / 2))))) AS numeric),2) 
        AS distance
        FROM "user"
        )
        
        SELECT *
        FROM "user_search"
        WHERE distance <= $3 
        ORDER BY distance ASC`;

    const usersFound = await client.query(query, values);
    return usersFound.rows;
  },

  addOptionnalInformations: async (informationAddToUser, userId) => {
    try {
      const userConcerned = informationAddToUser;

      const query = `
          UPDATE "user"
          SET 
          accomodation = $1,
          garden = $2,
          animal_size = ARRAY[$3],
          walking_duration = $4,
          additionnal_information = ARRAY[$5],
          description = $6
          WHERE id = $7;
          `;

      const {
        accomodation,
        garden,
        animal_size,
        walking_duration,
        additionnal_information,
        description,
      } = userConcerned;

      const values = [
        accomodation,
        garden,
        animal_size,
        walking_duration,
        additionnal_information,
        description,
        userId,
      ];
      const result = await client.query(query, values);

      return result;
    } catch (error) {
      return error;
    }
  },

  addPersonnalInformation: async (personnalInformation, userId) => {
    try {
      const userConcerned = personnalInformation;
      const query = `
          UPDATE "user"
          SET 
          firstname = $1,
          lastname = $2,
          email = $3,
          user_address = $4,
          user_password = $5,
          latitude = $6,
          longitude = $7
          WHERE id = $8`;

      const {
        firstname,
        lastname,
        email,
        user_address,
        user_password,
        latitude,
        longitude,
      } = userConcerned;

      const values = [
        firstname,
        lastname,
        email,
        user_address,
        user_password,
        latitude,
        longitude,
        userId,
      ];
      const result = await client.query(query, values);

      return result;
    } catch (error) {
      console.log(error);
      return error;
    }
  },

  getUserDisponibility: async (id) => {
    const userId = parseInt(id);
    const query = `
        SELECT * FROM "disponibility"
        WHERE id IN
        (
          SELECT disponibility_id FROM user_has_disponibility
          WHERE user_id = $1
          )
          `;
    const value = [userId];
    const userDisponibilities = await client.query(query, value);
    return userDisponibilities.rows;
  },

  getUserBooking: async (id) => {
    const userId = parseInt(id);
    const query = `
          SELECT * FROM booking
          JOIN "user" ON "user"."id" = "booking"."sender_id"
          WHERE user_id = $1
          `;
    const value = [userId];
    const userBookings = await client.query(query, value);
    return userBookings.rows;
  },

  addNewUserDisponibilitites: async (beginDate, finalDate, id) => {
    const startDate = beginDate;
    const endDate = finalDate;
    const userId = id;

    const query = `
          WITH insert_disponibility AS(
            INSERT INTO
            "disponibility" ("start_date", "end_date")
            VALUES ($1, $2)
            RETURNING "disponibility"."id" AS dispo_id
            )
            INSERT INTO "user_has_disponibility"
            ("user_id", "disponibility_id")
            VALUES ($3, (SELECT dispo_id FROM insert_disponibility))
            `;
    const values = [beginDate, finalDate, id];
    const result = await client.query(query, values);
    return result;
  },
};

module.exports = userDatamapper;
