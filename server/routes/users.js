const express = require('express')
const router = express.Router();
const User = require('../models/user')
const jwt = require('jsonwebtoken')
const server = require('../server')
const passport = require('passport')

router.post("/register", function(req, res) {
    // res.setHeader('access-control-allow-origin', 'http://localhost:4200');
    const newUser = new User({
        name: req.body.name,
        username: req.body.username,
        email: req.body.email,
        password: req.body.password
    });

    User.saveUser(newUser, function(err, user) {
        if (err) {
            res.json({ state: false, msg: "data not inserted" });
        } else {
            res.json({ state: true, msg: "data inserted" })
        }
    })

});


router.post("/login", function(req, res) {
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:4200');
    const email = req.body.email;
    const password = req.body.password;

    User.findByEmail(email, function(err, user) {
        if (err) throw err;
        if (!user) {
            res.json({ state: false, msg: "No User Found" });
            return false;
        }
        User.passwordCheck(password, user.password, function(err, match) {
            if (err) throw err;
            if (match) {
                const token = jwt.sign(user.toJSON(), "secret", { expiresIn: 86400 });
                res.json({
                    state: true,
                    token: "JWT " + token,
                    user: {
                        id: user._id,
                        name: user.name,
                        username: user.username,
                        email: user.email
                    }
                })
            }
        });
    })
});

router.post('/profile', passport.authenticate('jwt', { session: false }), function(req, res) {
    console.log('jwt')
    res.json({ user: req.user });
});
router.post('/resetpassword', function(req, res) {
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:4200');
    const email = req.body.email;

    User.findByEmail(email, function(err, user) {
        if (err) throw err;
        if (!user) {
            res.json({ state: false, msg: "No User Found" });
            return false;
        }
        User.sendEmail(email, function(err, user) {

        })
    })
});

router.put('/updatepassword:email', function(req, res) {
    const password = req.body.password;
    User.createHash(password, function(err, hash) {
        if (err) throw err;
        if (!hash) {
            res.json({ state: false, msg: "No User Found" });
            return false;
        }
        User.findOneAndUpdate({email:req.params.email}, {
                $set: { password: hash }
            }, {
                new: true
            },
            function(err, updatedUser) {
                if (err) {
                    res.send('Error update video');
                } else {
                    res.json(updatedUser);
                }
            }
        )
    })

});

module.exports = router;