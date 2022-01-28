var mongoose = require("mongoose");
var passport = require("passport");
var User = require("../models/user/user");
const { getToken, COOKIE_OPTIONS, verifyUser, getRefreshToken } = require("../authenticate")
const jwt = require("jsonwebtoken")
var userController = {};

// Restrict access to root page

userController.getAllUsers = (req, res, next) => {
  User.find({}, (err, result) => {
    console.log(err);
    console.log(result)
    if (err) {
      res.json(err);
    } else {
      res.json(result);
    }
  });
}
userController.getUserById = (req, res, next) => {
  User.find({ _id: ObjectId(req.body.clientId) }, (err, result) => {
    console.log(err);
    console.log(result)
    if (err) {
      res.json(err);
    } else {
      res.json(result);
    }
  });
}



module.exports = userController;