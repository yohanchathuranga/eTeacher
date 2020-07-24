const mongoose = require('mongoose');

const Type = mongoose.model('Type',{
    forumOwner : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'User'
    },
    type :String,
    description : String,
    teachers:[],
});
module.exports={Type};