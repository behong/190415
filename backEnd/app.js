var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors = require('cors');

var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

// 개발 에서 2개 서버 동시 사용 가능...
app.use(cors())

// https://youtu.be/uYsIADfSMNk?list=PLjpTKic1SLZu43cFS3YQIKoD2vObq-DVx 
// express 라우터 강좌 youtube
app.use('/api/', require('./routes/api'))
app.use(express.static(path.join(__dirname, '../', 'front','dist')));

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
  res.send({msg: err.message});
});

module.exports = app;
