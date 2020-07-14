const mongoose = require('mongoose')

/**
 * Data model for User to admin.
 */

const Schema = mongoose.Schema
const commentAdminSchema = new Schema({
    _id: {
        type: mongoose.Schema.Types.ObjectId,
        createIndex: true,
        required: true,
        auto: true
    },
    threasId : {type : String},
    owner : {type : String},
    comment : {type : String},
})

module.exports = mongoose.model('Comments', commentAdminSchema)