const express = require('express');
const router = express.Router();

var objectId = require('mongoose').Types.ObjectId

var {Forum} = require('../model/forumModel');
var {Type} = require('../model/forumType');
router.route('/')
.get((req,res)=>{
    Forum.find((err,docs)=>{
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
});

module.exports = router
