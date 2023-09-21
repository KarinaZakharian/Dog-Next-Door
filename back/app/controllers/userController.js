const {userDatamapper} = require('../datamappers');
const tokenController = require("../services/tokenController");

const userController = {
    checkUserInput : async (req,res,next) => {
        const userFound = await userController.findUser(req, res);
        console.log(req.body);
        
        const passwordUser = userFound.user_password;
        if(passwordUser == req.body.user_password){

            // req.session.user = userFound;
            delete req.session.user_password;
            const userToken = tokenController.createToken(userFound.id);
            // req.cookie.accesstoken = userToken;
            // req.session.user.token = userToken
            
            res.json(userFound);
        }else{
            res.json("Couple identifiant mot de passe incorrect");
            return;
        }
        // res.json(userFound);
    },
    
    findUser : async (req,res,next) => {
        const userInput = req.body;
        try {
            const user = await userDatamapper.getOneUser(userInput);
            return user;
        } catch (error) {
            res.status(500).json(error.toString());
        }
       
    },

    // loggedUser : (req, res) => {
    //     const userLogged = req.session.user;
    //     res.json(userLogged);
    // },

};

module.exports = userController;
