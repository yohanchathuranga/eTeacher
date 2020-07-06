const express = require('express');
const router = express.Router(); 

var {Forum} = require('../model/forumModel')

router.get('/:type', (req,res)=>{
    // console.log(req.params.type)
    Forum.find({type : req.params.type},(err,doc)=>{
        if(!err){
            res.send(doc)
        }
        else{
            console.log('Error in retriving Threads :'+JSON.stringify(err,undefined,2))
        }
    });
});
module.exports = router