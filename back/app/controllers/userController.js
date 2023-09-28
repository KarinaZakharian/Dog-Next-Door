const {userDatamapper} = require('../datamappers');

const userController = {
    login : async (req,res) => {

    },
    
    findUser : async (req,res) => {
        const userBody = req.body;
        try {
            const user = await userDatamapper.getOneUser(userBody);
            res.json(user);
        } catch (error) {
            res.status(500).json(error.toString());
        }
       
    } 

};

module.exports = userController;
