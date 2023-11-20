const { Pool } = require('pg');
require('dotenv').config();
const client = new Pool({
  user: process.env.PG_USER,
  host: process.env.PG_HOSTSERVER,
  database: process.env.PG_DATABASE,
  password: process.env.PG_PASSWORD,
  port: process.env.PG_DBPORT,
});

client.connect;

// console.log("Connexion au serveur ok");

<<<<<<< HEAD
module.exports = client;
=======
module.exports = client;
