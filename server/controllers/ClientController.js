var mongoose = require("mongoose");
var passport = require("passport");
var Client = require("../models/client/client");
const { getToken, COOKIE_OPTIONS, verifyUser, getRefreshToken } = require("../authenticate")
const jwt = require("jsonwebtoken")
var clientController = {};
//var ObjectId = mongoose.ObjectId;

// Restrict access to root page

clientController.getAllClients = (req, res, next) => {
    Client.find({}, (err, result) => {
        console.log(err);
        console.log(result)
        if (err) {
            res.json(err);
        } else {
            res.json(result);
        }
    });
}
clientController.getClientById = (req, res, next) => {
    console.log(req.body)

     Client.findOne({ _id: mongoose.Types.ObjectId(req.body.clientId) }, (err, result) => {
         console.log(err);
         console.log(result)
         if (err) {
             res.json(err);
         } else {
             res.json(result);
         }
     });
}

clientController.getMaterielbyClientId = (req, res, next) => {
    console.log(req.body)
    Client.findOne({ _id: mongoose.Types.ObjectId(req.body.clientId) }).populate("materiel").exec(function (err, user) {
        if (err) {
            console.log(err);
            res.json(err);
        } else {
            //console.log(user);    // a user with populated posts
            //userArray.push(user);
            console.log(userArray);  //stores user but posts is not populated
            res.json(result);
        }
    });
}

clientController.addClient = (req, res, next) => {
    console.log(req.body)
    Client.findOne({ firstName: req.body.firstName, lastName: req.body.lastName }, (err, client) => {
        console.log(err);
        console.log(client)
        if (err) console.log(err);
        if (client) {
            console.log("This has already been saved");
        } else {

            var newClient = new Client(req.body);
            newClient.save(function (err, client) {
                if (err) console.log(err);
                console.log("New client created");
                res.status(200).json(client);
            });
        }
    });
    /*var newClient = new Client(data);
    newClient.save(function (err) {
        if (err) return handleError(err);
        // saved!
    })*/

}




module.exports = clientController;