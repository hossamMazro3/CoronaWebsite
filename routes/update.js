var express = require('express');
var router = express.Router();
var db = require('../config/db');
const bcrypt = require("bcryptjs");
var { check, validationResult } = require('express-validator');
const User = require("../models/User");
const { isNotAuthenticated, isAuthenticated } = require("../config/auth");


/* GET update page. */
router.get('/update', isAuthenticated, function (req, res, next) {
    if (req.user) {
        let massageError = req.flash('error');
        res.render('update', {
            message: massageError,
            id: req.user["id"],
            userName: req.user["userName"],
            email: req.user["email"],
        });
    } else {
        res.render('login');
    }
});

router.post('/update', [
    check('username').not().isEmpty().withMessage('Please enter your username'),
    check('email').not().isEmpty().withMessage('Please enter your email'),
    check('email').isEmail().withMessage('Please enter valid email'),
    check('password').not().isEmpty().withMessage('Please enter your password'),
    check('v_password').custom((value, { req }) => {
        if (value !== req.body.password) {
            throw new Error('password and confirm password not matched');
        }
        return true;
    })

], (req, res, next) => {
    const errors = validationResult(req);
    var validationMassages = [];
    if (!errors.isEmpty()) {
        console.log(errors);
        for (var i = 0; i < errors.errors.length; i++) {
            validationMassages.push(errors.errors[i].msg);
        }
        req.flash('error', validationMassages);
        res.redirect('update');
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
                validationMassages.push("email was already exist");
                req.flash('error', validationMassages);
                res.redirect('update');
            } else {
                bcrypt.hash(password, 10)
                    .then(hash => {
                        const newuser = {
                            email: email,
                            Uname: Uname,
                            password: hash
                        };
                        User.update(newuser, {
                            where: { id: req.query.id }
                        })
                            .then(num => {
                                if (num == 1) {
                                    res.redirect('profile')
                                } else {
                                    validationMassages.push("Cannot update user");
                                    req.flash('error', validationMassages);
                                    res.redirect('update');
                                }
                            })
                            .catch(err => {
                                validationMassages.push("Error updating user with id =" + id);
                                req.flash('error', validationMassages);
                                res.redirect('update');
                            });
                    }).catch(err => {
                        validationMassages.push('error was found');
                        req.flash('error', validationMassages);
                        res.redirect('update');
                    });

            }
        })
        .catch(err => {
            validationMassages.push('error was found');
            req.flash('error', validationMassages);
            res.redirect('update');
        });
});


module.exports = router;