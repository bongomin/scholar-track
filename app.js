var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var hbs = require('express-handlebars');
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var homeRoute = require('./routes/home')
var studentsRoute = require('./routes/Students')
var ParentsRoute = require('./routes/Parents')
var mongoose = require('mongoose');
var passport = require('passport')
var bodyParser = require('body-parser')
var methodOverride = require('method-override');
var flash = require('connect-flash');
var session = require('express-session');
var { ensureAuthenticated } = require('./helpers/auth')



var app = express();

// passport Load
require('./config/passport')(passport);

// DB config 
var db = require('./config/database');
// handlebars Helpers
const { select, formatDate } = require('./helpers/hbs_helpers')
// map global promisies / get reed of worning
mongoose.Promise = global.Promise;
mongoose.connect(db.mongoURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
  .then(() => console.log('MongoDB Connected...'))
  .catch(err => console.log(err));


// body-parser middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
// method overide middleware
app.use(methodOverride('_method'));

// express session middleware
app.use(session({
  secret: 'secret',
  resave: true,
  saveUninitialized: true
}));

//passport middleware//serializers / sessions middlware
app.use(passport.initialize());
app.use(passport.session());

// flash middlware
app.use(flash());


// global variable middleware

// Global Variables for flash Messages
app.use(function (req, res, next) {
  res.locals.success_msg = req.flash('success_msg');
  res.locals.error_msg = req.flash('error_msg');
  res.locals.error = req.flash('error');
  res.locals.user = req.user || null;
  next();
})



// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');



// template engine static file locater
app.engine('hbs', hbs({
  helpers: {
    formatDate: formatDate,
    select: select,


  },
  extname: 'hbs',
  defaultLayout: 'layout',
  layoutsDir: path.join(__dirname, 'views'),
  partialDir: [
    path.join(__dirname, 'views/partials')
  ]
}));

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


app.get('/about', (req, res) => {
  res.render('about')
})


app.get('/contact', (req, res) => {
  res.render('contact')
})
app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/', homeRoute);
app.use('/student', studentsRoute);
app.use('/Parents', ParentsRoute)






// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
