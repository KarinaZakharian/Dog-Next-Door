const {inboxDatamapper} = require('../datamappers');

const inboxController = {
    
    findMessageByUser : async (req,res) => {
        const id = req.userId;
        
        try {
            // //! On récupère l'utilisateur via le token.id
            // const userFound = await inboxDatamapper.getUserById(id);
            // console.log("userFound", userFound);
            // //! Si l'utilisateur n'est pas trouvé, on lance un message au front
            // if(!userFound){
            //     res.json({"message" : "Aucun utilisateur ne correspond à cet id" })
            //     return
            // }

            //! Si le user est trouvé, on retourne sous format json les messages de l'utilisateur
            const userMessage = await inboxDatamapper.getMessageById(id);
            console.log("userMessage", userMessage);
            res.json(userMessage);

        } catch (error) {
            res.status(500).json(error.toString());
        }
        
    },
    
};
module.exports = inboxController;