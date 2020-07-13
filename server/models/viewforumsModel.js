const mongoose = require('mongoose')

/**
 * Data model for User to admin.
 */

const Schema = mongoose.Schema
const forumSchema = new Schema({
    _id: {
        type: mongoose.Schema.Types.ObjectId,
        createIndex: true,
        required: true,
        auto: true
    },
    title : {type : String},
    body : {type : String},
    type : {type : String},
    views : {type: Number},
    owner : {type : String},
    timeAgo : {type : String},
    votes : {type: Number},
    replies : {type: Number},
})

module.exports = mongoose.model('Forums', forumSchema)