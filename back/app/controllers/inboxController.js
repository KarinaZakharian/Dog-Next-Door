const {inboxDatamapper} = require('../datamappers');

const inboxController = {
    
    findMessageByUser : async (req,res) => {
        const id = req.userId;
        try {
            const userMessage = await inboxDatamapper.getMessagesById(id);
            console.log("userMessage", userMessage);
            res.json(userMessage);

        } catch (error) {
            res.status(500).json(error.toString());
        }
        
    },
    
    findPastMessages : async (req,res) => {
        const id = req.userId;
        try {
           
            const userMessage = await inboxDatamapper.getPastMessages(id);
            console.log("userMessage", userMessage);
            res.json(userMessage);

        } catch (error) {
            res.status(500).json(error.toString());
        }
        
    },
    
    findUpcomingMessages : async (req,res) => {
        const id = req.userId;
        try {
        
            
            const userMessage = await inboxDatamapper.getUpcomingMessages(id);
            console.log("userMessage", userMessage);
            res.json(userMessage);

        } catch (error) {
            res.status(500).json(error.toString());
        }
        
    },
    
    findawaitingMessages : async (req,res) => {
        const id = req.userId;
        try {
           
            const userMessage = await inboxDatamapper.getAwaitingMessages(id);
            console.log("userMessage", userMessage);
            res.json(userMessage);

        } catch (error) {
            res.status(500).json(error.toString());
        }
        
    },
    
    findValidateMessages : async (req,res) => {
        const id = req.userId;
        try {
           
            const userMessage = await inboxDatamapper.getValidateMessages(id);
            console.log("userMessage", userMessage);
            res.json(userMessage);

        } catch (error) {
            res.status(500).json(error.toString());
        }
        
    },
    
};
module.exports = inboxController;