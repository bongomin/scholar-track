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
var mongoose = require('mongoose');
var bodyParser = require('body-parser')
var methodOverride = require('method-override');

var app = express();

///connect to db mongoose
// mapping global promlsise-getting rid of warning
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/track-scholar', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
  .then(() => {
    console.log('mongodb connected')
  })
  .catch(err => console.log(err));

// body-parser middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
// method overide middleware
app.use(methodOverride('_method'));



// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');



// template engine static file locater
app.engine('hbs', hbs({
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
