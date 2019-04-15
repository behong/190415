var express = require('express');
var createError = require('http-errors');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.send({ msg: 'index API....' });
});

router.use('/user' , require('./user'))
router.use('/testApi' , require('./testApi'))

router.all('*', function(req, res, next) {
  //res.send({ title: 'api 진입' });
  next(createError(404,'없는 api 요청 '))
});

module.exports = router;
