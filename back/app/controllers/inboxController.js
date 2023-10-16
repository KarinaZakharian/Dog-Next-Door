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
            const userMessageList = userMessage.map(message => { 

                message.booking.start_date = message.booking.start_date.split("-").reverse().join("/");
                message.booking.end_date = message.booking.end_date.split("-").reverse().join("/");
                 return message
          });
            res.json(userMessageList);

        } catch (error) {
            res.status(500).json(error.toString());
        }
        
    },
    
    // findUpcomingMessages : async (req,res) => {
    //     const id = req.userId;
    //     try {
        
            
    //         const userMessage = await inboxDatamapper.getUpcomingMessages(id);
            
    //         res.json(userMessage);

    //     } catch (error) {
    //         res.status(500).json(error.toString());
    //     }
        
    // },
    
    findBookingRequest : async (req,res) => {
        const userId = req.userId;
        try {
           
            const userMessage = await inboxDatamapper.getBookingRequest(userId);
            
            const userMessageList = userMessage.map(message => { 
                
                message.booking.start_date = message.booking.start_date.split("-").reverse().join("/");
                message.booking.end_date = message.booking.end_date.split("-").reverse().join("/");
                 return message
          });
            
          console.log("find booking request",userMessageList);
            res.json(userMessageList);

        } catch (error) {
            res.status(500).json(error.toString());
        }
        
    },
    
    findBookingReceived : async (req,res) => {
        const id = req.userId;
        try {
           
            const userMessage = await inboxDatamapper.getBookingReceived(id);
            const userMessageList = userMessage.map(message => { 

                message.booking.start_date = message.booking.start_date.split("-").reverse().join("/");
                message.booking.end_date = message.booking.end_date.split("-").reverse().join("/");
                 return message
          });
            res.json(userMessageList);

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
        const sender_id = req.params.sender_id;
        try {
           

            const searchSender = await inboxDatamapper.getSenderBooking(id);
            
            
            const userMessage = await inboxDatamapper.getUpcomingBooking(id,searchSender.sender_id);
           
          
            // userMessage.start_date = userMessage.start_date.toLocaleDateString('fr-FR',{day: 'numeric', month: 'numeric', year: 'numeric'});
            const userMessageList = userMessage.map(message => { 

                  message.booking.start_date = message.booking.start_date.split("-").reverse().join('/');
                  message.booking.end_date = message.booking.end_date.split("-").reverse().join('/');
                   return message
            });

            
            console.log("userMessageList : ",userMessageList);
            res.json(userMessage);

        } catch (error) {
            res.status(500).json(error.toString());
        }
        
    },


    findPastBooking : async (req,res) => {
        const id = req.userId;
        try {
            const searchSender = await inboxDatamapper.getSenderBooking(id);
            
            
            const userMessage = await inboxDatamapper.getPastBooking(id, searchSender.sender_id);
            const userMessageList = userMessage.map(message => { 

                message.booking.start_date = message.booking.start_date.split("-").reverse().join('/');
                message.booking.end_date = message.booking.end_date.split("-").reverse().join('/');
                 return message
          });
            
            res.json(userMessageList);

        } catch (error) {
            res.status(500).json(error.toString());
        }
        
    },
    
};
module.exports = inboxController;