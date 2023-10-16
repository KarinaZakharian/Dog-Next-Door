
-- On supprime les rôles S'IL EXISTE
DROP USER IF EXISTS odog;
-- On supprime la base de donnée SI ELLE EXISTE
DROP DATABASE IF EXISTS odog;

-- Création du role et de la BDD

CREATE USER odog WITH PASSWORD '123';
CREATE DATABASE odog OWNER odog;