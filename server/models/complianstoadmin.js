const mongoose = require('mongoose')

/**
 * Data model for User to admin.
 */

const Schema = mongoose.Schema
const complainSchema = new Schema({
    _id: {
        type: mongoose.Schema.Types.ObjectId,
        createIndex: true,
        required: true,
        auto: true
    },
    complain : {type : String},
    type : {type : String},
    owner : {type : String},
})

module.exports = mongoose.model('Complains', complainSchema)