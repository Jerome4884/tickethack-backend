const express = require('express');
const router = express.Router();

const Cart = require('../models/carts');

//Ajoute le trajet dans le panier
router.post('/', (req, res) => {
    const trip = {
        departure : req.body.departure,
        arrival : req.body.arrival,
        date : req.body.date,
        price : req.body.price,
        isBook: req.body.isBook
    }

    const newCart = new Cart(trip)
    newCart.save().then(newCart => {
        res.json({ result: true, newCart: newCart });
    });
});

// récupérer tous les trajets du panier
router.get('/', (req, res) => {
    Cart.find().then(cart => {
        if(cart[0]) {
            res.json({ result: true, cart: cart });
        } else {
            res.json({ result: false, message: 'Pas de trajets dans le panier.' });
        }
    })
});

// Supprime un trajet du panier
router.delete('/:id', (req, res) => {
    Cart.deleteOne({ _id: req.params.id }).then(() => {
        res.json({result: true, message: 'Trajet supprimé'})
    })
});

// Passer les trajets du panier en isBook : true
router.put('/', (req, res) => {
    Cart.updateMany({}, { isBook: true }).then(cart => {
        res.json({ result: true, message: 'Les trajets on été reséervé' });
    })
});

// Returne seulement les trajets isBook : true
router.get('/bookings', (req, res) => {
    Cart.find({ isBook: true }).then(bookings => {
        if(bookings[0]) {
            res.json({ result: true, bookings: bookings });
        } else {
            res.json({ result: false, message: 'Pas de trajets dans le panier.' });
        }
    })
});

module.exports = router;