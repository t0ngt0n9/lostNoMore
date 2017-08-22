var express = require('express');
var router = express.Router();
var https = require('https');

router.get('/', function(req, res, next) {
  //res.render('itineraire',{depart : req.param("depart"), Arrivee : req.param("arrivee")});
  var Depart = req.param("depart");
  var Arrivee = req.param("arrivee"); 
  //var json = null;
  var clef; 
  if (Depart && Arrivee){
      clef = 'https://maps.googleapis.com/maps/api/directions/json?origin='+
             Depart+
             '&destination='+
             Arrivee+
             '&key=AIzaSyCCQF0GSVvpSYo5A1p_7EHx-w-WsmhNMSs';
             
      https.get(clef, (_res) => {
        //console.log('statusCode:', _res.statusCode);
        //console.log('headers:', _res.headers);
         
        _res.on('data', (d) => {
          process.stdout.write(d);
          //json = process.JSON.parse(d);
          res.end(d);
        });

      }).on('error', (e) => {
        console.error(e);
    });
    
  }
});

module.exports = router;
