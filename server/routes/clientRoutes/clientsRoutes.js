const express = require("express")
const router = express.Router()
const Client = require("../../models/client/client")
const passport = require("passport")
var clientController = require("../../controllers/ClientController.js");


//const { getToken, COOKIE_OPTIONS, verifyUser, getRefreshToken } = require("../../authenticate")

//router.post("/signup", ClientController.signup)

//router.post("/login", passport.authenticate("local"), ClientController.login)

//router.post("/refreshToken", ClientController.refreshToken)


//router.get("/me", verifyUser, ClientController.me)

// ...
//router.get("/logout", verifyUser, ClientController.logout)

router.get("/getall", clientController.getAllClients)
router.post("/getclientbyid", clientController.getClientById);
router.post("/getmaterielbyclientid", clientController.getMaterielbyClientId);

router.post("/add", clientController.addClient)

module.exports = router