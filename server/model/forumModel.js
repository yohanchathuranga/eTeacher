const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Vote = new Schema({
    voteUp : Boolean,
    voteDown : Boolean,
    owner : String
})
const Forum = mongoose.model('Forum',{
    title:String,
    body:String,
    image:String,
    type:String,
    timestamps: Date,
    views: Number,
    replies: Number,
    owner : String,
    timeAgo: String,
    votes : Number,
    voteDetails : [Vote]

});
module.exports={Forum};