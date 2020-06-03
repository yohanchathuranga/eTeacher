const express = require('express')
const router = express.Router()

router.get("/user",function(req,res){
    res.send("hello user");
});

module.exports=router;