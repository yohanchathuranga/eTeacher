const mongoose = require('mongoose')

/**
 * Data model for User.
 */

const Schema = mongoose.Schema
const userSchema = new Schema({
    _id: {
        type: mongoose.Schema.Types.ObjectId,
        createIndex: true,
        required: true,
        auto: true
    },
    name : {type : String},
    age : {type : Number},
    teacherFlag : {type : Boolean, auto : true},
    studentFlag : {type : Boolean, auto : true}

})
module.exports = mongoose.model('User', userSchema)