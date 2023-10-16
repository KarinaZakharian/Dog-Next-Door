const {inboxDatamapper} = require('../datamappers');

const inboxController = {
    
    findMessageByUser : async (req,res) => {
        const id = req.userId;
        try {
            const userMessage = await inboxDatamapper.getMessagesById(id);
            
            res.json(userMessage);

        } catch (error) {
            res.status(500).json(error.toString());
        }
        
    },
    
    findPastMessages : async (req,res) => {
        const id = req.userId;
        try {
           
            const userMessage = await inboxDatamapper.getPastMessages(id);
            
            res.json(userMessage);

        } catch (error) {
            res.status(500).json(error.toString());
        }
        
    },
    
    findUpcomingMessages : async (req,res) => {
        const id = req.userId;
        try {
        
            
            const userMessage = await inboxDatamapper.getUpcomingMessages(id);
            
            res.json(userMessage);

        } catch (error) {
            res.status(500).json(error.toString());
        }
        
    },
    
    findBookingRequest : async (req,res) => {
        const userId = req.userId;
        try {
           
            const userMessage = await inboxDatamapper.getBookingRequest(userId);
            userMessage.booking.start_date = userMessage.booking.start_date.split("-").reverse().join("/");
            userMessage.booking.end_date = userMessage.booking.end_date.split("-").reverse().join("/");
            console.log("find booking request");
            res.json(userMessage);

        } catch (error) {
            res.status(500).json(error.toString());
        }
        
    },
    
    findBookingReceived : async (req,res) => {
        const id = req.userId;
        try {
           
            const userMessage = await inboxDatamapper.getBookingReceived(id);
            
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
                   return res.json({"message" : "Vous venez de valider votre réservation"})
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
            
            // userMessage.start_date = userMessage.start_date.toLocaleDateString('fr-FR',{day: 'numeric', month: 'numeric', year: 'numeric'});
            userMessage.start_date = userMessage.start_date.split("-").reverse().join('/');
            console.log(userMessage);
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
            
            res.json(userMessage);

        } catch (error) {
            res.status(500).json(error.toString());
        }
        
    },
    
};
module.exports = inboxController;