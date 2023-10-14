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
    
    findBookingRequest : async (req,res) => {
        const userId = req.userId;
        try {
           
            const userMessage = await inboxDatamapper.getBookingRequest(userId);
            console.log("userMessage", userMessage);
            res.json(userMessage);

        } catch (error) {
            res.status(500).json(error.toString());
        }
        
    },
    
    findBookingReceived : async (req,res) => {
        const id = req.userId;
        try {
           
            const userMessage = await inboxDatamapper.getBookingReceived(id);
            console.log("userMessage", userMessage);
            res.json(userMessage);

        } catch (error) {
            res.status(500).json(error.toString());
        }
        
    },

    acceptBooking : async (req,res) => {

        const information = req.body;
        

        try {
            if(information.answer == 'true'){
                
                const bookingAccept = await inboxDatamapper.bookingAccepted(information.clientId);
                
                if(bookingAccept){
                   res.json({"message" : "Vous venez de valider votre réservation"})
                }
                
            }else {
               return res.json({"message" : "La réservation a été annulé"})
            }
            
        } catch (error) {
            res.status(500).json(error.toString());
        }

    },


    findUpcomingBooking : async (req,res) => {
        const id = req.userId;
        try {
           
            const userMessage = await inboxDatamapper.getUpcomingBooking(id);
            console.log("userMessage", userMessage);
            res.json(userMessage);

        } catch (error) {
            res.status(500).json(error.toString());
        }
        
    },


    findPastBooking : async (req,res) => {
        const id = req.userId;
        console.log(id);
        try {
           
            const userMessage = await inboxDatamapper.getPastBooking(id);
            console.log("userMessage", userMessage);
            res.json(userMessage);

        } catch (error) {
            res.status(500).json(error.toString());
        }
        
    },
    
};
module.exports = inboxController;