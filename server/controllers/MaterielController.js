var mongoose = require("mongoose");
var passport = require("passport");
var User = require("../models/mater/user");
const { getToken, COOKIE_OPTIONS, verifyUser, getRefreshToken } = require("../authenticate")
const jwt = require("jsonwebtoken")
var materielController = {};

// Restrict access to root page

materielController.getAllUsers = (req, res, next) => {
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
materielController.getUserById = (req, res, next) => {
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



module.exports = materielController;