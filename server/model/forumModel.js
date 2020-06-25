const mongoose = require('mongoose');

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
    votes : Number
});
module.exports={Forum};