# le script sh s'éxécute avec la commande bash + le fichier de destination

# Je lance le script de création de role et de base de donnée
sudo -u david psql -f ./scripts/init_db.sql


export PGUSER=odog
export PGPASSWORD=123
export PGDATABASE=odog


# Le script de création de table
psql -f ./scripts/create_table.sql


# Le script d'import de data

psql -f ./scripts/import_data.sql
# psql ./scripts/import_data.sql


psql -f ./scripts/fonctions.sql
<<<<<<< HEAD
 
=======
>>>>>>> 1d9cdbd (merge FixTsError and karina/end)
