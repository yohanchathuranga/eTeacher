const express = require('express')
const router = express.Router();
const mongoose = require('mongoose');
const Booking = require('../models/booking')
const server = require('../server');
const { exec } = require('child_process');
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

//view booking by date user
router.get('/bookingbydateuser', function (req, res) {
    const date = req.query.date;
    const studentid=req.query.studentid
    console.log('Get request for a bookings'+date);
    Booking.find({date: date,studentid:studentid}).sort({date:-1}).exec(function(err, bookings) {
        if (err) {
            console.log("Error retrieving")
        } else {
            res.json(bookings);
        }
      });
});

//view booking by date teacher
router.get('/bookingbydateteacher', function (req, res) {
    const date = req.query.date;
    const teacherid=req.query.teacherid
    console.log('Get request for a bookings'+date);
    Booking.find({date: date,teacherid:teacherid}, function(err, bookings) {
        if (err) {
            console.log("Error retrieving")
        } else {
            res.json(bookings);
        }
      });
});

//booking count date
router.get('/bookingbydaycount:date', function (req, res) {
    const date = req.params.date;
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
router.get('/bookingbyteacher:teacherid', function (req, res) {
    const teacherid = req.params.teacherid;
    const sort1={date:-1}
    console.log('Get request for a bookings '+teacherid);
    Booking.find({teacherid: teacherid}).sort(sort1).exec(function(err, bookings) {
        if (err) {
            console.log("Error retrieving")
        } else {
            res.json(bookings);
        }
      });
});

//view bookings by student
router.get('/bookingbystudent/:studentid', function (req, res) {
    const studentid = req.params.studentid;
    console.log('Get request for a bookings'+studentid);
    Booking.find({studentid: studentid}).sort({date:-1,start:-1}).exec(function(err, bookings) {
        if (err) {
            console.log("Error retrieving")
        } else {
            res.json(bookings);
        }
      });
});


router.get('/bookingbyteacherdate:booking', function (req, res) {
    const teacherid = req.params.booking.teacherid;
    const date=req.params.booking.date;
    console.log('Get request for a bookingsq ');
    Booking.find({teacherid: teacherid,date:date}).exec(function(err, bookings) {
        if (err) {
            console.log("Error retrieving")
        } else {
            res.json(bookings);
        }
      });
});




//update booking
router.put('/editbooking:id', function (req, res) {
    const id = req.params.id; 
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
router.delete('/deletebooking:id',function(req,res){
    const id = req.params.id; 
    console.log('delete booking');
    Booking.findByIdAndRemove(id,
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