const express = require('express');
const router = express.Router();

var objectId = require('mongoose').Types.ObjectId

var {Forum} = require('../model/forumModel');
var {Type} = require('../model/forumType');
router.route('/')
.get((req,res)=>{
    Forum.find({},'title type timeAgo timestamps owner views replies',(err,docs)=>{
    if(!err){res.send(docs);}
     else{console.log('Error in retriving Threds :'+JSON.stringify(err,undefined,2));
    }
});
})
.post((req,res)=>{
    var emp = Forum({
        title : req.body.title,
        body : req.body.body,
        image : req.body.image,
        type : req.body.type,
        timestamps: req.body.timestamps,
        views: req.body.views,
        owner : req.body.owner,
        timeAgo: req.body.timeAgo,
        votes : req.body.votes,
        replies : req.body.replies
    });
    console.log(req.body.body)
    emp.save((err,doc)=>{
        if(!err){res.send(doc);}
        else{console.log('Error in sending Threds details:'+JSON.stringify(err,undefined,2))}
    });
});
router.route('/type')
.get((req,res,next)=>{
    Type.find()
    .then((doc)=>{
        if(doc){
        res.send(doc)
        }else{
            res.statusCode = 404;
            res.setHeader('Content-Type', 'application/json');
            res.json(doc);
        }
    }, (err) => next(err))
    .catch((err) => next(err));
})
.post((req,res , next)=>{
    Type.create(req.body)
    .then((type) => {
        console.log('Type Created ', type);
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(type);
    }, (err) => next(err))
    .catch((err) => next(err));
});
router.route('/:id')
.get((req,res)=>{
    Forum.findById(req.params.id,(err,doc)=>{
        if(!err){
            res.send(doc)
        }
        else{
            console.log('Error in retriving Employees :'+JSON.stringify(err,undefined,2))
        }
    });
})
.post((req,res)=>{
    Forum.findById(req.params.id)
    .then((thread)=>{
        if(thread != null){
            thread.voteDetails.push(req.body)
            thread.save()
            .then((vote)=>{
                res.send(vote)
            })
        }
    },(err) => next(err))
    .catch((err) => next(err));
})
.put((req,res)=>{
    if(!objectId.isValid(req.params.id))
    return res.status(400).send('no recode with given id : ${req.params.id}');
    var emp = {
        title : req.body.title,
        body : req.body.body,
        type : req.body.type,
        timestamps: req.body.timestamps,
        views: req.body.views,
        owner : req.body.owner,
        timeAgo: req.body.timeAgo,
        votes : req.body.votes,
        replies : req.body.replies
    };
    Forum.findByIdAndUpdate(req.params.id,{$set:emp}, {new:true},(err,doc)=>{
        if(!err){res.send(doc);}
        else{console.log('Error in employee update :'+JSON.stringify(err,undefined,2))
    }
    });
})

.delete((req,res,next)=>{
    Forum.findById(req.params.id)
    .then((thread)=>{
        if(thread !=null){
            thread.remove((err,doc)=>{
                if(!err){
                    res.status = 200;
                    res.send(doc)
                }else{
                    console.log('Error in delete this thread : '+JSON.stringify(err,undefined,2))
                }
            })
        }
    },(err) => next(err))
    .catch((err) => next(err));
})

router.route('/:id/:voteOwner')
.get((req,res,next)=>{
    Forum.findById(req.params.id)
    .then((vote)=>{
            var flag = -1;
            if(vote.voteDetails[0] != null){
            for(let i in vote.voteDetails){
                // console.log(req.params.voteOwner)
                // console.log(vote.voteDetails[i].owner)
                if(new String(req.params.voteOwner).valueOf() == new String(vote.voteDetails[i].owner).valueOf()){
                    flag = i
                    break;
                }

            }
            console.log(flag)
            if(flag != -1){
            if(vote != null && new String(vote.voteDetails[flag].owner).valueOf() == new String(req.params.voteOwner).valueOf()){
                res.statusCode = 200;
                // console.log(vote.voteDetails[flag])
                res.send([vote.voteDetails[flag]]);
            }else{
                res.statusCode = 200;
                res.send([]);
            }
        }
        }else{
            res.statusCode = 200;
            res.send([]);
        }
            
    },(err) => next(err))
    .catch((err) => next(err));
})
router.route('/:id/vote/:voteId')

.put((req,res ,next)=>{
    Forum.findById(req.params.id)
    .then((thread)=>{
        if(thread != null && thread.voteDetails.id(req.params.voteId) != null){
          
                thread.voteDetails.id(req.params.voteId).voteUp = req.body.voteUp;
                thread.voteDetails.id(req.params.voteId).voteDown = req.body.voteDown;
     
            thread.save()
            .then((newThread)=>{
                res.statusCode = 200;
                // console.log(vote.voteDetails[flag])
                res.send([newThread.voteDetails.id(req.params.voteId)]);
            },(err) => next(err))
        }
    },(err) => next(err))
    .catch((err) => next(err));
})
router.route('/type/:type')
.delete((req,res)=>{
    Forum.deleteMany({type:req.params.type}, (err,result)=>{
        if(!err){
            res.send(result);
        }else{
            res.send(err);
        }
    })
})




module.exports = router
