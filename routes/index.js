var express = require('express');
var router = express.Router();
var  musicDemo = require('../musicDemo');

router.get('/', function(req, res, next) {
  res.render('index', { title: 'Promtptworks Demos' });
});

router.post('/', function(req, res) {
  if(musicDemo.validatePhone(req.body.phone.trim())){
    musicDemo.getArtist(req.body.artist,function(rtn){
        console.log(rtn);
        if(rtn.items.length < 1){
          res.json({success:false,message:"Invalid Artist"});
        }else{
          musicDemo.sendMusic({phone:req.body.phone,artist:req.body.artist},function(rtnVal){
            res.json(rtnVal);
          });
        }
    });
  }else{
    res.json({success:false,message:"Invalid Phone"});
  }
});
module.exports = router;
