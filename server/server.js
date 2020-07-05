const express = require('express')
const mongoose = require('mongoose')
const router = express.Router()
const cors = require('cors')
const app = express()

const PORT = 3000;
const UserRouter = require('./api/user')

app.get('/', (req, res) => {
  res.send('Hello World!')
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

app.use('/users', UserRouter)

module.exports = router
