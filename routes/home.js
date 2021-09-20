var express = require('express');
var router = express.Router();
const { isAuthenticated } = require("../config/auth");
/* GET home page. */

router.get('/', function (req, res, next) {
    if (req.user) {
        res.render('homePage', {
            userName: req.user["userName"],
        });
    } else {
        res.render('homePage');
    }
});

// dashboard page
router.get("/dashboard", isAuthenticated, (req, res) => {
    if (req.user) {
        res.render('dashboard', {
            userName: req.user["userName"],
        });
    }
});

module.exports = router;
