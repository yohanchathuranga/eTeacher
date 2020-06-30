const mongoose = require('mongoose');

const Type = mongoose.model('Type',{
    type :String,
    teachers:[],
});
module.exports={Type};