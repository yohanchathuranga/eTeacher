const mongoose = require('mongoose');

const Comments = mongoose.model('Comments',{
    threadId : String,
    owner : String,
    date : Date,
    comment : String
});
module.exports={Comments};