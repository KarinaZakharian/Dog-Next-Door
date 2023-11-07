const { log } = require('console');
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
            res.status(200).json(userMessageList);

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

            const searchPetSitter = await inboxDatamapper.getSenderBooking(userId);
            const userMessage = await inboxDatamapper.getBookingRequest(userId,searchPetSitter.user_id);
           
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
            res.status(500).json([]);
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


            const searchSender = await inboxDatamapper.getUserBooking(id);
            console.log("search sender",searchSender);
            if(!searchSender){
                res.status(200).json([])
                return;
            }

            const userRequest = searchSender.sender_id;
            
            const userMessage = await inboxDatamapper.getUpcomingBooking(id,userRequest);


            // userMessage.start_date = userMessage.start_date.toLocaleDateString('fr-FR',{day: 'numeric', month: 'numeric', year: 'numeric'});
            const userMessageList = userMessage.map(message => { 

                  message.booking.start_date = message.booking.start_date.split("-").reverse().join('/');
                  message.booking.end_date = message.booking.end_date.split("-").reverse().join('/');
                   return message
            });

            res.json(userMessage);

        } catch (error) {
            res.status(500).json(error.toString());
        }

    },


    findPastBooking : async (req,res) => {
        const id = req.userId;
        try {
            const searchSender = await inboxDatamapper.getUserBooking(id);
            if(!searchSender){
                res.status(200).json([]);
                return
            }
            
            const userMessage = await inboxDatamapper.getPastBooking(id, searchSender.sender_id);
            const userMessageList = userMessage.map(message => { 

                message.booking.start_date = message.booking.start_date.split("-").reverse().join('/');
                message.booking.end_date = message.booking.end_date.split("-").reverse().join('/');
                return message
          });
            
            res.status(200).json(userMessageList);

        } catch (error) {
            res.status(500).json(error.toString());
        }
        
    },

    appendTestimony : async (req, res) => {
        console.log(req.body);
        const userTestimony = req.body;

        const testimonyAdded = await inboxDatamapper.addTestimony(userTestimony);
        res.status(200).json("Votre commentaire a été publié");
    },
    
};
module.exports = inboxController;