const express = require('express');
const router = express.Router();
const reservationController = require('../controllers/reservationController');

router.get('/', reservationController.getAllReservations); // afficher reservation 
router.get('/:id', reservationController.getReservationById); // rechercher une reservation 
router.post('/', reservationController.createReservation); // ajouter reservation
router.put('/:id', reservationController.updateReservation); // modifier reservation
router.delete('/:id', reservationController.deleteReservation); // supprimer reservation

module.exports = router;
