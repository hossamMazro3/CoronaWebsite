module.exports = {
  isAuthenticated: function(req, res, next) {
    if (req.isAuthenticated()) {
      return next();
    }

    req.flash("error", " you dont have permission to access this page");
    res.redirect("login");
    },
    isNotAuthenticated: function (req, res, next) {
        if (req.isAuthenticated()) {
            res.redirect("/");
            return;
        }
        next();
    }
};