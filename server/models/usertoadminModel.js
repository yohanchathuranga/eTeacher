const mongoose = require('mongoose')

/**
 * Data model for User to admin.
 */

const Schema = mongoose.Schema
const usertoadminSchema = new Schema({
    _id: {
        type: mongoose.Schema.Types.ObjectId,
        createIndex: true,
        required: true,
        auto: true
    },
    name : {type : String},
    username : {type : String},
    email : {type : String},
    password : {type: String},
    age : {type : Number},
    teacherFlag : {type : Boolean, auto : false},
    studentFlag : {type : Boolean, auto : false}

})

module.exports = mongoose.model('Users', usertoadminSchema)