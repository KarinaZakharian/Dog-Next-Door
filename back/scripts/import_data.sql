BEGIN;


INSERT INTO "user" ("firstname","lastname","email","user_password","date_birth","avatar","street_number","street_name","zip_code","town","country", "latitude", "longitude")
VALUES 
('John', 'Doe', 'johndoe@example.com', '$2a$10$7.Z02N7ES38qSnhnHVrJ5udz76LTQQEFI5OsOPfZ7J4GSPqNOjzgq', '1990-01-01', 'avatar1.jpg', '1', 'Rue de Paris', '75001', 'Paris', 'France', '48.8924', '2.2379'),
('Jane', 'Doe', 'janedoe@example.com', '$2a$10$7.Z02N7ES38qSnhnHVrJ5udz76LTQQEFI5OsOPfZ7J4GSPqNOjzgq', '1992-05-15', 'avatar2.jpg', '2', 'Rue de Bordeaux', '33000', 'Bordeaux', 'France', '44.8378', '-0.5792'),
('Bob', 'Smith', 'bobsmith@example.com', '$2a$10$7.Z02N7ES38qSnhnHVrJ5udz76LTQQEFI5OsOPfZ7J4GSPqNOjzgq', '1985-12-25', 'avatar3.jpg', '3', 'Rue de Marseille', '13001', 'Marseille', 'France', '43.2965', '5.3698'),
('Alice', 'Johnson', 'alicejohnson@example.com', '$2a$10$7.Z02N7ES38qSnhnHVrJ5udz76LTQQEFI5OsOPfZ7J4GSPqNOjzgq', '1998-09-03', 'avatar4.jpg', '4', 'Rue de Lyon', '69001', 'Lyon', 'France', '45.77', '4.88'),
('David', 'Lee', 'davidlee@example.com', '$2a$10$7.Z02N7ES38qSnhnHVrJ5udz76LTQQEFI5OsOPfZ7J4GSPqNOjzgq', '1995-03-22', 'avatar5.jpg', '5', 'Rue de Paris', '75002', 'Paris', 'France', '48.8566', '2.3522'),
('Sarah', 'Brown', 'sarahbrown@example.com', '$2a$10$7.Z02N7ES38qSnhnHVrJ5udz76LTQQEFI5OsOPfZ7J4GSPqNOjzgq', '1987-11-11', 'avatar6.jpg', '6', 'Rue de Bordeaux', '33000', 'Bordeaux', 'France', '44.808711', '-0.594229'),
('Michael', 'Davis', 'michaeldavis@example.com', '$2a$10$7.Z02N7ES38qSnhnHVrJ5udz76LTQQEFI5OsOPfZ7J4GSPqNOjzgq', '1991-07-07', 'avatar7.jpg', '7', 'Rue de Marseille', '13002', 'Marseille', 'France', '43.2965', '5.3698'),
('Emily', 'Wilson', 'emilywilson@example.com', '$2a$10$7.Z02N7ES38qSnhnHVrJ5udz76LTQQEFI5OsOPfZ7J4GSPqNOjzgq', '1994-02-14', 'avatar8.jpg', '8', 'Rue de Lyon', '69002', 'Lyon', 'France', '45.70', '4.88'),
('James', 'Taylor', 'jamestaylor@oclock.school', '$2a$10$7.Z02N7ES38qSnhnHVrJ5udz76LTQQEFI5OsOPfZ7J4GSPqNOjzgq', '1989-06-30', 'avatar9.jpg', '9', 'Rue de Paris', '75003', 'Paris', 'France', '48.8867', '2.3431'),
('Olivia', 'Anderson', 'oliviaanderson@example.com', '$2a$10$7.Z02N7ES38qSnhnHVrJ5udz76LTQQEFI5OsOPfZ7J4GSPqNOjzgq', '1993-10-18', 'avatar10.jpg', '10', 'Rue de Bordeaux', '33000', 'Bordeaux', 'France', ' 44.783241', '-0.573299'),
('William', 'Clark', 'williamclark@example.com', '$2a$10$7.Z02N7ES38qSnhnHVrJ5udz76LTQQEFI5OsOPfZ7J4GSPqNOjzgq', '1986-04-12', 'avatar11.jpg', '11', 'Rue de Marseille', '13003', 'Marseille', 'France', '43.2965', '5.3698'),
('Ava', 'Wright', 'avawright@example.com', '$2a$10$7.Z02N7ES38qSnhnHVrJ5udz76LTQQEFI5OsOPfZ7J4GSPqNOjzgq', '1997-01-09', 'avatar12.jpg', '12', 'Rue de Lyon', '69003', 'Lyon', 'France', '45.44', '4.39'),
('Daniel', 'Walker', 'danielwalker@example.com', '$2a$10$7.Z02N7ES38qSnhnHVrJ5udz76LTQQEFI5OsOPfZ7J4GSPqNOjzgq', '1990-08-26', 'avatar13.jpg', '13', 'Rue de Paris', '75004', 'Paris', 'France', '48.8599', '2.3594'),
('Sophia', 'Hall', 'sophiahall@example.com', '$2a$10$7.Z02N7ES38qSnhnHVrJ5udz76LTQQEFI5OsOPfZ7J4GSPqNOjzgq', '1992-12-01', 'avatar14.jpg', '14', 'Rue de Bordeaux', '33000', 'Bordeaux', 'France', '44.785156', '-0.616437'),
('Joseph', 'Allen', 'josephallen@example.com', '$2a$10$7.Z02N7ES38qSnhnHVrJ5udz76LTQQEFI5OsOPfZ7J4GSPqNOjzgq', '1985-02-28', 'avatar15.jpg', '15', 'Rue de Marseille', '13004', 'Marseille', 'France', '43.2965', '5.3698'),
('Mia', 'Young', 'miayoung@example.com', '$2a$10$7.Z02N7ES38qSnhnHVrJ5udz76LTQQEFI5OsOPfZ7J4GSPqNOjzgq', '1998-05-07', 'avatar16.jpg', '16', 'Rue de Lyon', '69004', 'Lyon', 'France', '45.7640', '4.8357'),
('Christopher', 'King', 'christopherking@example.com', '$2a$10$7.Z02N7ES38qSnhnHVrJ5udz76LTQQEFI5OsOPfZ7J4GSPqNOjzgq', '1995-09-24', 'avatar17.jpg', '17', 'Rue de Paris', '75005', 'Paris', 'France', '48.8708', '2.3847'),
('Isabella', 'Wright', 'isabellawright@example.com', '$2a$10$7.Z02N7ES38qSnhnHVrJ5udz76LTQQEFI5OsOPfZ7J4GSPqNOjzgq', '1987-03-11', 'avatar18.jpg', '18', 'Rue de Bordeaux', '33000', 'Bordeaux', 'France', '44.830917', '-0.701483'),
('Andrew', 'Scott', 'andrewscott@example.com', '$2a$10$7.Z02N7ES38qSnhnHVrJ5udz76LTQQEFI5OsOPfZ7J4GSPqNOjzgq', '1991-08-17', 'avatar19.jpg', '19', 'Rue de Marseille', '13005', 'Marseille', 'France', '43.2965', '5.3698'),
('Charlotte', 'Green', 'charlottegreen@example.com', '$2a$10$7.Z02N7ES38qSnhnHVrJ5udz76LTQQEFI5OsOPfZ7J4GSPqNOjzgq', '1994-01-04', 'avatar20.jpg', '20', 'Rue de Lyon', '69005', 'Lyon', 'France', '45.7640', '4.8357'),
('Matthew', 'Baker', 'mat@gmail.com', '$2a$10$7.Z02N7ES38qSnhnHVrJ5udz76LTQQEFI5OsOPfZ7J4GSPqNOjzgq', '1989-05-21', 'avatar21.jpg', '21', 'Rue de Paris', '75006', 'Paris', 'France', '48.8495', '2.3515'),
('Amelia', 'Adams', 'amelia@gmail.com', '$2a$10$7.Z02N7ES38qSnhnHVrJ5udz76LTQQEFI5OsOPfZ7J4GSPqNOjzgq', '1993-11-27', 'avatar22.jpg', '22', 'Rue de Bordeaux', '33000', 'Bordeaux', 'France', '44.810071', '-0.631119');
-- ('Chris', 'MOBY', 'moby@gmail.com', '$2a$10$7.Z02N7ES38qSnhnHVrJ5udz76LTQQEFI5OsOPfZ7J4GSPqNOjzgq', '1980-11-27', 'avatar-Chris.png', '22', 'Paris 75007', '75007', 'Paris', 'France', '48.859', '2.347'),
-- ('Amaury', 'JEUNOT', 'amaury@gmail.com', '$2a$10$7.Z02N7ES38qSnhnHVrJ5udz76LTQQEFI5OsOPfZ7J4GSPqNOjzgq', '1985-11-27', 'avatar-Amaury.png', '22', 'Paris 75019', '75019', 'Paris', 'France', '48.866667', '2.333333');

-- INSERT INTO "disponibility" ("start_date","end_date")
-- VALUES
-- ('20/10/2023', '28/10/2023'),
-- ('18/10/2023', '25/10/2023'),
-- ('03/11/2023', '15/11/2023'),
-- ('05/11/2023', '10/11/2023'),
-- ('20/10/2023', '25/10/2023'),
-- ('18/10/2023', '20/10/2023'),
-- ('20/11/2023', '28/11/2023'),
-- ('19/10/2023', '26/10/2023'),
-- ('29/10/2023', '14/11/2023'),
-- ('22/10/2023', '16/11/2023'),
-- ('21/11/2023', '25/11/2023');

-- INSERT INTO "user_has_disponibility" ("user_id","disponibility_id")
-- VALUES
-- (24,1),
-- (23,10),
-- (5,2),
-- (24,3),
-- (5,4),
-- (13,11),
-- (5,7),
-- (13,5),
-- (13,9),
-- (20,8),
-- (23,6);

COMMIT;