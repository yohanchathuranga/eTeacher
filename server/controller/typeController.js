const express = require('express');
const router = express.Router(); 

var {Forum} = require('../model/forumModel')
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
module.exports = router