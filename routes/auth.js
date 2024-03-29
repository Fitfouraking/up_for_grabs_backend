var express = require('express');
var router = express.Router();
var User = require('../models/user.js');
var async = require('async');
var passport = require('passport');

var isAuthenticated = function(req, res, next) {
  // if user is authenticated in the session, call the next() to call the next request handler
  // Passport adds this method to request object. A middleware is allowed to add properties to
  // request and response objects
  if (req.isAuthenticated())
    return next();
  // if the user is not authenticated then redirect him to the login page
  res.status(401);
  res.end();
}

module.exports = function(passport) {

  /* GET login page. */
  router.get('/', function(req, res) {
   res.status(200);
   res.end();
  });

   /* Handle Login POST */
  router.post('/login', passport.authenticate('login'), function(req, res) {
    res.status(200);
    console.log("User afrter login is " + req.user);
    res.json({id: req.user._id, email: req.user.email, username: req.user.username});
  });

  /* Handle Registration POST */
  router.post('/signup', passport.authenticate('signup'), function(req, res) {
    res.status(200);
    res.end();
  });


  // /* GET Profile Page */
  // router.get('/user', isAuthenticated, function(req, res) {
  //   res.send(req.user);
  // });

  /* Handle Logout */
  router.get('/signout', function(req, res) {
    req.logout();
    res.status(202);
    res.end();
  });


  // /* GET Patch User Page */
  // router.get('/patch/user', isAuthenticated, function(req, res) {
  //   res.render('patchUser', {
  //     user: req.user,
  //     // message: req.flash('message')
  //   });
  // });

  // /* PATCH user */
  // router.post('/patch/user', isAuthenticated, function(req, res) {
  //   User.findOneAndUpdate({
  //     username: req.user.username
  //   }, req.body, function(err, user) {
  //     if (err) {
  //       console.log(err);
  //       res.status(404);
  //       res.end();
  //     } else {
  //       res.redirect('/auth/patch/user');
  //     }
  //   });
  // });


  return router;
}



 // var user =  new User();
 //    user.username = req.body.email;
 //    user.password = req.body.password;
 //    user.lastname = req.body.lastname;
 //    user.firstname = req.body.firstname;
 //    user.email = req.body.email;
