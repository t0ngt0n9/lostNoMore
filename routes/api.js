var express = require('express');
var router = express.Router();
var https = require('https');
var db = require('../database/database');
var trajet = require('../lib/trajet');

router.get('/:depart/:arrivee/:mode', (req, res, error) => {
    var depart = req.params.depart;
    var arrivee = req.params.arrivee;
    var json = '';
    var modes = trajet.getModesTravel(req.params.mode);
    var arrGoogleUrlApi = trajet.setGoogleApiUrl(depart, arrivee, modes);

    if (depart && arrivee) {
        https.get(arrGoogleUrlApi[0], (_res) => {
            _res.on('data', (d) => {
                json = json + d;
            });

            _res.on('end', () => {
                db.history.create({
                    start: depart,
                    end: arrivee,
                    journey: json
                });

                json = JSON.parse(json);

                if (trajet.getTrajet(json) !== null)
                    res.json(trajet.getTrajet(json));
                else
                    res.send("No routes found!");
            });

        }).on('error', (e) => {
            console.error(e);
        });
    }
});

module.exports = router;