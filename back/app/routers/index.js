const express = require("express");

const router = express.Router();


router.get("/", (req,res) => {
    res.send("API O'DogNextDoor");
})

module.exports = router;