const express = require('express');
const router = express.Router();

const Cart = require('../models/carts');

router.post('/', (req, res) => {
    const trip = {
        departure : req.body.departure,
        arrival : req.body.arrival,
        hour : req.body.hour,
        price : req.body.price,
    }
    //Enregistre le trajet dans le panier
    const newCart = new Cart(trip)
    newCart.save().then(newCart => {
        res.json({ result: true, newCart: newCart });
    });
});

router.get('/', (req, res) => {
    Cart.find().then(cart => {
        if(cart[0]) {
            res.json({ result: true, cart: cart });
        } else {
            res.json({ result: false, message: 'Pas de trajets dans le panier.' });
        }
    })
});

router.delete('/:id', (req, res) => {
    Cart.deleteOne({ _id: req.params.id }).then(() => {
        res.json({result: true, message: 'Trajet supprimé'})
    })
});

module.exports = router;