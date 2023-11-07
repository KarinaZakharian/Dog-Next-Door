const { userDatamapper } = require('../datamappers');
const tokenController = require('../services/tokenController');
const validator = require('validator');
require('dotenv').config();
const bcrypt = require('bcrypt');
const { log } = require('console');

const userController = {
  logInUser: async (req, res) => {
    // Vérification token si utilisateur déjà connecté
    if (req.userId) {
      const userId = req.userId;
      const userConnected = await userDatamapper.getOneUserById(userId);
      delete userConnected.user_password;
      return res.status(200).json(userConnected);
    }
    
    // Recherche utilisateur via ses identifiants de connection
    const userFound = await userController.findUserByEmail(req, res);
    
    if (!userFound) {
      res.status(401).json("Vous n'avez pas accès");
      return;
    }
    
    const passwordUserCheck = await bcrypt.compare(
      req.body.user_password,
      userFound.user_password
      );
      if (passwordUserCheck) {
        delete userFound.user_password;
        const userToken = tokenController.createToken(userFound.id);
        userFound.token = userToken;
        console.log("user Found login",userFound.token);
        
        res
        .cookie('access_token', userToken, {
          httpOnly: true,
          secure: process.env.NODE_ENV === 'production',
        })
        .status(200)
        .json(userFound);
        // req.session.user = [userToken];
        // console.log(req.session.user);
      } else {
        console.log("je suis dans le catch");
        res.status(401).json('Couple identifiant mot de passe incorrect');
        return;
      }
    },
    
    findUserByEmail: async (req, res) => {
      const userInput = req.body;
      try {
        const user = await userDatamapper.getOneUserByEmail(userInput);
        return user;
      } catch (error) {
        res.status(500).json(error.toString());
      }
    },
    
    findUserById: async (req, res) => {
      try {
        const userId = parseInt(req.params.id);
        
        const user = await userDatamapper.getOneUserById(userId);
        // console.log(user);
        res.status(200).json(user);
      } catch (error) {
        res.status(500).json(error.toString());
      }
    },
    
    findUser: async (req, res) => {
      try {
        const userId = parseInt(req.userId);
        
        const user = await userDatamapper.getOneUserById(userId);
        console.log(user);
        res.json(user);
      } catch (error) {
        res.status(500).json(error.toString());
      }
    },
    
    createUser: async (req, res) => {
      const newUser = req.body;
      console.log(newUser);
      
      try {
        // Vérification de l'existence du compte
        const userExist = await userDatamapper.getOneUserByEmail(newUser);
        if (userExist) {
          res.status(401).json({
            message: 'Cet email est déjà utilisé ! Veuillez vous logger',
          });
          return;
        }
        
        // Remplacement du mdp par un mdp crypté
        newUser.user_password = await bcrypt.hash(
          newUser.user_password,
          parseInt(process.env.SALT)
          );
          
          // Vérification de l'emial du nouvel utilisateur
          if (!validator.isEmail(newUser.email)) {
            res.json('Email invalide');
            return;
          }
          
          //! Validation de la longitude et lattitude via API Gouv
          
          const response = await userDatamapper.addUser(newUser);
          console.log(response);
          res.json('Ajout utilisateur');
        } catch (error) {
          res.status(404).json('Erreur de connexion server');
        }
      },
      
      findUserByDistance: async (req, res) => {
        const userId = req.userId;
        const searchParameters = req.body;
        console.log(searchParameters);
        console.log(userId);
        try {
          const users = await userDatamapper.getUsersByDistance(searchParameters, userId);
          res.json(users);
        } catch (error) {
          res.status(500).json(error.toString());
        }
      },
      
      updateOptionnalInformation: async (req, res) => {
        const intendedUser = req.body;
        const userId = req.userId;
        
        try {
          // Vérification de l'existence du compte
          const userExist = await userDatamapper.getOneUserById(userId);
          
          if (!userExist) {
            res.json("Cet utilisateur n'est pas enregistré en BDD");
            return;
          }
          
          const response = await userDatamapper.addOptionnalInformations(
            intendedUser,
            userId
            );
            
            res.json('Vos informations ont été ajoutées avec succès');
          } catch (error) {
            res.status(500).json({ message: 'Aucune modification a été apportée' });
          }
        },
        
        updatePersonnalInformation: async (req, res) => {
          const intendedUser = req.body;
          const userId = req.userId;
          
          try {
            // Vérification de l'existence du compte
            const userExist = await userDatamapper.getOneUserById(userId);
            
            // Remplacement du mdp par un mdp crypté
            intendedUser.user_password = await bcrypt.hash(
              intendedUser.user_password,
              parseInt(process.env.SALT)
              );
              
              const response = await userDatamapper.addPersonnalInformation(
                intendedUser,
                userId
                );
                
                res.json('Vos informations ont été ajoutées avec succès');
              } catch (error) {
                res.status(500).json({ message: 'Aucune modification a été apportée' });
              }
            },
            updateDisponibility : async (req,res) => {
              
            },
            
            findUserWithCalendar: async (req, res) => {
              const petsitterId = req.params.id;
              const petSitter = await userDatamapper.getOneUserById(petsitterId);
              const petSitterBooking = await userDatamapper.getUserBooking(petsitterId);
              const petSitterDisponibility = await userDatamapper.getUserDisponibility(
                petsitterId
                );
                res.json({
                  user: petSitter,
                  booking: petSitterBooking,
                  disponibility: petSitterDisponibility,
                });
              },
              
              findUserdisponibility: async (req, res) => {
                const petsitterId = req.params.id;
                const petSitterDisponibility = await userDatamapper.getUserDisponibility(
                  petsitterId
                  );
                  res.json(petSitterDisponibility);
                },
                
                findUserBooking: async (req, res) => {
                  const petsitterId = req.params.id;
                  const petSitterBooking = await userDatamapper.getUserBooking(petsitterId);
                  res.json(petSitterBooking);
                },
                
                createUserNewDisponibility: async (req, res) => {
                  try {
                    const intendedUser = req.body;
                    const userId = req.userId;
                    
                    const dateRange = intendedUser.disponibility_date;
                    const [startDateString, endDateString] = dateRange.split(' au ');
                    
                    const start_date_front = startDateString.split('/').reverse().join('-');
                    const end_date_front = endDateString.split('/').reverse().join('-');
                    
                    const startDate = new Date(startDateString.split('/').reverse().join('-'));
                    const endDate = new Date(endDateString.split('/').reverse().join('-'));
                    
                    
                    const sqlStartDate = startDate.toLocaleDateString().split('T')[0];
                    const sqlEndDate = endDate.toLocaleDateString().split('T')[0];
                    
                    
                    const disponilityAdded = await userDatamapper.addNewUserDisponibilities(
                      sqlStartDate,
                      sqlEndDate,
                      userId
                      );
                      console.log(start_date_front,end_date_front);
                      res.json({"start_date": start_date_front ,"end_date": end_date_front , "message":"Vous venez de créer une disponibilité"});
                      
                      
                    } catch (error) {
                      res.status(404).json('Erreur de connexion server');
                    }
                  },
                  
                  updateDisponibility: async (req,res) => {
                    const userId = req.userId;
                    const newDisponibility = req.body;
                    
                    // On récupère la date du front
                    const dateRange = newDisponibility.disponibility_date.split(" au ");
                    const [startDateString, endDateString] = dateRange;
                    
                    // on change les date au format YYYY-mm-dd
                    const startDateFormat = startDateString.split('/').reverse().join('-');
                    const endDateFormat = endDateString.split('/').reverse().join('-');
                    
                    // o nrécupère la disponibilité de l'utilisateur
                    const findDisponibilityByUserId = await userDatamapper.getUserDisponibility(userId);
                    
                    // Si elle existe, on modifie les dates de disponibilités
                    if(findDisponibilityByUserId){
                      const updateDisponibility = await userDatamapper.modifyDisponibility(findDisponibilityByUserId[0].id, startDateFormat, endDateFormat,userId);
                      if(updateDisponibility){
                        return res.json({"start_date":startDateFormat, "end_date": endDateFormat,"message" : "Vos disponibilités ont bien été modifié"});
                      }
                    }
                  },
                  
                  updateOurAnimal: async (req,res) => {
                    const userId = req.userId;
                    const newAnimal = req.body;
                    console.log(newAnimal);
                    
                    try {
                      const ourNewAnimal = await userDatamapper.modifyOurAnimal(newAnimal,userId);
                      
                      if(ourNewAnimal){
                        return res.json({message: "Votre animal a bien été modifié", animal: ourNewAnimal})
                      }    
                    } catch (error) {
                      res.status(500).json({ message: "Votre animal n'a pas été modifié" });
                    }
                    
                  },
                };
                
                module.exports = userController;
