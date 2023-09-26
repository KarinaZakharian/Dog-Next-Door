const {userDatamapper} = require('../datamappers');
const tokenController = require("../services/tokenController");

const userController = {
    checkUserInput : async (req,res,next) => {
        const userFound = await userController.findUser(req, res);
        const passwordUser = userFound.user_password;
        
        if(passwordUser == req.body.password){
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
