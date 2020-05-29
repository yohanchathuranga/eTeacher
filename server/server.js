const express = require('express')
const bodyParser=require('body-parser');
const mongoose = require('mongoose')
//const router = express.Router()
const cors = require('cors')

var forumController = require('./controller/forumController')
var app = express()

const PORT = 3000;

app.use(bodyParser.json())
app.use(cors())

app.get('/', (req, res) => {
  res.send('Hello World!')
});

app.listen(PORT, () => {
  console.log('Example app listening on port ' + PORT)
});

app.use('/forums',forumController)


// create the db constant to connect
const db = "mongodb+srv://Eteacher:" + "Eteacher" + "@eteacher-vx2cz.mongodb.net/test?retryWrites=true&w=majority"

//setup cors

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

//module.exports = router
