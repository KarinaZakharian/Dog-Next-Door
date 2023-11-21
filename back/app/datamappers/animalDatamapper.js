const { log } = require('console');
const client = require('../services/clientPg');

const animalDatamapper = {
  addNewAnimal: async (animalInformations) => {
    const {
      animal,
      name,
      race,
      date_birth,
      size,
      walk,
      mealhours,
      energy,
      userId,
    } = animalInformations;
    const query = `INSERT INTO "animal"
        ("type","animal_name", "race", "birth_date", "size", "walk", "mealhours", "energy", "user_id")
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)`;
    const values = [
      animal,
      name,
      race,
      date_birth,
      size,
      walk,
      mealhours,
      energy,
      userId,
    ];
    const result = await client.query(query, values);
    return result.rowCount;
  },

  getUserWithAnimal: async (id) => {
    const userId = id;
    const query = `
        SELECT u.*
        FROM "user" u
        RIGHT JOIN "animal" a ON a."user_id" = u."id"
        WHERE u."id" = $1;
        `;
    const value = [userId];
    const result = await client.query(query, value);
    return result.rows[0];
  },
};

module.exports = animalDatamapper;
