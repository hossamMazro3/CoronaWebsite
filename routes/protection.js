var express = require('express');
var router = express.Router();

/* GET protection page. */
router.get('/protection', function(req, res, next) {
    if (req.user) {
        res.render('protection', {
            userName: req.user["userName"],
        });
    } else {
        res.render('protection');
    }
});

module.exports = router;
