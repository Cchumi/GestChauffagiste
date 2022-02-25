var mongoose = require("mongoose");
var passport = require("passport");
var Societe = require("../models/societe/societe");
var User = require("../models/user/user");
const { getToken, COOKIE_OPTIONS, verifyUser, getRefreshToken } = require("../authenticate")
const jwt = require("jsonwebtoken")
var societeController = {};

// Restrict access to root page
societeController.createSociete = (req, res, next) => {
  return Societe.create(req.body).then(docSociete => {
    console.log("\n>> Created Category:\n", docSociete);
    return docSociete;
  });
};
societeController.getAll = (req, res, next) => {
  Societe.find({}, (err, result) => {
    console.log(err);
    console.log(result)
    if (err) {
      res.json(err);
    } else {
      res.json(result);
    }
  });
}
societeController.getUserById = (req, res, next) => {
  Societe.find({ _id: ObjectId(req.body.societeId) }, (err, result) => {
    console.log(err);
    console.log(result)
    if (err) {
      res.json(err);
    } else {
      res.json(result);
    }
  });
}

societeController.addUser = (req, res, next) => {
  // Verify that first name is not empty
  console.log(req.body.user.email)
  let addUserId = mongoose.Types.ObjectId();
  if (!req.body.user.firstName) {
    res.statusCode = 500
    res.send({
      name: "FirstNameError",
      message: "The first name is required",
    })
  } else {
    User.register(
      new User(/*{ email: req.body.user.email }*/ { ...req.body.user, _id: addUserId }),
      req.body.user.password,
      (err, user) => {
        if (err) {
          return res.status(500).json({ err: err });
        } //else {
        //console.log(user)
        //Object.assign(user, obj2); 
        //user = { ...user, ...req.body.user, _id: addUserId }
        //console.log(user)
        /*user.firstName = req.body.firstName
        user.lastName = req.body.lastName || ""
        user.email = req.body.email
        user.username = req.body.username*/
        //const token = getToken({ _id: addUserId })
        //const refreshToken = getRefreshToken({ _id: addUserId })
        //user.refreshToken.push({ refreshToken })
        user.save((err, user) => {
          if (err) {
            res.statusCode = 500
            res.send(err)
          } else {
            //console.log(user)
            //res.cookie("refreshToken", refreshToken, COOKIE_OPTIONS)
            Societe.findOneAndUpdate(
              { _id: req.body.societe._id },
              { $push: { users: addUserId } },
              function (error, success) {
                if (error) return res.status(500).json(error);
                console.log(success)
                return res.status(200).json(success);
              });
            //res.send({ success: true, token })
          }
        })
      }
      // }
    )
  }
};

societeController.addUserss = async (req, res, next) => {
  console.log(req.body);
  let userAdd = { ...req.body.user };
  let societeRef = { ...req.body.societe };
  let addUserId = mongoose.Types.ObjectId();
  userAdd._id = addUserId
  //const token = getToken({ _id: addUserId })
  const refreshToken = getRefreshToken({ _id: addUserId })
  userAdd.refreshToken = [];
  userAdd.refreshToken.push({ refreshToken })
  //console.log(req.body.user)
  //console.log(userAdd)
  User.create(userAdd, (err, user) => {

    console.log(err)
    if (err) return res.status(500).json(err);
    // console.log(user)
    //const token = getToken({ _id: addUserId })
    //const refreshToken = getRefreshToken({ _id: addUserId })
    //return res.status(200).json(allUsers);
    Societe.findOneAndUpdate(
      { _id: societeRef._id },
      { $push: { users: addUserId } },
      function (error, success) {
        if (error) return res.status(500).json(error);
        console.log(success)
        return res.status(200).json(success);
      });
  })
}
societeController.deleteUser = (req, res, next) => {
  //console.log(req.body);
  User.deleteOne({ _id: req.body._id }, (err, success) => {
    if (err) return res.status(500).json(err);
    console.log(success)
    //return res.status(200).json(allUsers);
    Societe.findOneAndUpdate(
      { _id: req.body.societe._id },
      { $pull: { users: req.body._id } },
      function (error, success) {
        if (error) return res.status(500).json(error);
        console.log(success)
        return res.status(200).json(success);
      });
  })

}
// { $pull: { cities: cityId }};

societeController.updateSociete = (req, res, next) => {
  //console.log(req.body);
  
    Societe.findOneAndUpdate(
      { _id: req.body._id },
      { ...req.body },
      function (error, success) {
        if (error) return res.status(500).json(error);
        console.log(success)
        return res.status(200).json(success);
      });


}


module.exports = societeController;