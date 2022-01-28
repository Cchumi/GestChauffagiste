const router = require('express').Router();
const userRoutes = require('./userRoutes');

router.use("/", userRoutes);

router.get("/",function (req, res) {
        res.json({test: "subroutes work"})
    });

module.exports = router;