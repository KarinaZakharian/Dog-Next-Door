const client = require('../services/clientPg');

const userDatamapper = {
    getOneUser : async (newUser) => {
        try {
            const getUser = newUser;
            const query = `SELECT * FROM "user"
                            WHERE "email"=$1`;
            const value = [getUser.email];
            const userFound = await client.query(query, value);
            return userFound.rows[0];
        } catch (error) {
            return console.error("Problème de recherche BDD utilisateur")
        }

    },

    addUser : async (newUser) => {
        try {
            const userToAdd = newUser;
            console.log(userToAdd);
            const query = `INSERT INTO "user"
                    ("firstname", "lastname", "email", "user_address", "user_password")
                    VALUES ($1, $2, $3, $4, $5)`;
            const {firstname, lastname, email, user_address, user_password} = userToAdd;
            const values = [firstname, lastname, email, user_address, user_password]
            const result = await client.query(query, values);
            return result;
        } catch (error) {
            return error
        }
    },
};

module.exports = userDatamapper;