const { log } = require('console');
const {bookingDatamapper, userDatamapper} = require('../datamappers');

const bookingController = {
  
  createNewBooking : async (req,res) => {
    
    const petSitterId = parseInt(req.params.id);
    const newBooking = req.body;
    const userId = req.userId;
 
    
    const disponibilityExist = await bookingDatamapper.getOneUserDisponibility(petSitterId, newBooking.disponibility_id);
 
    //! Si aucune disponibilité est enregistré, on envoie un message d'erreur
    if(!disponibilityExist){
      res.status(401).json({"message":"Aucune disponibilité n'a été enregistré"});
      return
    }
   
   
    // ! Mise en forme de la date rentrante par le req.body
    const dateRange = newBooking.booking_date;
    const [startDateString, endDateString] = dateRange.split(" au ")

    const startDate = new Date(startDateString.split("/").reverse().join("-"));
    const endDate = new Date(endDateString.split("/").reverse().join("-"));
    const startDateFr = startDate.toLocaleDateString('fr-FR');
    const endDateFr =endDate.toLocaleDateString('fr-FR');

    const sqlStartDate = startDate.toISOString().split("T")[0];
    const sqlEndDate = endDate.toISOString().split("T")[0];

    newBooking.start_date = sqlStartDate;
    newBooking.end_date = sqlEndDate;

    //! Si date de début et de fin de la réservation correspondent à celles de la disponibilité 
    console.log(newBooking);
    if(disponibilityExist.start_date.toLocaleDateString('fr-FR') == startDateFr && disponibilityExist.end_date.toLocaleDateString('fr-FR') == endDateFr){
      
      disponibilityExist.start_date = disponibilityExist.start_date.toLocaleDateString('fr-FR',{day: 'numeric', month: 'numeric', year: 'numeric'})
      disponibilityExist.end_date = disponibilityExist.end_date.toLocaleDateString('fr-FR',{day: 'numeric', month: 'numeric', year: 'numeric'})
      
      const booking = await bookingDatamapper.addBooking(petSitterId,userId, newBooking);
      // console.log("bookin : ",booking);
      res.json({"message" : "Votre réservation a bien été pris en compte", booking});
      console.log("condition 1: booking créé et dispo surppimé");
      return;
    }else {
      console.log("il ne rentre pas dans la condition")
    }
    
    // ! Si la date de début de la résa = celle de la dispo, mais que la date de fin de résa est inférieur à celle de la dispo
    
    if(disponibilityExist.start_date.toLocaleDateString('fr-FR') === startDateString && disponibilityExist.end_date.toLocaleDateString('fr-FR') > endDateString){
      // On supprime la dispo et crée le booking
      const booking = await bookingDatamapper.addBooking(userId, newBooking);
      
      // Nouvelle date de début de dispo
      let newDisponibilityStartDate = new Date(endDate.setDate(endDate.getDate() + 1));
      newDisponibilityStartDate = newDisponibilityStartDate.toLocaleDateString('fr-FR').split("/").reverse().join("-");
      // Formatage de la date de fin de dispo inchangé
      const disponibilityEndDate = disponibilityExist.end_date.toLocaleDateString('fr-FR').split("/").reverse().join("-");
      
      // Ajout de la dispo modifiée
      const newPetsitterDisponibility = await userDatamapper.addNewUserDisponibilitites(newDisponibilityStartDate ,disponibilityEndDate ,petSitterId);
      res.json({"message" : "Votre réservation a bien été pris en compte", booking});
      console.log("condition 2 : ajout du booking et création du créneau");
      return;
    }
    
    // ! Si date de début de résa commence après dispo et se finit au jour de la date de fin de dispo
    if (disponibilityExist.start_date.toLocaleDateString('fr-FR') < startDateString && disponibilityExist.end_date.toLocaleDateString('fr-FR') === endDateString) {
      // On supprime la dispo et crée le booking
      const booking = await bookingDatamapper.addBooking(userId, newBooking);
      
      // Formatage de la date de début de dispo inchangé
      const disponibilityStartDate = disponibilityExist.start_date.toLocaleDateString('fr-FR').split("/").reverse().join("-");
      // Nouvelle date de fin de dispo
      let newDisponibilityEndDate = new Date(startDate.setDate(startDate.getDate() - 1));
      newDisponibilityEndDate = newDisponibilityEndDate.toLocaleDateString('fr-FR').split("/").reverse().join("-");
      // création de la dispo
      const newPetsitterDisponibility = await userDatamapper.addNewUserDisponibilitites(disponibilityStartDate ,newDisponibilityEndDate ,petSitterId);
      
      res.json({"message" : "Votre réservation a bien été pris en compte", booking});
      console.log("condition 3 : ajout du booking et création du créneau");
      return;
    }
    
    // ! Si le booking est compris à l'intérieur de la dispo
    if (disponibilityExist.start_date.toLocaleDateString('fr-FR') < startDateString && disponibilityExist.end_date.toLocaleDateString('fr-FR') > endDateString) {
      console.log("dans la boucle");
      // On supprime la dispo et crée le booking
      const booking = await bookingDatamapper.addBooking(userId, newBooking);
      
      // On crée 2 créneaux de disponibilité encadrant la réservation
      
      // Création de la dispo en amont de la résa
      // Formatage de la date de début de dispo en amont
      const disponibilityStartDate = disponibilityExist.start_date.toLocaleDateString('fr-FR').split("/").reverse().join("-");
      // Nouvelle date de fin de la dispo en amont
      let newDisponibilityEndDate = new Date(startDate.setDate(startDate.getDate() - 1));
      newDisponibilityEndDate = newDisponibilityEndDate.toLocaleDateString('fr-FR').split("/").reverse().join("-");
      // Création de la dispo en amont de la résa
      const newPetsitterDisponibilityUpstream = await userDatamapper.addNewUserDisponibilitites(disponibilityStartDate ,newDisponibilityEndDate ,petSitterId);
      
      // Création de la dispo en aval de la résa
      // Nouvelle date de début de dispo en aval
      let newDisponibilityStartDate = new Date(endDate.setDate(endDate.getDate() + 1));
      newDisponibilityStartDate = newDisponibilityStartDate.toLocaleDateString('fr-FR').split("/").reverse().join("-");
      // Formatage de la date de fin de dispo en aval
      const disponibilityEndDate = disponibilityExist.end_date.toLocaleDateString('fr-FR').split("/").reverse().join("-");
      // Ajout de la dispo en aval de la résa
      const newPetsitterDisponibilityDownstream  = await userDatamapper.addNewUserDisponibilitites(newDisponibilityStartDate ,disponibilityEndDate ,petSitterId);
      
      res.status(200).json({"message" : "Votre réservation a bien été pris en compte", booking});
      console.log("résa confirmé");
      return;
    }
    
    
  },
};
module.exports = bookingController;