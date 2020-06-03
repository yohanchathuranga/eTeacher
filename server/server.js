const express = require('express')
const mongoose = require('mongoose')
const router = express.Router()
const cors = require('cors')
const app = express()
const path = require('path');
const bodyParser = require('body-parser')
const passport = require('passport');


const user = require('./routes/users')
const booking = require('./routes/bookings')

const PORT = 3000;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(passport.initialize());
app.use(passport.session());

app.use('/user', user);
app.use('/booking', booking);



app.get('/', (req, res) => {
  res.send("hello world");
});

app.listen(PORT, () => {
  console.log('Example app listening on port ' + PORT)
});



// create the db constant to connect
const db = "mongodb+srv://Eteacher:" + "Eteacher" + "@eteacher-vx2cz.mongodb.net/E-teacher?retryWrites=true&w=majority"

//setup cors
app.use(cors())

//connect to the database
mongoose.connect(db, {
  useNewUrlParser: true
}, err => {
  if (err) {
    console.error('Error!' + err)
  } else {
    console.log('connected to database')
  }
})

const JwtStrategy = require('passport-jwt').Strategy,
  ExtractJwt = require('passport-jwt').ExtractJwt;

const opts = {}
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = 'secret';

passport.use(new JwtStrategy(opts, function (jwt_payload, done) {
  User.findUserbyId({_id: jwt_payload._doc._id}, function (err, user) {
    if (err) {
      return done(err, false);
    }
    if (user) {
      return done(null, user);
    } else { 
      return done(null, false);
      // or you could create a new account
    }
  });
}));

module.exports = router
