const client = require('../services/clientPg');

const inboxDatamapper = {
    
    //! Get message of users
    getMessagesById : async (id) => {
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
            return console.error("Problème de recherche BDD utilisateur")
        }
    },
    
    //! Get message of users
    getPastMessages : async (id) => {
        try {
            const userId = id;
            const query = `
            SELECT *,  
            json_build_object('id',b.id, 'start_date',b.start_date,'end_date',b.end_date,'message', b.message,'booking_status', b.booking_status,'user_id', b.user_id,'sender_id',b.sender_id) as booking
            FROM "user" u
            LEFT JOIN "booking" b
            ON u."id" = b."sender_id"
            WHERE b."sender_id"=$1 AND b."booking_status" = 'passé'`;
            
            const value = [userId];
            const bookingFound = await client.query(query, value);
            return bookingFound.rows[0];
        } catch (error) {
            return console.error("Problème de recherche BDD utilisateur")
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
    
    getBookingRequest : async (id) => {
        try {
            const userId = id;
            
            
            const query = `
            SELECT u.*,  
            json_build_object('id',b.id, 'start_date',b.start_date,'end_date',b.end_date,'message', b.message,'booking_status', b.booking_status,'user_id', b.user_id,'sender_id',b.sender_id) as booking,
            json_build_object('id', a.id,'name', a.animal_name, 'size', a.size, 'birth_date', a.birth_date, 'type', a.type, 'energy', a.energy, 'mealhours', a.mealhours, 'walk', a.walk, 'user_id', a.user_id, 'race', a.race) as animal
            FROM "user" u
            LEFT JOIN "booking" b ON u."id" = b."sender_id"
            LEFT JOIN "animal" a ON u."id"= a."user_id"
           
            WHERE b."sender_id" = $1`;
            
            const value = [userId];
            const bookingFound = await client.query(query, value);
            
            
            
            return bookingFound.rows[0];
        } catch (error) {
            return console.error("Problème de recherche BDD utilisateur")
        }
    },
    
    getBookingReceived : async (id) => {
        try {
            const userId = id;
            const query = `
            SELECT u.*,  
            json_build_object('id',b.id, 'start_date',b.start_date,'end_date',b.end_date,'message', b.message,'booking_status', b.booking_status,'user_id', b.user_id,'sender_id',b.sender_id) as booking,
            json_build_object('id', a.id,'name', a.animal_name, 'size', a.size, 'birth_date', a.birth_date, 'type', a.type, 'energy', a.energy, 'mealhours', a.mealhours, 'walk', a.walk, 'user_id', a.user_id, 'race', a.race) as animal
            FROM "user" u
            LEFT JOIN "booking" b ON u."id" = b."user_id"
            LEFT JOIN "animal" a ON u."id"= a."user_id"
           
            WHERE b."user_id" = $1 AND b."booking_status" = 'en attente'`;
            
            const value = [userId];
            const bookingFound = await client.query(query, value);
            return bookingFound.rows[0];
        } catch (error) {
            return console.error("Problème de recherche BDD utilisateur")
        }
    },

    bookingAccepted : async (id) => {

        try {
            const clientId = id;
            const query = `
            UPDATE "booking"
            SET "booking_status" = $1 
            WHERE "user_id" = $2
            `;
            const value = ['A venir', clientId];
            const result = await client.query(query, value);
            return result.rowCount
        } catch (error) {
            return console.error("Problème de recherche BDD utilisateur")
        }
    },

    getUpcomingBooking : async (id ) => {
        try {
            const userId = id;
            const query = `
            SELECT *,  
            json_build_object('id',b.id, 'start_date',b.start_date,'end_date',b.end_date,'message', b.message,'booking_status', b.booking_status,'user_id', b.user_id,'sender_id',b.sender_id) as booking,
            json_build_object('id', a.id,'name', a.animal_name, 'size', a.size, 'birth_date', a.birth_date, 'type', a.type, 'energy', a.energy, 'mealhours', a.mealhours, 'walk', a.walk, 'user_id', a.user_id, 'race', a.race) as animal
            FROM "user" u
            LEFT JOIN "booking" b ON u."id" = b."user_id"
            LEFT JOIN "animal" a ON u."id"= a."user_id"
            WHERE b."user_id"=$1 AND b."booking_status" = 'à venir'`;
            
            const value = [userId];
            const bookingFound = await client.query(query, value);
            return bookingFound.rows[0];
        } catch (error) {
            return console.error("Problème de recherche BDD utilisateur")
        }
    },

    getPastBooking : async (id ) => {
        try {
            const userId = id;
            const query = `
            SELECT *,  
            json_build_object('id',b.id, 'start_date',b.start_date,'end_date',b.end_date,'message', b.message,'booking_status', b.booking_status,'user_id', b.user_id,'sender_id',b.sender_id) as booking,
            json_build_object('id', a.id,'name', a.animal_name, 'size', a.size, 'birth_date', a.birth_date, 'type', a.type, 'energy', a.energy, 'mealhours', a.mealhours, 'walk', a.walk, 'user_id', a.user_id, 'race', a.race) as animal
            FROM "user" u
            LEFT JOIN "booking" b ON u."id" = b."user_id"
            LEFT JOIN "animal" a ON u."id"= a."user_id"
            WHERE b."user_id"=$1 AND b."booking_status" = 'passé'`;
            
            const value = [userId];
            const bookingFound = await client.query(query, value);
            return bookingFound.rows[0];
        } catch (error) {
            return console.error("Problème de recherche BDD utilisateur")
        }
    },


};

module.exports = inboxDatamapper;