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
      const query = `SELECT * FROM "user"
            WHERE "id"=$1`;
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
      console.log(userToAdd);
      const query = `INSERT INTO "user"
            ("firstname", "lastname", "email", "user_address", "user_password")
            VALUES ($1, $2, $3, $4, $5)`;
      const { firstname, lastname, email, user_address, user_password } =
        userToAdd;
      const values = [firstname, lastname, email, user_address, user_password];
      const result = await client.query(query, values);
      console.log(result);
      return result;
    } catch (error) {
      return error;
    }
  },

  getUsersByZipCode: async (searchParameters) => {
    // try{
    const resultSearch = searchParameters;
    const latitude = parseFloat(resultSearch.latitude);
    const longitude = parseFloat(resultSearch.longitude);
    const radius_km = parseInt(resultSearch.radius);

    const values = [latitude, longitude, radius_km];

    //! Requête qui permet de rechercher un utilisateur dans un périmètre donné en choisissant le rayon au km
    const query = `WITH user_search AS(
            SELECT * , 6371 * (2 * ATAN2(SQRT((SIN((RADIANS("user"."latitude" - $1)) / 2)* SIN((RADIANS("user"."latitude" - $1)) / 2) + COS(RADIANS($1)) * COS(RADIANS("user"."latitude")) * SIN((RADIANS("user"."longitude" - $2)) / 2) * SIN((RADIANS("user"."longitude" - $2)) / 2))), SQRT(1 - (SIN((RADIANS("user"."latitude" - $1)) / 2) * SIN((RADIANS("user"."latitude" - $1)) / 2) + COS(RADIANS($1)) * COS(RADIANS("user"."latitude")) * SIN((RADIANS("user"."longitude" - $2)) / 2) * SIN((RADIANS("user"."longitude" - $2)) / 2))))) 
            AS distance
            FROM "user"
            )
                
            SELECT *
            FROM user_search
            WHERE distance <= $3 
            ORDER BY distance ASC`;

    const usersFound = await client.query(query, values);
    return usersFound.rows;
  },
};

module.exports = userDatamapper;
