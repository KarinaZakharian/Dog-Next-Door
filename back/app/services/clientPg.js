const { Pool } = require('pg');
require('dotenv').config();
const client = new Pool({
<<<<<<< HEAD
  user: process.env.PG_USER,
  host: process.env.PG_HOSTSERVER,
  database: process.env.PG_DATABASE,
  password: process.env.PG_PASSWORD,
  port: process.env.PG_DBPORT,
=======
    user: process.env.PG_USER,
    host: process.env.PG_HOSTSERVER,
    database: process.env.PG_DATABASE,
    password: process.env.PG_PASSWORD,
    port: process.env.PG_DBPORT,
>>>>>>> 1d9cdbd (merge FixTsError and karina/end)
});

client.connect;

// console.log("Connexion au serveur ok");

<<<<<<< HEAD
module.exports = client;
=======
module.exports = client;
>>>>>>> 1d9cdbd (merge FixTsError and karina/end)
