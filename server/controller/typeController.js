const express = require('express');
const router = express.Router(); 

var {Forum} = require('../model/forumModel');
var {Type} = require('../model/forumType');
router.route('/:type')
.get((req,res)=>{
    // console.log(req.params.type)
    Forum.find({type : req.params.type},'title type timeAgo timestamps owner views replies', (err,doc)=>{
        if(!err){
            res.send(doc)
        }
        else{
            console.log('Error in retriving Threads :'+JSON.stringify(err,undefined,2))
        }
    });
})
.delete((req,res)=>{
    Type.deleteOne({type : req.params.type},(err,result)=>{
        if(!err){
            res.send(result);
        }else{
            res.send(err);
        }
    })
  
});
router.route('/type/:id')
.put((req,res,next)=>{
    Forum.findById(req.params.id)
    .then((thread)=>{
        if(thread != null){
            thread.title = req.body.title
            thread.body = req.body.body
            thread.image = req.body.image
            thread.save()
            .then((newThread)=>{
                res.sendStatus = 200;
                res.send(newThread);
            },(err) => next(err))
        }
    },(err) => next(err))
    .catch((err) => next(err));
})
router.route('/forum/:type')
.get((req,res,next)=>{
    Type.find({'type': req.params.type})
    .then((forum)=>{
        if(forum != null){
            res.sendStatus = 200;
            res.send(forum);
        }
    },(err) => next(err))
    .catch((err) => next(err));
})
router.route('/update/:id')
.put((req,res,next)=>{
    Type.findById(req.params.id)
    .then((forum)=>{
        if(forum != null){
            forum.description = req.body.description
            forum.teachers = req.body.teachers
            forum.save()
            .then((newForum)=>{
                res.sendStatus = 200;
                res.send(newForum);
            },(err) => next(err))
        }
    },(err) => next(err))
    .catch((err) => next(err));

})
module.exports = router