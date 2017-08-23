var express = require('express');
var router = express.Router();
var https = require('https');
var db = require('../database/database');

router.get('/:depart/:arrivee', (req, res, error) => {
    var Depart = req.params.depart;
    var Arrivee = req.params.arrivee;
    var json = '';
    var clef;

    if (Depart && Arrivee) {
        clef = 'https://maps.googleapis.com/maps/api/directions/json?origin='+
                Depart+
                '&destination='+
                Arrivee+
                '&key=AIzaSyCCQF0GSVvpSYo5A1p_7EHx-w-WsmhNMSs';

        https.get(clef, (_res) => {
            _res.on('data', (d) => {
              json = json + d;
            });

            _res.on('end', () =>{
                db.history.create({
                    start: Depart,
                    end: Arrivee,
                    journey: json
                });

                json = JSON.parse(json);
                res.json(json);
            });

        }).on('error', (e) => {
            console.error(e);
        });
    }
});

module.exports = router;