const mongoose = require('mongoose');

const Forum = mongoose.model('Forum',{
    title:String,
    body:String,
    timestamps: Date,
    views: Number,
    owner : String
});
module.exports={Forum};