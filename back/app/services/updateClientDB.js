const client = require('./clientPg');

let counter =0;
const updateBooking = {

  launchUpdateBooking : async () => {
    const query = `
      UPDATE "booking"
      SET "booking_status" = 'passed'
      WHERE "id" IN(
        SELECT "id"
        FROM "booking"
        WHERE "end_date" < DATE( NOW() ) AND "booking_status" != 'passed'
      )
      `;
    const bookingsUpdated = await client.query(query);
    counter ++;
    console.log(bookingsUpdated.rowCount, counter);
  },

  
  
  updatePassedBookingStatus : async () => {
    let now = new Date();
    let hour = now.getHours();
    let minute = now.getMinutes();
    let second = now.getSeconds();
    let millisecond = now.getMilliseconds();
    
    let remainingTime = (24 - hour) * 60 * 60 * 1000 - minute * 60 * 1000 - second * 1000 - millisecond + 60 * 1000;
    
    setTimeout(function() {
      updateBooking.launchUpdateBooking();
      setInterval(updateBooking.launchUpdateBooking, 24 * 60 * 60 * 1000); 
    }, remainingTime);
  },
};

module.exports = updateBooking;