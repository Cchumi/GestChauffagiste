const router = require('express').Router();
const authRoutes = require('./Auth.route');

router.use("/", authRoutes);

router.get("/",function (req, res) {
        res.json({test: "subroutes work"})
    });

module.exports = router;