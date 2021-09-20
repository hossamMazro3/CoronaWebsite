var express = require('express');
var router = express.Router();

/* GET doctors page. */
router.get('/doctors', function (req, res, next) {
    if (req.user) {
        res.render('doctors', {
            userName: req.user["userName"],
        });
    } else {
        res.render('doctors');
    }
});


module.exports = router;
