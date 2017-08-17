var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res) {
  res.render('index', { title: 'TimeStamp Microservice' });
});

function unixToNatural(unix){
  var date = new Date(unix*1000);
  var months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  var month = months[date.getMonth()];
  var day = date.getDay();
  var year = date.getFullYear();
  var result = month + " " + day + ", " + year;
  return result;
}


router.get('/:time', function(req, res){
  var time = req.params.time;
  if(!isNaN(time)){
    var natural = unixToNatural(time);
    var data = {
      unix: time,
      natural: natural
    };
    res.json(data);
  }
  else{
    var natural = new Date(time);
    if(!isNaN(natural)){
      var unix = natural/1000;
      var data = {
        unix: unix,
        natural: time
      };
    res.json(data);
    }
    else{
      res.json({unix: null, natural: null});
    }
  }
});

module.exports = router;
