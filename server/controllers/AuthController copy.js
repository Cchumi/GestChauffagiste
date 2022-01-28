var mongoose = require("mongoose");
var passport = require("passport");
var User = require("../models/userModel");

var userController = {};
function isLoggedIn(request, response, next) {
    // passport adds this to the request object
    if (request.isAuthenticated()) {
        return next();
    }
    response.redirect('/login');
}
// Restrict access to root page
userController.home = function (req, res) {
    //console.log(req)
    console.log(req.user)
    console.log(req.session)
    //console.log(req.session.passport.user)
    /* if (req.isAuthenticated()) {
         return next();s
     }
     res.redirect('/login');*/
    //res.send('index', { user: req.user });
};

// Restrict access to root page
userController.getCurrentUserq = function (req, res) {
    console.log(req.isAuthenticated())
    if (req.session) {
        console.log('isAuthenticated')
    }
    else {
        console.log('isUnauthenticated');
        return res.status(403).json({ message: 'you are not logged in' })
    }
    /*if (req.user) {
        res.json(req.user);
    }*/
    /*if (req.user) {
        console.log(req.user)

    } else {
        return res.status(403).json({ message: 'you are not logged in' })
    }*/
};
// Go to registration page
userController.register = function (req, res) {
    res.send('register');
};
userController.user = (req, res) => {
    console.log(req.user)
    res.send(req.user);
  };

// Post registration

userController.doRegister = function (req, res) {
    var Users=new User({email: req.body.email, username : req.body.username});
  
    User.register(Users, req.body.password, function(err, user) {
      if (err) {
        res.json({success:false, message:"Your account could not be saved. Error: ", err}) 
      }else{
        res.json({success: true, message: "Your account has been saved"})
      }
    });
}
userController.doRegisters = function (req, res) {
    console.log(req.body)
    var newUser = new User({
        username: req.body.username,
        email: req.body.email,
        name: req.body.name
    });
    User.register(newUser, req.body.password, function (err, user) {
        if (err) {
            console.log("error")
            console.log(err)
            console.log({ user: user })
            return res.send(user)
            //return res.status('register').send({ user: user })
            //res.send('register', { user: user });
        }

        passport.authenticate('local')(req, res, function () {
            res.redirect('/');
        });
    });
};

userController.error = function (req, res) {
    console.log('ERROR')
    res.send('ERROR');
};

// Go to login page
userController.login = function (req, res) {
    console.log('get login')
    res.send('login');
};

// Post login


userController.doLogin = function (req, res, next) {

    passport.authenticate('local'
    ,   
    {   successRedirect: '/',
        failureRedirect: '/error'
    }
    ,
    //this will be called if authenticate was successful
    (err, user, info) => {
        if(req.body.isSignUp){

            if(err){
                return res.status(400).json({errors:err});
            }
            if(!user){

                return res.status(400).json({errors:info});
            }
            else{   

                return res.status(200).json({success: `created ${user.username}`});
            }
        }
        else{
            if(err){
                return res.status(400).json({errors:err});
            }
            if(!user){
                return res.status(400).json({errors:info});
            }
            else{
                console.log(user.id);
                req.login(user, (err)=>{
                    if(err){
                        throw err;
                    }
                });
                return res.status(200).json({success:`Welcome back ${user.username}`, user: user});
            }
        }
    })(req,res,next)
}

userController.doLoginpp = function (req, res, next) {
    console.log('routes/user.js, login, req.body: ');
    console.log(req.body)
    passport.authenticate('local', {
        successRedirect: '/', // redirect to the secure profile section
        failureRedirect: '/signup', // redirect back to the signup page if there is an error
        failureFlash: true // allow flash messages
    }, (err, passportUser, info) => {
        if (err) {
            return next(err);
        }

        if (passportUser) {
            const user = passportUser;
            // console.log(user)
            //user.token = passportUser.generateJWT();
            req.login(user, function (error) {
                if (error) return next(error);
                console.log("Request Login supossedly successful.");
                //res.redirect("/")
                return res.status(200).send({ user: user });
                //return res.redirect("/");
            });
            /*req.session.save((err) => {
                if (err) {
                    return next(err);
                }
                else {
                    return res.status(200).send({ user: user });
                }

                //res.status(200).send('OK');
                //return res.json({ user: user });
            });*/

        }
        else {
            return res.status(400).send(info);
        }
    })(req, res, next);
    /* passport.authenticate('local'), (req, res) => {
         console.log('logged in', req.user);
         var userInfo = {
             username: req.user.username
         };
         res.send(userInfo);
         res.redirect('/');
     }*/
}



