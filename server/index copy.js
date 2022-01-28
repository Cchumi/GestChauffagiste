const express = require("express");
const app = express();
const mongoose = require("mongoose");
const User = require("./models/userModel");
const passport = require('passport');
const path = require('path');
const cors = require("cors");
const session = require('express-session');
const passportLocal = require('./config/passport-local-strategy');
const MongoStore = require("connect-mongo");
const cookieParser = require("cookie-parser");
const dotenv = require("dotenv")
dotenv.config();
console.log(process.env.SESSION_SECRET)
//const userRouter = require('./routes/userRoutes.js');
const routes = require("./routes");
const LocalStrategy = require('passport-local').Strategy;
const mongodburl = process.env.MONGODB_URL
//app.use(express.cookieParser());
//app.use(express.bodyParser());
app.use(cors({
    origin: "http://localhost:3000", // allow to server to accept request from different origin
   // methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    credentials: true, // allow session cookie from browser to pass through
}));

/*app.use((req, res, next) => {
    res.locals.isAuthenticated = req.isAuthenticated()
    next()
})*/
// set the view engine to ejs
app.set('view engine', 'ejs');
app.use(express.json());
app.use(express.urlencoded({ extended: true })); // express body-parser
app.use(cookieParser(process.env.SESSION_SECRET));
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    //cookie: { maxAge: 60 * 60 * 1000, secure: true }, // 1 hour
    cookie: { secure: true },
    //store: MongoStore.create({ mongoUrl: mongodburl })
    store: MongoStore.create(
        {
            mongoUrl: mongodburl,
            //autoRemove: 'disabled'
        },
        function (err) {
            console.log(err || 'connect-mongodb setup ok');
        }
    )
}))





const port = process.env.PORT || 5000;


mongoose.connect(
    mongodburl, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => console.log('connected to DB!'))
    .catch(error => console.log(error))
mongoose.set('debug', true);
// use static authenticate method of model in LocalStrategy
passport.use(User.createStrategy());
//passport.use(new LocalStrategy(User.authenticate()));

// use static serialize and deserialize of model for passport session support
//passport.serializeUser(User.serializeUser());
//passport.deserializeUser(User.deserializeUser());
passport.serializeUser((user, done) => {
    done(null, user._id);
});

passport.deserializeUser((_id, done) => {
  User.findById( _id, (err, user) => {
    if(err){
        done(null, false, {error:err});
    } else {
        done(null, user);
    }
  });
});
app.use(routes);
//const AuthRoute = require('./routes/authRoutes/Auth.route');
//app.use('/api/auth', AuthRoute);

app.use(passport.initialize());
app.use(passport.session());
/*app.get("/getUsers", (req, res) => {
    User.find({}, (err, result) => {
        if (err) {
            res.json(err);
        } else {
            res.json(result);
        }
    });
});

app.post("/createUser", async (req, res) => {
    const user = req.body;
    const newUser = new UserModel(user);
    await newUser.save();

    res.json(user);
});
*/
app.listen(port, () => {
    console.log("SERVER RUNS PERFECTLY! on port " + port);
});