const express = require("express")
const router = express.Router()
const User = require("../../models/user/user")
const passport = require("passport")
var auth = require("../../controllers/AuthController");
var user = require("../../controllers/UserController");

const { getToken, COOKIE_OPTIONS, verifyUser, getRefreshToken } = require("../../authenticate")

router.post("/signup", auth.signup)

router.post("/login", passport.authenticate("local"), auth.login)

router.post("/refreshToken", auth.refreshToken)


router.get("/me", verifyUser, auth.me)

// ...
router.get("/logout", verifyUser, auth.logout)

router.get("/getall", user.getAllUsers)
router.get("/getuserbyid", user.getUserById)

module.exports = router