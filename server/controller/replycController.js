const express = require('express');
const replyRouter = express.Router();

var {replyComments} = require('../model/replyComment');
replyRouter.route('/')
.post((req,res)=>{
    var cmt = replyComments({
    parentCId : req.body.parentCId,
    threadId : req.body.threadId,
    owner : req.body.owner,
    date : req.body.date,
    comment : req.body.comment
    })
    cmt.save((err,doc)=>{
        if(!err){res.send(doc);}
        else{console.log('Error in sending Threds details:'+JSON.stringify(err,undefined,2))}
    });
});
replyRouter.route('/:id')
.get((req,res)=>{
    replyComments.find({parentCId: req.params.id},(err,result)=>{
        if(!err){
            res.send(result)
        }
        else{
            console.log('Error in retriving Comments :'+JSON.stringify(err,undefined,2))
        }
    })
});
replyRouter.route('/all/:id')
.get((req,res)=>{
    replyComments.find({threadId: req.params.id},(err,result)=>{
        if(!err){
            res.send(result)
        }
        else{
            console.log('Error in retriving Comments :'+JSON.stringify(err,undefined,2))
        }
    })
});


module.exports = replyRouter;