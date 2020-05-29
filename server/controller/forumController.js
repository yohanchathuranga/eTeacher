const express = require('express');
const router = express.Router();

var {Forum} = require('../model/forumModel')

router.get('/',(req,res)=>{
    Forum.find((err,docs)=>{
    if(!err){res.send(docs);}
     else{console.log('Error in retriving Threds :'+JSON.stringify(err,undefined,2));
    }
});
});

router.post('/',(req,res)=>{
    var emp = Forum({
        title : req.body.title,
        body : req.body.body
    });
    emp.save((err,doc)=>{
        if(!err){res.send(doc);}
        else{console.log('Error in sending Threds details:'+JSON.stringify(err,undefined,2))}
    });
});

module.exports = router
