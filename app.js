var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var hbs = require('express-handlebars');
var session = require('express-session');
var MongoStore = require('connect-mongo')(session);
var mongoose = require('mongoose');
var bodyParser = require('body-parser')
var methodOverride = require('method-override');
var flash = require('connect-flash');
var { ensureAuthenticated } = require('./helpers/auth')
var multer = require('multer');
var User = require('./models/Users')





var app = express();

var passport = require('passport')

// calling routes
var usersRouter = require('./routes/users');
var studentsRoute = require('./routes/Students')
var ParentsRoute = require('./routes/Parents')
var feedBackRouter = require('./routes/feedbacks');
var homeVisitsRouter = require('./routes/homevisits');
var contactRouter = require('./routes/contact');
var studentProfile = require('./routes/student_profile');
var medicalRouter = require('./routes/medical');




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

// file Storage //cb is callback
const fileStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'images')
  },
  filename: (req, file, cb) => {
    cb(null, new Date().toString() + '_' + file.originalname);
  }
})

const filefilter = (req, file, cb) => {
  if (file.mimetype === 'image/png' ||
    file.mimetype === 'image/jpeg' ||
    file.mimetype === 'image/jpg' ||
    file.mimetype === 'image/pdf') {
    cb(null, true)
  } else {
    cb(null, false)

  }

}


// body-parser middleware
app.use(bodyParser.urlencoded({ extended: false }));
// multer middleware for hanndling files // it is creating an image folder called images where it stores images
app.use(multer({ storage: fileStorage }).single('passport_img'))
app.use(bodyParser.json());
// method overide middleware
app.use(methodOverride('_method'));

// express session middleware
app.use(session({
  secret: 'secret',
  resave: false,
  saveUninitialized: true,
  store: new MongoStore({ mongooseConnection: mongoose.connection })
}));


// flash middlware
app.use(flash());


//passport middleware//serializers / sessions middlware
app.use(passport.initialize());
app.use(passport.session());


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
// serving images folder
app.use('/images', express.static(path.join(__dirname, 'images')));


// index page first page
app.get('/', (req, res) => {
  res.render('index');
})

app.get('/main', (req, res) => {
  res.render('main');
})


// about page
app.get('/about', (req, res) => {
  res.render('about')
})

// contact page
app.get('/contact', (req, res) => {
  res.render('contact')
})

// calling routes
app.use('/users', usersRouter);
app.use('/student', studentsRoute);
app.use('/Parents', ParentsRoute);
app.use('/feedback', feedBackRouter);
app.use('/homevisit', homeVisitsRouter);
app.use('/contact', contactRouter);
app.use('/medical', medicalRouter);
app.use('/profile', studentProfile);







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
