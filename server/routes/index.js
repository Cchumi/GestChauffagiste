// Dependency List
const path = require('path');
const router = require('express').Router();

// Subroutes 
const authRoutes = require('./authRoutes');
//const userRoutes = require('./userRoutes');
router.use("/api/auth", authRoutes);
//router.use("/user", userRoutes);

router.use(function (req, res) {
    res.sendFile(path.join(__dirname, "../../client/public/index.html"));
});

module.exports = router;