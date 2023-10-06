const animalDatamapper = require('../datamappers/animalDatamapper');
const APIError = require('../services/APIError.js');

const animalController = {
    createNewAnimal : async (req, res) => {
        try {
            const newAnimal = req.body;
            newAnimal.userId = req.userId;
            const animalAdded = await animalDatamapper.addNewAnimal(newAnimal);
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