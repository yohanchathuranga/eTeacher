const express = require('express')
const router = express.Router()
const DelUserToAdmin = require('../models/deluserstoadminModel')
const UserToAdmin = require('../models/usertoadminModel')
const ForumAdmin = require('../models/viewforumsModel')
const DelforumAdmin = require('../models/delforumModel')
const mongoose = require('mongoose')

//get all the users
router.get('/userstoadmin', (req, res) => {
    // console.log("this is the usertoadmin in get ")
    UserToAdmin.find().
    exec().
    then(doc => {
        // console.log(doc);
        res.json(doc)
    }).
    catch(err => {
        console.log(err);
        res.json({
            error : err
        })
    })
})

//get all the deleted users
router.get('/deleteduserstoadmin', (req, res) => {
    // console.log("this is the deleteduserotadmin in get ")
    DelUserToAdmin.find().
    exec().
    then(doc => {
        // console.log(doc);
        res.json(doc)
    }).
    catch(err => {
        console.log(err);
        res.json({
            error : err
        })
    })
})

//move a user from users to deletedusers
router.post('/setDelUser', (req, res) => {

    const deletedUser = new DelUserToAdmin({
        name : req.body.name,
        username : req.body.username,
        email : req.body.email,
        password : req.body.password,
        age : req.body.age,
        teacherFlag : req.body.teacherFlag,
        studentFlag : req.body.studentFlag
    })
    deletedUser.save().then(data => {
        res.json(data);
        // console.log(data)
    }).catch(err => {
        res.json({
            message: err
        })
        console.log(err)
    });

});

router.delete('/delAvaiUser/:id', (req, res) => {

    UserToAdmin.remove({_id:req.params.id}).
    exec().
    then(doc => {
        // console.log(doc);
        res.json(doc)
    }).
    catch(err => {
        console.log(err);
        res.json({
            error : err
        })
    })

});


router.post('/setRecUser', (req, res) => {

    const recoveredUser = new UserToAdmin({
        name : req.body.name,
        username : req.body.username,
        email : req.body.email,
        password : req.body.password,
        age : req.body.age,
        teacherFlag : req.body.teacherFlag,
        studentFlag : req.body.studentFlag
    })
    recoveredUser.save().then(data => {
        res.json(data);
        // console.log(data)
    }).catch(err => {
        res.json({
            message: err
        })
        console.log(err)
    });

});

router.delete('/recoverUser/:id', (req, res) => {

    DelUserToAdmin.remove({_id:req.params.id}).
    exec().
    then(doc => {
        // console.log(doc);
        res.json(doc)
    }).
    catch(err => {
        console.log(err);
        res.json({
            error : err
        })
    })

});

router.get('/getAllForums', (req, res) => {
    // console.log("this is the usertoadmin in get ")
    ForumAdmin.find().
    exec().
    then(doc => {
        // console.log(doc);
        res.json(doc)
    }).
    catch(err => {
        console.log(err);
        res.json({
            error : err
        })
    })
})

router.get('/getDelForums', (req, res) => {
    // console.log("this is the usertoadmin in get ")
    DelforumAdmin.find().
    exec().
    then(doc => {
        // console.log(doc);
        res.json(doc)
    }).
    catch(err => {
        console.log(err);
        res.json({
            error : err
        })
    })
})


router.post('/setDelForum', (req, res) => {

    const deletedForum = new DelforumAdmin({
        title : req.body.title,
        body : req.body.body,
        type : req.body.type,
        views : req.body.views,
        owner : req.body.owner,
        timeAgo : req.body.timeAgo,
        votes : req.body.votes,
        replies : req.body.replies
    })
    deletedForum.save().then(data => {
        res.json(data);
        // console.log(data)
    }).catch(err => {
        res.json({
            message: err
        })
        console.log(err)
    });

});

router.delete('/delAvaiForum/:id', (req, res) => {

    ForumAdmin.remove({_id:req.params.id}).
    exec().
    then(doc => {
        // console.log(doc);
        res.json(doc)
    }).
    catch(err => {
        console.log(err);
        res.json({
            error : err
        })
    })

});


router.post('/setRecForum', (req, res) => {

    const recoveredForum = new ForumAdmin({
        title : req.body.title,
        body : req.body.body,
        type : req.body.type,
        views : req.body.views,
        owner : req.body.owner,
        timeAgo : req.body.timeAgo,
        votes : req.body.votes,
        replies : req.body.replies
    })
    recoveredForum.save().then(data => {
        res.json(data);
        // console.log(data)
    }).catch(err => {
        res.json({
            message: err
        })
        console.log(err)
    });

});

router.delete('/recoverForum/:id', (req, res) => {

    DelforumAdmin.remove({_id:req.params.id}).
    exec().
    then(doc => {
        // console.log(doc);
        res.json(doc)
    }).
    catch(err => {
        console.log(err);
        res.json({
            error : err
        })
    })

});


router.put('/changeTeacherFlag', (req, res) =>{

    console.log(req.body._id)
    UserToAdmin.findByIdAndUpdate(req.body._id, {name : "hello"}).
    then(doc => {
        console.log(doc);
        res.json(doc)
    }).
    catch(err => {
        console.log(err);
        res.json({
            error : err
        })
    })
    // UserToAdmin.findById(req.body.name)
    // exec(
    //     user.teacherFlag = false
    // )
    // user.save().then(data => {
    //     res.json(data);
    //     console.log(data)
    // }).catch(err => {
    //     res.json({
    //         message: err
    //     })
    //     console.log(err)
    // });

})

module.exports = router