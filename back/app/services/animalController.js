const jwt = require('jsonwebtoken') ;
const {getOneUserById} = require('../datamappers/userDatamapper');
const animalDatamapper = require('../datamappers/animalDatamapper');
require("dotenv").config();

const animalController = {
      //! Permet de vérifier sil'utilisateur a bien enregistré un animal dans son profil
    checkGetAnimal : async (req,res,next) => {
      const userId = parseInt(req.userId);
      const userGetAnimal = await animalDatamapper.getUserWithAnimal(userId);
      //! Si c'est pas le cas , on renvoi une erreur
      if(!userGetAnimal) {
        res.status(401).json({"message": "Vous devez enregistrer un animal pour réserver"})
      }else {
         //! Sinon on continue,
        next();
      }
  },

};

module.exports = animalController;