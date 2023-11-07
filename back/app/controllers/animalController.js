const { log } = require('console');
const animalDatamapper = require('../datamappers/animalDatamapper');
const APIError = require('../services/APIError.js');
const jwt = require('jsonwebtoken') ;

const animalController = {
    createNewAnimal : async (req, res) => {
        try {
            const newAnimal = req.body;
<<<<<<< HEAD
            console.log(newAnimal);
=======
            
>>>>>>> 1d9cdbd (merge FixTsError and karina/end)
            newAnimal.userId = req.userId;
            const animalAdded = await animalDatamapper.addNewAnimal(newAnimal);
            
            if(animalAdded === 1){
              
            
<<<<<<< HEAD
                res.status(200).json({"message": "Votre animal a été ajouté avec succès",newAnimal});
=======
                res.json({"message": "Votre animal a été ajouté avec succès",newAnimal});
>>>>>>> 1d9cdbd (merge FixTsError and karina/end)
            };
        } catch (error) {
            const err = new APIError(error, 500)
            res.status(err.status).json(err.message);
        }
    },
<<<<<<< HEAD
=======

    


>>>>>>> 1d9cdbd (merge FixTsError and karina/end)
}

module.exports = animalController;