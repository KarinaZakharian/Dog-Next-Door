const {userDatamapper} = require('../datamappers');

const userController = {
    checkUserInput : async (req,res,next) => {
        const userFound = await userController.findUser(req, res);
        const passwordUser = userFound.user_password;
        // if(passwordUser === req.body.password){
        //     req.session.user = userFound;
        //     delete req.session.user_password;
        // }else{
        //     res.json("Couple identifiant mot de passe incorrect")
        //     return;
        // }
        // res.json(userFound);
    },
    
    findUser : async (req,res,next) => {
        const userInput = req.body;
        try {
            const user = await userDatamapper.getOneUser(userInput);
            res.json(user);
            next();
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
