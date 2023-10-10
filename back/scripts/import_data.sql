BEGIN;

INSERT INTO "user" ("firstname","lastname","email","user_password","date_birth","avatar","street_number","street_name","zip_code","town","country", "latitude", "longitude")
VALUES 
('Soufiane','IBNAICHE','soufiane.ibnaiche@oclock.school','$2a$12$2dTR4OLRqpIcRnuSx/IlZebFkTv4hypGvlL8LwYjsoPIqNvyhQLbS','1990-03-05','soufiane.jpg', '3', 'Avenue Charles Floquet', '75007','Paris', 'France', '48.85640670533029', '2.2941727989822835'),
('Ilias','YAKDANE','ilias.yakdane@oclock.school','$2a$10$/Tv9nHScuHBHICkt3VM1ueSIEuBsOtOKEZwtAVG3VIJqXSb/f8KwG','1991-06-15','ilias.jpg','107', 'Rue de l''Ouest', '75014', 'Paris', 'France', '48.834028139712416','2.3155446404129476'),
('David', 'VIAU','david.viau@oclock.school','1234','1980-04-18','david.jpg','18','Rue Verlet-Hanus', '69003', 'Lyon', 'France', '45.75', '4.85'),
('Karina', 'ZAKHARIAN','karina.zakharian@oclock.school','1234','1991-02-20','karina.jpg','12','Rue Rue du Maréchal Niel','33100','Bordeaux','France', '44.850282', '-0.55939'),
('John', 'Doe', 'johndoe@example.com', 'password1', '1990-01-01', 'avatar1.jpg', '1', 'Rue de Paris', '75001', 'Paris', 'France', '48.8924', '2.2379'),
('Jane', 'Doe', 'janedoe@example.com', 'password2', '1992-05-15', 'avatar2.jpg', '2', 'Rue de Bordeaux', '33000', 'Bordeaux', 'France', '44.8378', '-0.5792'),
('Bob', 'Smith', 'bobsmith@example.com', 'password3', '1985-12-25', 'avatar3.jpg', '3', 'Rue de Marseille', '13001', 'Marseille', 'France', '43.2965', '5.3698'),
('Alice', 'Johnson', 'alicejohnson@example.com', 'password4', '1998-09-03', 'avatar4.jpg', '4', 'Rue de Lyon', '69001', 'Lyon', 'France', '45.77', '4.88'),
('David', 'Lee', 'davidlee@example.com', 'password5', '1995-03-22', 'avatar5.jpg', '5', 'Rue de Paris', '75002', 'Paris', 'France', '48.8566', '2.3522'),
('Sarah', 'Brown', 'sarahbrown@example.com', 'password6', '1987-11-11', 'avatar6.jpg', '6', 'Rue de Bordeaux', '33000', 'Bordeaux', 'France', '44.808711', '-0.594229'),
('Michael', 'Davis', 'michaeldavis@example.com', 'password7', '1991-07-07', 'avatar7.jpg', '7', 'Rue de Marseille', '13002', 'Marseille', 'France', '43.2965', '5.3698'),
('Emily', 'Wilson', 'emilywilson@example.com', 'password8', '1994-02-14', 'avatar8.jpg', '8', 'Rue de Lyon', '69002', 'Lyon', 'France', '45.70', '4.88'),
('James', 'Taylor', 'jamestaylor@example.com', 'password9', '1989-06-30', 'avatar9.jpg', '9', 'Rue de Paris', '75003', 'Paris', 'France', '48.8867', '2.3431'),
('Olivia', 'Anderson', 'oliviaanderson@example.com', 'password10', '1993-10-18', 'avatar10.jpg', '10', 'Rue de Bordeaux', '33000', 'Bordeaux', 'France', ' 44.783241', '-0.573299'),
('William', 'Clark', 'williamclark@example.com', 'password11', '1986-04-12', 'avatar11.jpg', '11', 'Rue de Marseille', '13003', 'Marseille', 'France', '43.2965', '5.3698'),
('Ava', 'Wright', 'avawright@example.com', 'password12', '1997-01-09', 'avatar12.jpg', '12', 'Rue de Lyon', '69003', 'Lyon', 'France', '45.44', '4.39'),
('Daniel', 'Walker', 'danielwalker@example.com', 'password13', '1990-08-26', 'avatar13.jpg', '13', 'Rue de Paris', '75004', 'Paris', 'France', '48.8599', '2.3594'),
('Sophia', 'Hall', 'sophiahall@example.com', 'password14', '1992-12-01', 'avatar14.jpg', '14', 'Rue de Bordeaux', '33000', 'Bordeaux', 'France', '44.785156', '-0.616437'),
('Joseph', 'Allen', 'josephallen@example.com', 'password15', '1985-02-28', 'avatar15.jpg', '15', 'Rue de Marseille', '13004', 'Marseille', 'France', '43.2965', '5.3698'),
('Mia', 'Young', 'miayoung@example.com', 'password16', '1998-05-07', 'avatar16.jpg', '16', 'Rue de Lyon', '69004', 'Lyon', 'France', '45.7640', '4.8357'),
('Christopher', 'King', 'christopherking@example.com', 'password17', '1995-09-24', 'avatar17.jpg', '17', 'Rue de Paris', '75005', 'Paris', 'France', '48.8708', '2.3847'),
('Isabella', 'Wright', 'isabellawright@example.com', 'password18', '1987-03-11', 'avatar18.jpg', '18', 'Rue de Bordeaux', '33000', 'Bordeaux', 'France', '44.830917', '-0.701483'),
('Andrew', 'Scott', 'andrewscott@example.com', 'password19', '1991-08-17', 'avatar19.jpg', '19', 'Rue de Marseille', '13005', 'Marseille', 'France', '43.2965', '5.3698'),
('Charlotte', 'Green', 'charlottegreen@example.com', 'password20', '1994-01-04', 'avatar20.jpg', '20', 'Rue de Lyon', '69005', 'Lyon', 'France', '45.7640', '4.8357'),
('Matthew', 'Baker', 'matthewbaker@example.com', 'password21', '1989-05-21', 'avatar21.jpg', '21', 'Rue de Paris', '75006', 'Paris', 'France', '48.8495', '2.3515'),
('Amelia', 'Adams', 'ameliaadams@example.com', 'password22', '1993-11-27', 'avatar22.jpg', '22', 'Rue de Bordeaux', '33000', 'Bordeaux', 'France', '44.810071', '-0.631119');

COMMIT;
