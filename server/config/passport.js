// config/passport

const passport = require('passport');
const User = require('../models/userModel');

// We create the local strategy
passport.use(User.createStrategy());

// We serialize and deserialize the User
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());