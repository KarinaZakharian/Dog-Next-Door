const client = require('../services/clientPg');

const userDatamapper = {
    async getOneUser (newUser){
        const getUser = newUser;
        const query = `SELECT * FROM "user"
                        WHERE "email"=$1`;
        const value = [getUser.email];
        const userFound = await client.query(query, value);
        return userFound.rows[0];
    },
};

module.exports = userDatamapper;