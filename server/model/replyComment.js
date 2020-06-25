const mongoose = require('mongoose');

const replyComments = mongoose.model('replyComments',{
    parentCId : String,
    threadId :String,
    owner : String,
    date : Date,
    comment : String
});
module.exports={replyComments};