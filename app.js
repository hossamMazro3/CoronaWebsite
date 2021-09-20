var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var session = require('express-session');
var flash = require('connect-flash');
const passport = require("passport");
var logger = require('morgan');
const bodyParser = require("body-parser");
var app = express();

//middelware

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(session({
    secret: 'covid-19_?@!',
    saveUninitialized: false,
    resave: true,
}));
// incude passpor
require("./config/passport");
// add passport
app.use(passport.initialize());
app.use(passport.session());
//configure passport
app.use(flash());
app.use(express.static(path.join(__dirname, 'public')));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');





var homeRouter = require('./routes/home');
var signRouter = require('./routes/sign');
var loginRouter = require('./routes/login');
var protectionRouter = require('./routes/protection');
var medicineRouter = require('./routes/medicine');
var doctorsRouter = require('./routes/doctors');
var updateRouter = require('./routes/update');


app.use('/', homeRouter);

app.use('/', signRouter);

app.use('/', loginRouter);

app.use('/', protectionRouter);

app.use('/', medicineRouter);

app.use('/', doctorsRouter);

app.use('/', updateRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

///module.exports = app;
var server = app.listen(3000, '127.0.0.1', function () {
    var host = server.address().address;
    var port = server.address().port;

    console.log("Example app listening at http://%s:%s", host, port)
})

