var express = require('express');
var router = express.Router();

/* GET medicine page. */
router.get('/medicine', function(req, res, next) {
    if (req.user) {
        res.render('medicine', {
            userName: req.user["userName"],
        });
    } else {
        res.render('medicine');
    }
});

module.exports = router;