userController.doLoginb = function (req, res, next) {
    const { body: { user } } = req;
    //console.log(req.session)
    //console.log(req.user)
    //console.log(req.body.email)
    if (!req.body.email) {
        return res.status(422).json({
            errors: {
                email: 'is required',
            },
        });
    }

    if (!req.body.password) {
        return res.status(422).json({
            errors: {
                password: 'is required',
            },
        });
    }

    return passport.authenticate('local', {
        session: true, successRedirect: "/secret",
        failureRedirect: "/login"
    }, (err, passportUser, info) => {
        if (err) {
            return next(err);
        }

        if (passportUser) {
            const user = passportUser;
            // console.log(user)
            //user.token = passportUser.generateJWT();
            req.login(user, function (error) {
                if (error) return next(error);
                console.log("Request Login supossedly successful.");
                //res.redirect("/")
                return res.status(200).send({ user: user });
                //return res.redirect("/");
            });
            /*req.session.save((err) => {
                if (err) {
                    return next(err);
                }
                else {
                    return res.status(200).send({ user: user });
                }

                //res.status(200).send('OK');
                //return res.json({ user: user });
            });*/

        }
        else {
            return res.status(400).send(info);
        }


    })(req, res, next);
};


userController.doLogins = function (req, res, next) {
    console.log('here doLogin')
    console.log(req.body)
    const { body: { user } } = req;
    console.log('here doLogin')
    if (!user.email) {
        return res.status(422).json({
            errors: {
                email: 'is required',
            },
        });
    }

    if (!user.password) {
        return res.status(422).json({
            errors: {
                password: 'is required',
            },
        });
    }
    passport.authenticate('local', { failureRedirect: '/?error=LoginError', failureFlash: true }), function (err, user, info) {
        console.log(info)
        console.log(err)
        console.log(user)
        console.log('/login handler');

        if (err) { return next(err); }
        // Redirect if it fails
        console.log('test')
        if (!user) {
            console.log('no user');

            return res.status(200).send('OK');
            //res.redirect('/api/auth/login');
        }

    }
        // )
        (req, res, next);

    /*passport.authenticate('login')(req, res, function () {
        console.log(req);
        //console.log(res);
        res.send('ok logged');
      //res.redirect('/Dashboard');
    });
    passport.authenticate('login', {failureFlash: 'Invalid username or password'})*/
    console.log('end doLogin')
};


/*userController.doLogin = function (req, res) {
console.log(req.body)
    if (!req.body.username) {

        res.json({ success: false, message: "Username was not given" })

    } else {

        if (!req.body.password) {

            res.json({ success: false, message: "Password was not given" })

        } else {

            passport.authenticate('local', function (err, user, info) {

                if (err) {

                    res.json({ success: false, message: err })

                } else {

                    if (!user) {

                        res.json({ success: false, message: 'username or password incorrect' })

                    } else {

                        req.login(user, function (err) {

                            if (err) {

                                res.json({ success: false, message: err })

                            } else {

                                const token = jwt.sign({
                                    userId: user._id,

                                    username: user.username
                                }, secretkey,

                                    { expiresIn: '24h' })

                                res.json({
                                    success: true, message: "Authentication successful", token: token
                                });

                            }

                        })

                    }

                }

            })(req, res);

        }

    }

};*/


// logout
userController.logout = async function (req, res) {
    if (req.user) {
        req.logout()
        res.send({ msg: 'logging out' })
    } else {
        res.send({ msg: 'no user to log out' })
    };
};

module.exports = userController;