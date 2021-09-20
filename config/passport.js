const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
var db = require('../config/db');
const bcrypt = require("bcryptjs");
var { check, validationResult } = require('express-validator');
const User = require("../models/User");

passport.use('local-login',
  new LocalStrategy(
    {
          usernameField: "email",
          passwordField: "password",
          passReqToCallback: true,
    },
    (req,email, password, done) => {
      User.findOne({
        where: {
          email: email
        }
      })
        .then(user => {
          if (!user) {
            console.log("user not found");
              return done(null, false, req.flash('error', 'User was not found'));
          } else {
            console.log("user  found");
            bcrypt.compare(password, user.password, (err, validPassword) => {
              if (err) throw err;
              if (validPassword) {
                console.log("correct password");
                return done(null, user);
              } else {
                console.log("incorrect password");
                  return done(null, false, req.flash('error', 'wrong password'));
              }
            });
          }
        })
        .catch(err => {
          return done(null, false, {
            message: err
          });
        });
    }
  )
);

passport.serializeUser(function(user, done) {
  console.log(" serl started");
  done(null, user.id);
});

passport.deserializeUser(function(id, done) {
    User.findOne({
        where: {
            id: id
        }
    })
        .then(user => {
            done(null, { id: user.dataValues.id, email: user.dataValues.email, userName: user.dataValues.Uname });
    })
    .catch(err => console.log(err));
});
