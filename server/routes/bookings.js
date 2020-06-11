const express = require('express')
const router = express.Router();
const mongoose = require('mongoose');
const Booking = require('../models/booking')
const server = require('../server')
mongoose.set('useFindAndModify', false);

router.post("/newbooking", function (req, res) {
    const newBooking = new Booking({
        date: req.body.date,
        start: req.body.start,
        endtime: req.body.endtime,
        studentid: req.body.studentid,
        teacherid: req.body.teacherid,
        status: req.body.status
    });

    Booking.saveBooking(newBooking, function (err, booking) {
        if (err) {
            res.json({ state: false, msg: "data not inserted" });
        } else {
            res.json({ state: true, msg: "data inserted" })
        }
    })

});


router.get('/allbookings', function (req, res) {
    console.log('Get request for all bookings');
    Booking.find({})
        .exec(function (err, bookings) {
            if (err) {
                console.log("Error retrieving")
            } else {
                res.json(bookings);
            }
        });
});

//view single booking by id
router.get('/booking', function (req, res) {
    const id = req.body.id;
    console.log('Get request for a booking');
    Booking.findById(id)
        .exec(function (err, booking) {
            if (err) {
                console.log("Error retrieving")
            } else {
                res.json(booking);
            }
        });
});

//view booking by date
router.get('/bookingbydate', function (req, res) {
    const date = req.body.date;
    console.log('Get request for a bookings'+date);
    Booking.find({date: date}, function(err, bookings) {
        if (err) {
            console.log("Error retrieving")
        } else {
            res.json(bookings);
        }
      });
});

//view bookings by teacher
router.get('/bookingbyteacher', function (req, res) {
    const teacherid = req.body.teacherid;
    console.log('Get request for a bookings'+teacherid);
    Booking.find({teacherid: teacherid}, function(err, bookings) {
        if (err) {
            console.log("Error retrieving")
        } else {
            res.json(bookings);
        }
      });
});

//view bookings by student
router.get('/bookingbystudent', function (req, res) {
    const studentid = req.body.studentid;
    console.log('Get request for a bookings'+studentid);
    Booking.find({studentid: studentid}, function(err, bookings) {
        if (err) {
            console.log("Error retrieving")
        } else {
            res.json(bookings);
        }
      });
});


//update video
router.put('/editbooking', function (req, res) {
    const id = req.body.id; 
    console.log('Update a booking');
    Booking.findByIdAndUpdate(id,
        {
            $set: {
                date: req.body.date,
                start: req.body.start,
                endtime: req.body.endtime,
                studentid: req.body.studentid,
                teacherid: req.body.teacherid,
                status: req.body.status
            }

        },
        {
            new: true
        },
        function (err, updatedBooking) {
            if (err) {
                res.send('Error update booking');
            } else {
                res.json(updatedBooking);
            }
        }
    );
});

//delete booking
router.delete('/deletebooking',function(req,res){
    const id = req.body.id; 
    console.log('delete booking');
    Video.findByIdAndRemove(id,
        function(err,deletedBooking){
            if(err){
               res.send('Error delete Booking');
           }else{
               res.json(deletedBooking);
           }
       }
        )
});



module.exports = router;