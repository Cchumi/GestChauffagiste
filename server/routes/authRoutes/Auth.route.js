const express = require('express');
const router = express.Router();

const User = require('../../models/userModel');
var auth = require("../../controllers/AuthController.js");

// restrict index for logged in user only
router.get('/',auth.home);

router.get('/user', auth.user);
// route to register page
router.get('/register', auth.register);

// route for register action
router.post('/register', auth.doRegister);

// route to login page
router.get('/login', auth.login);

// route for login action
router.post('/login',  auth.doLogin);

// route for logout action
router.get('/logout', auth.logout);

/*router.post('/register',async(req,res) => {
  try {
   res.json({message:"This is the register route!"})
  }
  catch(err) {
   console.error(err.message)
  }
})

router.post('/login',async(req,res) => {
  try {
   res.json({message:"This is the login route!"})
  }
  catch(err) {
   console.error(err.message)
  }
})*/

module.exports = router