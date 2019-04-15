var express = require('express');
var createError = require('http-errors');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  const us =[
    {
      name :'홍성인',
      age : 39
    },
    {
      name :'홍지유',
      age : 8
    },
    {
      name :'홍소유',
      age : 5
    }
  ]
  res.send({ users: us });
});

router.all('*', function(req, res, next) {
  //res.send({ title: 'api 진입' });
  next(createError(404,'api/test 없는 요청 '))
});

module.exports = router;
