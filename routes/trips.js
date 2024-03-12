const express = require('express');
const router = express.Router();

const Trip = require('../models/trips');

const moment = require('moment');

router.post('/', (req, res) => {
    const departure = req.body.departure
    const arrival = req.body.arrival
    const date = req.body.date // format attendu par le frontend : 'YYYY-MM-DD'

    // Filtre en fonction de départ/arrivée
    Trip.find({ departure: departure, arrival: arrival })
        .then(trips => {
            // Filtre en fonction de la date - utcOffset(0) pour ne pas créer de décalage avec les heures
            const tripsWithDate = trips.filter(trip => moment(trip.date).utcOffset(0).format('YYYY-MM-DD') === date);

            if (tripsWithDate[0]) {
                res.json({ result: true, trips: tripsWithDate });
            } else {
                res.json({ result: false, message: 'Pas de trajets correspondant.' });
            }
           
        })

})

module.exports = router;