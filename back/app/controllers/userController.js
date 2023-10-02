const {userDatamapper} = require('../datamappers');
const tokenController = require("../services/tokenController");
const validator = require('validator');
require('dotenv').config();
const bcrypt = require('bcrypt');

const userController = {
    logInUser : async (req,res) => {

        // Vérification token si utilisateur déjà connecté
        if(req.userId){
            const userId = req.userId;
            const userConnected = await userDatamapper.getOneUserById(userId);
            delete userConnected.user_password;
            return res.status(200).json(userConnected);
        }

        // Recherche utilisateur via ses identifiants de connection
        const userFound = await userController.findUserByEmail(req, res);
        
        if(!userFound){
            res.status(401).json("Vous n'avez pas accès")
            return
        }
        
        const passwordUserCheck = await bcrypt.compare(req.body.user_password, userFound.user_password);
        if(passwordUserCheck){
            delete userFound.user_password;
            const userToken = tokenController.createToken(userFound.id);
            res
            .cookie("access_token", userToken, {
                httpOnly:false,
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
    
    findUserByEmail : async (req,res) => {
        const userInput = req.body;
        try {
            const user = await userDatamapper.getOneUserByEmail(userInput);
            return user;
        } catch (error) {
            res.status(500).json(error.toString());
        }
        
    },
    
    createUser : async (req,res) => {
        
        const newUser =  req.body;
        
        try {
            
            // Vérification de l'existence du compte
            const userExist = await userDatamapper.getOneUserByEmail(newUser);
            if(userExist){
                res.json("Cet email est déjà utilisé ! Veuillez vous logger");
                return
            };
            
            // Remplacement du mdp par un mdp crypté
            newUser.user_password = await bcrypt.hash(newUser.user_password, parseInt(process.env.SALT));
            
            // Vérification de l'emial du nouvel utilisateur
            if(!validator.isEmail(newUser.email)){
                res.json("Email invalide");
                return
            };
                        
            //! Validation de la longitude et lattitude via API Gouv
            
            const response = await userDatamapper.addUser(newUser);
            console.log(response);
            res.json("Ajout utilisateur");
        } catch (error) {
            res.status(404).json("Erreur de connexion server");
        }
        
        
    },
    
    // loggedUser : (req, res) => {
    //     const userLogged = req.session.user;
    //     res.json(userLogged);
    // },
    
};

module.exports = userController;