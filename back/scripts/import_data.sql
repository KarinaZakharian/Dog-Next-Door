BEGIN;


INSERT INTO "user" ("firstname","lastname","email","user_password","date_birth","avatar","street_number","street_name","zip_code","town","country")
VALUES 
('Soufiane','IBNAICHE','soufiane.ibnaiche@oclock.school','1234','1990-03-05','soufiane.jpg','14','rue Patrick','94700','Maisons-Alfort','France'),
('Ilias','YAKDANE','ilias.yakdane@oclock.school','1234','1991-06-15','ilias.jpg','8','rue de Constantinople','29710','Landudec','France'),
('David', 'VIAU','david.viau@oclock.school','1234','1980-04-18','david.jpg','9','rue de la patate douce','35000','Rennes','France'),
('Karina', 'ZAKHARIAN','karina.zakharian@oclock.school','1234','1991-02-20','karina.jpg','8','boulevard de la liberté','30000','Nimes','France');

COMMIT;