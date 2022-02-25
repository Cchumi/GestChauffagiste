var mongoose = require("mongoose");
var passport = require("passport");
var User = require("../models/user/user");
const { getToken, COOKIE_OPTIONS, verifyUser, getRefreshToken } = require("../authenticate")
const jwt = require("jsonwebtoken")
var autController = {};
function isLoggedIn(request, response, next) {
    // passport adds this to the request object
    if (request.isAuthenticated()) {
        return next();
    }
    response.redirect('/login');
}
// Restrict access to root page



// Go to registration page
autController.signup = (req, res, next) => {
    // Verify that first name is not empty
    console.log(req.body.username)
    if (!req.body.firstName) {
        res.statusCode = 500
        res.send({
            name: "FirstNameError",
            message: "The first name is required",
        })
    } else {
        User.register(
            new User({ email: req.body.email }),
            req.body.password,
            (err, user) => {
                if (err) {
                    console.log(err)
                    res.statusCode = 500
                    res.send(err)
                } else {
                    user.firstName = req.body.firstName
                    user.lastName = req.body.lastName || ""
                    user.email = req.body.email
                    user.username = req.body.username
                    const token = getToken({ _id: user._id })
                    const refreshToken = getRefreshToken({ _id: user._id })
                    user.refreshToken.push({ refreshToken })
                    user.save((err, user) => {
                        if (err) {
                            res.statusCode = 500
                            res.send(err)
                        } else {
                            res.cookie("refreshToken", refreshToken, COOKIE_OPTIONS)
                            res.send({ success: true, token })
                        }
                    })
                }
            }
        )
    }
};

// Post login
autController.login = (req, res, next) => {
    const token = getToken({ _id: req.user._id })
    const refreshToken = getRefreshToken({ _id: req.user._id })
    User.findById(req.user._id).populate("societe").then(
        user => {
            user.refreshToken.push({ refreshToken })
            user.online = true;
            user.save((err, user) => {
                if (err) {
                    res.statusCode = 500
                    res.send(err)
                } else {
                    res.cookie("refreshToken", refreshToken, COOKIE_OPTIONS)
                    res.send({ success: true, token })
                }
            })
        },
        err => {
            console.log(err);
            next(err)
        }
    )
};

autController.refreshToken = (req, res, next) => {
    const { signedCookies = {} } = req
    const { refreshToken } = signedCookies
    //console.log('refresh')
    //console.log(signedCookies)
    //console.log(refreshToken)
    if (refreshToken) {
        try {
            const payload = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET)
            const userId = payload._id
            //console.log(userId)
            User.findOne({ _id: userId }).populate("societe").then(
                user => {
                    if (user) {
                        // Find the refresh token against the user record in database
                        const tokenIndex = user.refreshToken.findIndex(
                            item => item.refreshToken === refreshToken
                        )

                        if (tokenIndex === -1) {
                            res.statusCode = 401
                            res.send("Unauthorized")
                        } else {
                            const token = getToken({ _id: userId })
                            // If the refresh token exists, then create new one and replace it.
                            const newRefreshToken = getRefreshToken({ _id: userId })
                            user.refreshToken[tokenIndex] = { refreshToken: newRefreshToken }
                            user.save((err, user) => {
                                if (err) {
                                    res.statusCode = 500
                                    res.send(err)
                                } else {
                                    res.cookie("refreshToken", newRefreshToken, COOKIE_OPTIONS)
                                    res.send({ success: true, token })
                                }
                            })
                        }
                    } else {
                        res.statusCode = 401
                        res.send("Unauthorized")
                    }
                },
                err => next(err)
            )
        } catch (err) {
            res.statusCode = 401
            res.send("Unauthorized")
        }
    } else {
        res.statusCode = 401
        res.send("Unauthorized")
    }
}

autController.me = (req, res, next) => {
    User.findById(req.user._id).populate("societe").then(
        user => {
            return res.status(200).json(user);
            //res.send(req.user)
        }
    ).catch(error => console.log(error));

}

autController.getAllUsers = (req, res, next) => {
    User.find()
        .populate("societe")
        .then(p => console.log(p))
        .catch(error => console.log(error));
    /*User.
        find().
        populate('societe').
        exec(function (err, allUsers) {
            if (err) return handleError(err);
            if (err) { return res.status(500).json({ error: err }); }
            if (!allUsers) { return res.sendStatus(404); }
            console.log(allUsers)
            return res.status(200).json(allUsers);
            //return res.status(200).json(user);
            // console.log('The author is %s', story.author.name);
            // prints "The author is Ian Fleming"
        });*/
    /* User.find({}, (err, allUsers) => {
         console.log(err);
         console.log(result)
         if (err) {
             res.json(err);
         } else {
             res.json(result);
         }
         if (err) { return res.status(500).json({ error: err }); }
         if (!allUsers) { return res.sendStatus(404); }
         return res.status(200).json(allUsers);
     })*/
    //.populate("category", "name -_id");
}

// Post registration

autController.error = function (req, res) {
    console.log('ERROR')
    res.send('ERROR');
};



// logout
autController.logout = (req, res, next) => {
    const { signedCookies = {} } = req
    const { refreshToken } = signedCookies
    console.log('logout');
    //console.log(req.user)
    User.findById(req.user._id).then(
        user => {
            console.log('logout')
            // console.log(user)
            const tokenIndex = user.refreshToken.findIndex(
                item => item.refreshToken === refreshToken
            )

            if (tokenIndex !== -1) {
                user.refreshToken.id(user.refreshToken[tokenIndex]._id).remove()
            }
            user.online = false
            user.save((err, user) => {
                if (err) {
                    res.statusCode = 500
                    res.send(err)
                } else {
                    res.clearCookie("refreshToken", COOKIE_OPTIONS)
                    res.send({ success: true })
                }
            })
        },
        err => next(err)
    )
}

module.exports = autController;