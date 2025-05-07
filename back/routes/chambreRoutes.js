const express = require('express');
const router = express.Router();
const chambreController = require('../controllers/chambreController');

router.get('/', chambreController.getAllChambres); // afficher chambres
router.get('/:id', chambreController.getChambreById); // rechercher une cambre 
router.post('/', chambreController.createChambre); // ajouter une chambre 
router.put('/:id', chambreController.updateChambre); // modifier une chambre
router.delete('/:id', chambreController.deleteChambre); // supprimer chambre

module.exports = router;
