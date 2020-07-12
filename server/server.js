const express = require('express')
const bodyParser=require('body-parser');
const mongoose = require('mongoose')
const router = express.Router()
const cors = require('cors')

var forumController = require('./controller/forumController');
var cmtThreadController = require('./controller/cmtThreadController');
var replycController = require('./controller/replycController');
var typeController = require('./controller/typeController');
var app = express()

app.use(bodyParser.json({ limit: "200mb" }))
app.use(cors())
const path = require('path');
const passport = require('passport');


const user = require('./routes/users')
const booking = require('./routes/bookings')
const adminRouter = require('./api/admin')


const PORT = 3000;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(passport.initialize());
app.use(passport.session());

app.use('/user', user);
app.use('/booking', booking);


app.use(cors());
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods: GET, POST, PATCH, PUT, DELETE, OPTIONS")
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With,Content-Type, Accept,Authorization");
  next();
});

app.get('/', (req, res) => {
  res.send("hello world");
});

app.listen(PORT, () => {
  console.log('Example app listening on port ' + PORT)
});

app.use('/forums',forumController);
app.use('/comments',cmtThreadController);
app.use('/replyComments',replycController);
app.use('/type', typeController);
app.use('/admin', adminRouter);



// create the db constant to connect
const db = "mongodb+srv://Eteacher:" + "Eteacher" + "@eteacher-vx2cz.mongodb.net/E-teacher?retryWrites=true&w=majority"

//setup cors

//connect to the database
mongoose.connect(db, {
  useNewUrlParser: true
,useUnifiedTopology: true}, err => {
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
  User.findUserbyId({ _id: jwt_payload._doc._id }, function (err, user) {
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

//module.exports = router
