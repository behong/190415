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


const mongoose =  require('mongoose')

const User = require('./models/users')

mongoose.connect('mongodb://localhost:27017/jisou',{ useNewUrlParser: true }, (err) =>{
  
  if(err) return console.log(err)
  console.log('몽고 디비 접속 성공')
  
  // INSERT C
  // User.create({name:'홍홍'})
  // .then( r => console.log(r))
  // .catch(e => console.log(e))
  // SELECT R
  //  User.find()
  //     .then( r => console.log(r))
  //     .catch(e => console.log(e))
  // UPDATE U
  // User.updateOne({},{$set:{age : 33 }})
  // .then( r => {
  //   console.log(r)
  //   console.log('업데이트 성공')
  //   // 업데이트 된 결과 다시 then으로 받으셔~
  //   return User.find()
  // })
  // .then(r => console.log(r) )// 업데이트 된 것 find ...
  // .catch(e => console.log(e))
  // DELETE D
  // User.deleteOne({name:'홍홍'})
  //     .then( r => console.log(r))
  //     .catch(e => console.log(e))  

})


