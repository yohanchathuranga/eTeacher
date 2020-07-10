const express = require('express');
const router = express.Router();

var {Comments} = require('../model/threadCmt');

router.post('/',(req,res)=>{
    var cmt = Comments({
    threadId : req.body.threadId,
    owner : req.body.owner,
    date : req.body.date,
    comment : req.body.body
    })
    cmt.save((err,doc)=>{
        if(!err){res.send(doc);}
        else{console.log('Error in sending Threds details:'+JSON.stringify(err,undefined,2))}
    });
});
router.route('/:id')
.get((req,res)=>{
    Comments.find({threadId: req.params.id},(err,result)=>{
        if(!err){
            res.send(result)
        }
        else{
            console.log('Error in retriving Comments :'+JSON.stringify(err,undefined,2))
        }
    })
})
.delete((req,res,next)=>{
    Comments.findById(req.params.id)
    .then((comment)=>{
        if(comment != null){
            comment.remove((err,doc)=>{
                if(!err){
                    res.sendStatus = 200;
                    res.send(doc);
                }
            })
        }
    },(err)=>next(err))
    .catch((err)=>next(err))
})
.put((req,res,next)=>{
    Comments.findById(req.params.id)
    .then((comment)=>{
        comment.comment = req.body.newComment
        comment.save()
        .then((newComment)=>{
            res.sendStatus = 200;
            res.send(newComment)
        },(err)=>next(err))
    },(err)=>next(err))
    .catch((err)=>next(err))
})

module.exports = router;