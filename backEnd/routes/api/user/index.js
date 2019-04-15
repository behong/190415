var express = require('express');
var createError = require('http-errors');
var router = express.Router();
var User = require('../../../models/users')

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
  User.find()
    .then( r=>{
      res.send({success:true,users:r})
    })
    .catch(e =>{
      res.send({success:false})
    })
  //res.send({ users: us });
});

router.post('/', (req, res, next) =>{
  const {name,age} = req.body
  const u = new User({name,age})
  //User.create({name:'홍홍'})
  u.save()
  .then( r =>{
    res.send({success:true,msg:r})
  })
  .catch(e =>{
    res.send({success:false})
  }) 
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
