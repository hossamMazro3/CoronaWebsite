var express = require('express');
var router = express.Router();
var db = require('../config/db');
const bcrypt = require("bcryptjs");
var { check, validationResult } = require('express-validator');
const User = require("../models/User");
const { isNotAuthenticated } = require("../config/auth");


/* GET home page. */
router.get('/sign_up', isNotAuthenticated, function (req, res, next) {
    let massageError = req.flash('error');
    res.render('signPage', { message: massageError });
   
});

router.post('/sign_up', [
    check('username').not().isEmpty().withMessage('Please enter your username'),
    check('email').not().isEmpty().withMessage('Please enter your email'),
    check('email').isEmail().withMessage('Please enter valid email'),
    check('password').not().isEmpty().withMessage('Please enter your password'),
    check('v_password').custom((value, { req })=> {
        if(value !== req.body.password){
    throw new Error('password and confirm password not matched');
        }
        return true;
    })

], (req, res, next) => {
        const errors = validationResult(req);
        var validationMassages = [];
    if (!errors.isEmpty()) {
        console.log(errors);
        for (var i = 0; i < errors.errors.length; i++){
    validationMassages.push(errors.errors[i].msg);
}
req.flash('error', validationMassages);
res.redirect('sign_up');
        return;
        }
        const { email, password } = req.body;
        const Uname = req.body.username;
        //validationis ok
        // check if user is exist or not
         User.findOne({
            where: {
                email: email
            }
        })
            .then(user => {
                if (user) {
                    validationMassages.push("email was already used");
                    req.flash('error', validationMassages);
                    res.redirect('sign_up');
                } else {
                    //create user

                    const newUser = new User({
                        Uname,
                        email,
                        password
                    });
                    //hash the password
                    bcrypt.genSalt(10, (err, salt) => {
                        bcrypt.hash(password, salt, (err, hash) => {
                            if (err) throw err;
                            newUser.password = hash;
                            newUser
                                .save()
                                .then(user => {
                                    console.log("user created");
                                    res.redirect("login");
                                })
                                .catch(err => {
                                    console.log(err);
                                    req.flash("error", "There an error");
                                    res.redirect("sign_up");
                                }); //end new user
                        });
                    });
                }
            })
            .catch(err => {
                console.log(err);
            });
    
       
});


module.exports = router;