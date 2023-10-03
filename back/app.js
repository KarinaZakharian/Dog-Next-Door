const express = require("express");
const app = express();
const cors = require("cors");
const router = require("./app/routers");
const session = require("express-session");

// Mise en place de redis pour le stockage en session des token
// const RedisStore = require('connect-redis').default;
// const redisClient = require('./app/services/redisClient');

// Mise en place des cookies
const cookieParser = require('cookie-parser');

app.use(cookieParser())


// let redisStore = new RedisStore({
//     client : redisClient,
//     prefix : "token:"
// });

//? Permet de sécuriser les transferts de données entre des navigateurs et des serveurs web
app.use(cors(""));

// Setup
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//* Redis
// const sessionMiddleware = session({
//     store: redisStore,
//     secret: "ici je mets un secret super long comme ça c'est plus difficile",
//     resave: true, // est-ce que je mets à jour ma session si elle n'est pas modifiée
//     saveUninitialized: false // est-ce que j'enregistre une session vide ?
//   });

//   app.use(sessionMiddleware);

//* Router
app.use(router);

const port = 3000 || process.env.PORT
app.listen(port, () => {
    console.log(Server listening at localhost:${port});
})