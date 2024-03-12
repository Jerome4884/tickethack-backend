const express = require('express');
const router = express.Router();

const Trip = require('../models/trips');

const moment = require('moment');

router.post('/', (req, res) => {
    const departure = req.body.departure
    const arrival = req.body.arrival
    const date = req.body.date // format attendu par le frontend : 'DD/MM/YYYY'
    
    // Filtre en fonction de départ/arrivée
    Trip.find({ departure: departure, arrival: arrival })
        .then(trips => {
            // Filtre avec la date
            const tripsWithDate = trips.filter(trip => moment(trip.date).format('DD/MM/YYYY') === date)

            if (tripsWithDate[0]) {
                res.json({ result: true, trips: tripsWithDate });
            } else {
                res.json({ result: false, message: 'Pas de trajets correspondant.' });
            }
           
        })

})

module.exports = router;