var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors = require('cors');

var indexRouter = require('./routes/index');
var accountRouter = require('./routes/account');
var tripRouter = require('./routes/trip');
var destinationRouter = require('./routes/destination');
var itemRouter = require('./routes/item');
var expenseRouter = require('./routes/expense');

var app = express();

app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, '..', 'build')));

app.use('/', indexRouter);
app.use('/account', accountRouter);
app.use('/trip', tripRouter);
app.use('/destination', destinationRouter);
app.use('/item', itemRouter);
app.use('/expense', expenseRouter);
app.get('/*', (req, res) => {
  res.sendFile(path.join(__dirname, '..', '/build/index.html'));
})

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
