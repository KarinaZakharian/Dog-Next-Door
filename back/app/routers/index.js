const express = require("express");
const router = express.Router();
const userRouter = require('./userRouter');

userRouter.get("/", (req,res) => {
    res.send("API O'DogNextDoor");
});

router.use(userRouter);

module.exports = router;