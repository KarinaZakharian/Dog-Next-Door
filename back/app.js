const express = require("express");
const app = express();
const cors = require("cors");
const router = require("./app/routers/index.js");

//* permet de sécuriser les transferts de données entre des navigateurs et des serveurs web

app.use(cors("*"));

//* Setup
app.use(express.urlencoded({ extended: true }));
app.use(express.json());


//* Router
app.use(router);

const port = 3000 || process.env.PORT
app.listen(port, () => {
    console.log(`Server listening at localhost/${port}`);
})