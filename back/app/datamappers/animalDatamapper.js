const { log } = require('console');
const client = require('../services/clientPg');

const animalDatamapper = {
    addNewAnimal : async(animalInformations) => {
        const {animal, name, race, date_birth, size, walk, mealhours, energy, userId} = animalInformations;
        console.log(animalInformations);
        const query = `INSERT INTO "animal"
                    ("type","name", "breed", "birthdate", "weight_category", "potty_break_schedule", "feeding_schedule", "energy_level", "user_id")
                    VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)`;
        const values = [animal, name, race, date_birth, size, walk, mealhours, energy, userId];
        const result = await client.query(query, values);
        console.log(result);
    },


};

module.exports = animalDatamapper;