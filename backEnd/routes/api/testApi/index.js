var express = require('express');
var createError = require('http-errors');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.send({ msg: 'testApi....' });
});

router.all('*', function(req, res, next) {
  //res.send({ title: 'api 진입' });
  next(createError(404,'api/test 없는 요청 '))
});

module.exports = router;
