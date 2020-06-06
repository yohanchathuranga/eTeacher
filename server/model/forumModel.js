const mongoose = require('mongoose');

const Forum = mongoose.model('Forum',{
    title:String,
    body:String,
    timestamps: Date,
    views: Number,
    replies: Number,
    owner : String,
    timeAgo: String
});
module.exports={Forum};