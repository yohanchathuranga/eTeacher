const mongoose = require('mongoose');

const Forum = mongoose.model('Forum',{
    title:String,
    body:String,
});
module.exports={Forum};