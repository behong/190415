var express = require('express');
var createError = require('http-errors');
var router = express.Router();

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

router.get('/', function(req, res, next) {
  res.send({ users: us });
});

router.post('/', (req, res, next) =>{
  res.send({success:true})
})
router.put('/') ,(req,res,next) =>{
  res.send({success:true})
}
router.delete('/') ,(req,res,next) =>{
  res.send({success:true})
}

router.all('*', function(req, res, next) {
  //res.send({ title: 'api 진입' });
  next(createError(404,'api/test 없는 요청 '))
});

module.exports = router;
