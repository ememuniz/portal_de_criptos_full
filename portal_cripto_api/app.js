var createError = require('http-errors');
const express = require('express');
var path = require('path');
var logger = require('morgan');
require('./config/database');
const cors = require('cors');


var usersRouter = require('./app/routes/users');
var criptoRouter = require('./app/routes/cripto');
var alertRouter = require('./app/routes/alerts');

const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(cors());

app.use(cors({
  origin: 'http://localhost:3001',
}))

app.use('/users', usersRouter);
app.use('/criptos', criptoRouter);
app.use('/alerts', alertRouter);


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

module.exports = app;
