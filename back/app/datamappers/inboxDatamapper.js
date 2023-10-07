const client = require('../services/clientPg');

const inboxDatamapper = {

    //! Get message of users
    getMessagesById : async (id) => {
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

    //! Get message of users
    getPastMessages : async (id) => {
        try {
            const userId = id;
            const query = `
            SELECT * 
            FROM "user" 
            LEFT JOIN "booking"
            ON "user"."id" = "booking"."user_id"
            WHERE "user"."id"=$1 AND "booking"."mess_status" = 'passé'`;
            
            const value = [userId];
            const bookingFound = await client.query(query, value);
            return bookingFound.rows[0];
        } catch (error) {
            return console.error("Problème de recherche BDD utilisateur")
        }
    },

    //! Get message of users
    getUpcomingMessages : async (id) => {
        try {
            const userId = id;
            const query = `
            SELECT * 
            FROM "user" 
            LEFT JOIN "booking"
            ON "user"."id" = "booking"."user_id"
            WHERE "user"."id"=$1 AND "booking"."mess_status" = 'à venir'`;
            
            const value = [userId];
            const bookingFound = await client.query(query, value);
            return bookingFound.rows[0];
        } catch (error) {
            return console.error("Problème de recherche BDD utilisateur")
        }
    },
  
    getAwaitingMessages : async (id) => {
        try {
            const userId = id;
            const query = `
            SELECT * 
            FROM "user" 
            LEFT JOIN "booking"
            ON "user"."id" = "booking"."user_id"
            WHERE "user"."id"=$1 AND "booking"."mess_status" = 'en attente'`;
            
            const value = [userId];
            const bookingFound = await client.query(query, value);
            return bookingFound.rows[0];
        } catch (error) {
            return console.error("Problème de recherche BDD utilisateur")
        }
    },
  
    getValidateMessages : async (id) => {
        try {
            const userId = id;
            const query = `
            SELECT * 
            FROM "user" 
            LEFT JOIN "booking"
            ON "user"."id" = "booking"."user_id"
            WHERE "user"."id"=$1 AND "booking"."mess_status" = 'validé'`;
            
            const value = [userId];
            const bookingFound = await client.query(query, value);
            return bookingFound.rows[0];
        } catch (error) {
            return console.error("Problème de recherche BDD utilisateur")
        }
    },
};

module.exports = inboxDatamapper;