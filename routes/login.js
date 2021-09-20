var express = require('express');
var router = express.Router();
var db = require('../config/db');
const bcrypt = require("bcryptjs");
var { check, validationResult } = require('express-validator');
const User = require("../models/User");
const passport = require('passport');
const { isNotAuthenticated, isAuthenticated} = require("../config/auth");


/* GET home page. */
router.get('/login',isNotAuthenticated,function (req, res, next) {
    var massageError = req.flash('error');
    res.render("loginPage", { message: massageError });
});

router.post('/login', [
    check('email').not().isEmpty().withMessage('*Please enter your email'),
    check('email').isEmail().withMessage('*Please enter valid email'),
    check('password').not().isEmpty().withMessage('*Please enter your password')
    
], (req, res, next) => {
        const errors = validationResult(req);
        var validationMassages = [];
        if (!errors.isEmpty()) {
            console.log(errors);
            for (var i = 0; i < errors.errors.length; i++) {
                validationMassages.push(errors.errors[i].msg);
            }
            req.flash('error', validationMassages);
            res.redirect('login');
            return;
        }
    next();
}, passport.authenticate('local-login', {
    successRedirect: 'dashboard',
    failureRedirect: 'login',
    failureFlash: true,
})
      
           
       
);

/* GET profile page. */
router.get('/profile', isAuthenticated, function (req, res, next) {
    if (req.user) {
        res.render('profile', {
            userName: req.user["userName"],
            email: req.user["email"],
            id: req.user["id"]
        });
    } else {
        res.render('login');
        }
});

/* GET logout. */
router.get('/logout',function (req, res, next) {
    req.logOut();
    res.redirect('/')
});


module.exports = router;