const mongoose = require('mongoose')
const schema = mongoose.Schema;

const bookingSchema = new schema({
    date: { type: String, require: true },
    start: { type: String, require: true },
    endtime: { type: String, require: true },
    studentid: { type: String, require: true },
    teacherid: { type: String, require: true },
    status: { type: String, require: true }
    

});

const Booking = module.exports = mongoose.model("Booking", bookingSchema);
module.exports.saveBooking = function (newBooking, callback) {  
     newBooking.save(callback);       
};

module.exports.findBookingbyId = function (id, callback) {
    Booking.findOne(id, callback);
}

module.exports.findBookingbyDate = function (date, callback) {
    const query = {date: date };
    Booking.findOne(query, callback)
}
// module.exports.findBookingbyDate = function (date, callback) {
//     Booking.findOne(date, callback);
// }