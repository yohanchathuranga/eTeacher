const express = require('express')
const router = express.Router()
const User = require('../models/user')
const mongoose = require('mongoose')


//add a new user 
router.post('/:name/:age', async (req, res) => {
    const user = new User ({
        name : req.params.name,
        age : req.params.age,
        teacherFlag : true,
        studentFlag : true
    });
    user.save().then(result => {
        console.log(result)
    }).catch(err => console.log(err));
    res.json({
        message : "correctly inserted",
        createdUser : user
    })
});

//get the the specific user
router.get('/:id', (req, res) => {
    const id = req.params.id;
    User.findById(id).
    exec().
    then(doc => {
        console.log(doc);
        res.status(200).json(doc);
    }).
    catch(err => {
        console.log(err);
        res.status(500).json("There is a error")
    })
});


//get all the users
router.get('/', (req, res) => {
    User.find().
    exec().
    then(doc => {
        console.log(doc);
        res.json(doc)
    }).
    catch(err => {
        console.log(err);
        res.json({
            error : err
        })
    })
})


module.exports = router