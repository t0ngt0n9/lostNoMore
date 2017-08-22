var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('itineraire',{depart : req.param("depart"), arrive : req.param("arrive")});
  var Depart = req.param("depart");
  var Arrive = req.param("arrive"); 
  var clef; 
  if (Depart && Arrive){
      clef = 'https://maps.googleapis.com/maps/api/directions/json?origin='+Depart+'&destination='+Arrive+'&key=AIzaSyCCQF0GSVvpSYo5A1p_7EHx-w-WsmhNMSs';
  }
});



module.exports = router;
