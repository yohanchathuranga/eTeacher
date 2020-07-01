const mongoose = require('mongoose');

const Type = mongoose.model('Type',{
    forumOwner : String,
    type :String,
    description : String,
    teachers:[],
});
module.exports={Type};