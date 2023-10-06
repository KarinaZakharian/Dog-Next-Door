const client = require('../services/clientPg');

const inboxDatamapper = {
    
    // getUserById : async (user) => {
    
    //     try {
    //         const findedUser = user;
    //         const query=`
    //         SELECT * FROM "user" WHERE "id" =$1`;
    //         const value = [findedUser.id];
    //         const userFound = await client.query(query, value);
    //         return userFound.rows[0];
    //     } catch (error) {
    
    //     }
    // },
    
    //! Get message of users
    getMessageById : async (id) => {
        try {
            const userId = id;
            const query = `
            SELECT * 
            FROM "user" 
            LEFT JOIN "booking"
            ON "user"."id" = "booking"."user_id"
            WHERE "user"."id"=$1`;
            
            const value = [userId];
            const bookingFound = await client.query(query, value);
            return bookingFound.rows[0];
        } catch (error) {
            return console.error("Problème de recherche BDD utilisateur")
        }
    },
};

module.exports = inboxDatamapper;