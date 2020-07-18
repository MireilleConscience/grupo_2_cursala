var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const methodOverride = require('method-override');
const session = require('express-session');

var authRouter = require('./routes/auth');
var usersRouter = require('./routes/users');
var productsRouter = require('./routes/products');
var categorysRouter = require('./routes/categorys');

const sessionMdw = require('./middlewares/session');
const rememberMdw = require('./middlewares/remember');
var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');


app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, '/../public')));
app.use(methodOverride('_method'));

app.use(session({
  secret: 'Cursala MC DH',
  resave : false,
  saveUninitialized : false}));
app.use(sessionMdw);
app.use(rememberMdw);

app.use('/', productsRouter);
app.use('/users', authRouter);
app.use('/users',usersRouter);
app.use('/products', productsRouter);
app.use('/categorias', categorysRouter);

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
  res.render('error2');
});

module.exports = app;
