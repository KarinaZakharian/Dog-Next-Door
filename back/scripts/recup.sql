	WITH pet_sitter AS (
				SELECT * FROM "user" WHERE "id" = 22
			)
			SELECT u."firstname",  u."lastname", p."firstname" petsitter_firstname, p."lastname" petsitter_lastname, 
			json_build_object(
				'id',b.id, 
				'start_date',b.start_date,
				'end_date', b.end_date,
				'booking_status',b.booking_status,
				'user_id', b.user_id,
				'sender_id',b.sender_id) 
			AS booking,
			json_build_object(
				'id', a.id,
				'name', a.animal_name, 
				'type', a.type, 
				'user_id', a.user_id, 
				'race', a.race) 
			AS animal
			FROM "user" u, "booking" b, "animal" a, "pet_sitter" p
            WHERE u."id" = 21 AND a."user_id" = 21