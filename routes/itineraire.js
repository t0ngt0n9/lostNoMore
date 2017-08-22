var express = require('express');
var router = express.Router();
var https = require('https');
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('itineraire',{depart : req.param("depart"), Arrivee : req.param("arrivee")});
  var Depart = req.param("depart");
  var Arrivee = req.param("arrivee"); 
  var clef; 
  if (Depart && Arrivee){
      clef = 'https://maps.googleapis.com/maps/api/directions/json?origin='+Depart+'&destination='+Arrivee+'&key=AIzaSyCCQF0GSVvpSYo5A1p_7EHx-w-WsmhNMSs';
https.get(clef, (res) => {
 console.log('statusCode:', res.statusCode);
 console.log('headers:', res.headers);

 res.on('data', (d) => {
   process.stdout.write(d);
   //res.json(d);
 });

}).on('error', (e) => {
 console.error(e);
});
    }

});



module.exports = router;
