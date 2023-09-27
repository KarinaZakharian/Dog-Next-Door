const {userDatamapper} = require('../datamappers');
const tokenController = require("../services/tokenController");
const validator = require('validator');
require('dotenv').config();
const bcrypt = require('bcrypt');

const userController = {
    checkUserInput : async (req,res) => {
        const userFound = await userController.findUser(req, res);
        
       console.log(req.body);
        if(!userFound){
            res.status(401).json(false)
        };
        console.log(userFound.user_password);
        const passwordUser = await bcrypt.compare(req.body.user_password, userFound.user_password);
        console.log(passwordUser);
        if(passwordUser){

            delete userFound.user_password;
            const userToken = tokenController.createToken(userFound.id);
            res
            .cookie("access_token", userToken, {
                httpOnly:true,
                secure : process.env.NODE_ENV === "production",
            })
            .status(200)
            .json(userFound);
        }else{
            res
            .json("Couple identifiant mot de passe incorrect");
            return;
        }
    },
    
    findUser : async (req,res) => {
        const userInput = req.body;
        try {
            const user = await userDatamapper.getOneUser(userInput);
            return user;
        } catch (error) {
            res.status(500).json(error.toString());
        }
       
    },

    createUser : async (req,res) => {

        const newUser =  req.body;
            
        try {

            // Vérification de l'existence du compte
            const userExist = await userDatamapper.getOneUser(newUser);
            if(userExist){
                res.status(401).json("Cet email est déjà utilisé ! Veuillez vous logger")   
            };
            
            // Remplacement du mdp par un mdp crypté
            newUser.user_password = await bcrypt.hash(newUser.user_password, parseInt(process.env.SALT));
            
            // Vérification de l'emial du nouvel utilisateur
            if(!validator.isEmail(newUser.email)){
                res.json("Email invalide");
            };

            // ^\d+\s[A-z\s\d]+,\s\d{5}\s[A-z\s]+$
            //! Vérification de la ville renseigné par l'utilisateur (JOI)

            //! Validation de la longitude et lattitude via API Gouv
            const response = await userDatamapper.addUser(newUser);
            console.log(response);
            res.json("Ajout utilisateur");
            
        } catch (error) {
            res.status(404).json("erreur de connection server");
        }


    },

    // loggedUser : (req, res) => {
    //     const userLogged = req.session.user;
    //     res.json(userLogged);
    // },

};

module.exports = userController;
