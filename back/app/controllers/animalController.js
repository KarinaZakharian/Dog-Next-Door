const { log } = require('console');
const animalDatamapper = require('../datamappers/animalDatamapper');
const APIError = require('../services/APIError.js');

const animalController = {
    createNewAnimal : async (req, res) => {
        try {
            const newAnimal = req.body;
            // console.log("information", newAnimal);
            newAnimal.userId = req.userId;
            // console.log("userId", newAnimal.userId);
            const animalAdded = await animalDatamapper.addNewAnimal(newAnimal);
            console.log(animalAdded);
            if(animalAdded === 1){
                res.json(newAnimal);
            };
        } catch (error) {
            const err = new APIError(error, 500)
            res.status(err.status).json(err.message);
        }
    },
}

module.exports = animalController;