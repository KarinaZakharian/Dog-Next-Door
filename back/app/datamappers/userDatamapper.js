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
    // try {
      const userId = id;
      //! Afficher commentaire par pet_sitter
     
      const query = `
      SELECT u.*, 
      json_build_object('id', a.id,'name', a.animal_name, 'size', a.size, 'birth_date', a.birth_date, 'type', a.type, 'energy', a.energy, 'mealhours', a.mealhours, 'walk', a.walk, 'user_id', a.user_id, 'race', a.race) as animal,
      json_build_object('id', d.id, 'start_date', d.start_date, 'end_date', d.end_date) as disponibility,
	    json_build_object('id', b.id, 'start_date', b.start_date, 'end_date', b.end_date, 'message',b.message, 'booking_status', b.booking_status,'user_id',b.user_id,'sender_id', b.sender_id) as booking,
	    json_build_object('id',t.user_id, 'comment',t.body, 'sender_id', t.sender_id) as testimonies
      FROM "user" u
      LEFT JOIN "animal" a ON a."user_id" = u."id" 
      LEFT JOIN "disponibility" d ON d."id" IN (
        SELECT disponibility_id
        FROM "user_has_disponibility"
        WHERE "user_id" = $1
        )
        LEFT JOIN "booking" b ON b."user_id" = u."id"
        LEFT JOIN "testimonial" t ON t."user_id" = u."id"
        WHERE u."id"=$1;
      `;
      const value = [userId];
      const userFound = await client.query(query, value);
      console.log("userFound in datamapper: ",userFound);
      return userFound.rows[0];
    // } catch (error) {
    //   return console.error('Problème de recherche BDD utilisateur');
    // }
  },

  addUser: async (newUser) => {
    try {
      const userToAdd = newUser;
      // console.log(userToAdd);
      const query = `INSERT INTO "user"
        ("firstname", "lastname", "email","avatar", "user_address", "user_password", "latitude", "longitude")
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8)`;
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
        'avatar6.jpg',
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

  getUsersByDistance: async (searchParameters, id) => {
    // try{
    const resultSearch = searchParameters;
    const latitude = parseFloat(resultSearch.latitude);
    const longitude = parseFloat(resultSearch.longitude);
    const userId = parseInt(id);
    const radius_km = parseInt(resultSearch.radius);
    let values = [];
    let query= ``;
    
    //! Requête qui permet de rechercher un utilisateur dans un périmètre donné en choisissant le rayon au km
    if(userId){
       query = `WITH user_search AS(
        SELECT * , ROUND(CAST(6371 * (2 * ATAN2(SQRT((SIN((RADIANS("user"."latitude" - $1)) / 2)* SIN((RADIANS("user"."latitude" - $1)) / 2) + COS(RADIANS($1)) * COS(RADIANS("user"."latitude")) * SIN((RADIANS("user"."longitude" - $2)) / 2) * SIN((RADIANS("user"."longitude" - $2)) / 2))), SQRT(1 - (SIN((RADIANS("user"."latitude" - $1)) / 2) * SIN((RADIANS("user"."latitude" - $1)) / 2) + COS(RADIANS($1)) * COS(RADIANS("user"."latitude")) * SIN((RADIANS("user"."longitude" - $2)) / 2) * SIN((RADIANS("user"."longitude" - $2)) / 2))))) AS numeric),2) 
        AS distance
        FROM "user"
        )
        
        SELECT *
        FROM "user_search"
        WHERE distance <= $3 AND id != $4
        ORDER BY distance ASC`;
       values = [latitude, longitude, radius_km, userId];
    }else{
       query = `WITH user_search AS(
          SELECT * , ROUND(CAST(6371 * (2 * ATAN2(SQRT((SIN((RADIANS("user"."latitude" - $1)) / 2)* SIN((RADIANS("user"."latitude" - $1)) / 2) + COS(RADIANS($1)) * COS(RADIANS("user"."latitude")) * SIN((RADIANS("user"."longitude" - $2)) / 2) * SIN((RADIANS("user"."longitude" - $2)) / 2))), SQRT(1 - (SIN((RADIANS("user"."latitude" - $1)) / 2) * SIN((RADIANS("user"."latitude" - $1)) / 2) + COS(RADIANS($1)) * COS(RADIANS("user"."latitude")) * SIN((RADIANS("user"."longitude" - $2)) / 2) * SIN((RADIANS("user"."longitude" - $2)) / 2))))) AS numeric),2) 
          AS distance
          FROM "user"
          )
          
          SELECT *
          FROM "user_search"
          WHERE distance <= $3
          ORDER BY distance ASC`;
       values = [latitude, longitude, radius_km];
    };
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

  addNewUserDisponibilities: async (beginDate, finalDate, id) => {
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
    return result.rowCount;
  },

  modifyDisponibility: async (disponibility, startDate, endDate, userId) => {
    
  
    const query = `
    WITH update_disponibility AS (
      UPDATE "disponibility"
      SET "start_date" = $2, "end_date" = $3, "updated_at" = NOW()
      WHERE "id" = $1
      RETURNING "id" AS dispo_id
    )
    UPDATE "user_has_disponibility"
    SET "user_id" = $4, "disponibility_id" = (SELECT dispo_id FROM update_disponibility)
    WHERE "disponibility_id" = (SELECT dispo_id FROM update_disponibility)
    `;
    const values = [disponibility, startDate,endDate, userId];
    const result = await client.query(query, values);
    return result.rowCount;
  },

  modifyOurAnimal : async (animalInformation, userId) => {

      const {
        animal,
        name,
        size,
        birth_date,
        race,
        energy,
        mealhours,
        walk
      } = animalInformation;

      const query = `
      UPDATE "animal"
      SET "type" = $1, 
      "animal_name" = $2, 
      "size" = $3, 
      "birth_date" = $4,
      "race" = $5,
      "energy" = $6,
      "mealhours" = $7,
      "walk" = $8,
      "updated_at" = NOW()

      WHERE user_id = $9
      `;

      const values = [
        animal,
        name,
        size,
        birth_date,
        race,
        energy,
        mealhours,
        walk,
        userId
      ];
      const result = await client.query(query, values);
      return result.rowCount;
  },
};

module.exports = userDatamapper;
