var mongoose = require("mongoose");
var passport = require("passport");
var User = require("../models/user/user");
const { getToken, COOKIE_OPTIONS, verifyUser, getRefreshToken } = require("../authenticate")
const jwt = require("jsonwebtoken")
var userController = {};

// Restrict access to root page

userController.getAllUsers = (req, res, next) => {
  User.
    find().
    populate('societe').
    exec(function (err, allUsers) {
      if (err) return res.status(500).json(err);
      return res.status(200).json(allUsers);
      // console.log('The author is %s', story.author.name);
      // prints "The author is Ian Fleming"
    });
  /* User.find({}, (err, result) => {
     console.log(err);
     console.log(result)
     if (err) {
       res.json(err);
     } else {
       res.json(result);
     }
   });*/
}
userController.getUserById = (req, res, next) => {
  console.log(req.body.id);
  User.
    findOne({ id: req.body.id }).
    populate('societe').
    exec(function (err, user) {
      if (err) return res.status(500).json(err);
      return res.status(200).json(user);
      // console.log('The author is %s', story.author.name);
      // prints "The author is Ian Fleming"
    });
  /*User.findById(req.body.id, function (err, user) {

    if (err) { return res.status(500).json({ error: err }); }
    if (!user) { return res.sendStatus(404); }*/
  //console.log(user)
  // Guys in some case below three-line does not work in that case you must comment these lines and uncomments the last three-line

  /*User.populate('societe', function (err, user) {
    return res.status(200).json(user);
  });*/

  // Course.populate({  path:"weeks", model:"Weeks" }, function(err, course){
  //   return res.status(200).json(course);
  // });


  /*User.findById(req.body.clientId, (err, result) => {
    console.log(err);
    console.log(result)
    if (err) {
      res.json(err);
    } else {
      res.json(result);
    }
  });*/
  //})

}



module.exports = userController;