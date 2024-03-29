--CREATE OR REPLACE FUNCTION nomFonction (params) RETURNS retourFonction
--AS $$
    -- Requêtes à exécuter dans la fonction
--$$ LANGUAGE sql;

CREATE OR REPLACE FUNCTION add_booking(startDate DATE, endDate DATE, messageBooking TEXT, status_booking TEXT,user_id INT, sender_id INT,disponibility_id INT) RETURNS "booking" AS $$
 DELETE FROM "disponibility"
    WHERE "disponibility"."id" =$7;
  INSERT INTO "booking" ("start_date", "end_date", "message","booking_status","user_id","sender_id")
    VALUES ($1, $2, $3, $4, $5, $6) RETURNING *;
$$ LANGUAGE SQL STRICT;
