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
})
.delete((req,res)=>{
    replyComments.deleteMany({parentCId : req.params.id}, (err,result)=>{
        if(!err){
            res.send(result);
        }else{
            res.send(err);
        }
    });
})

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

replyRouter.route('/reply/:id')
.delete((req,res,next)=>{
    replyComments.findById(req.params.id)
    .then((reply)=>{
        if(reply!=null){
            reply.remove((err,result)=>{
                if(!err){
                    res.send(result)
                }else{
                    res.send(err)
                }
            })
        }
    },(err)=>next(err))
    .catch((err)=>next(err))
})
.put((req,res,next)=>{
    replyComments.findById(req.params.id)
    .then((reply)=>{
        if(reply != null){
            reply.comment = req.body.reply
            reply.save()
            .then((newReply)=>{
                res.sendStatus = 200;
                res.send(newReply);
            },(err)=>next(err))
        }
    },(err)=>next(err))
    .catch((err)=>next(err))
})


module.exports = replyRouter;