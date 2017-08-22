var express = require('express');
var router = express.Router();
var https = require('https');

router.get('/', function(req, res, next) {
  var Depart = req.param("depart");
  var Arrivee = req.param("arrivee"); 
  var json = '';
  var clef; 
  if (Depart && Arrivee){
      clef = 'https://maps.googleapis.com/maps/api/directions/json?origin='+
             Depart+
             '&destination='+
             Arrivee+
             '&key=AIzaSyCCQF0GSVvpSYo5A1p_7EHx-w-WsmhNMSs';
             
      https.get(clef, (_res) => {

        _res.on('data', (d) => {
          json = json+d;
        });
        _res.on('end', () =>{
          //json = JSON.parse(json);
          res.end(json);
        });

      }).on('error', (e) => {
        console.error(e);
    });
    
  }
});

module.exports = router;
