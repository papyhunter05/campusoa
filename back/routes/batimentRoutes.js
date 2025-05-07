const express = require('express');
const router = express.Router();
const batimentController = require('../controllers/batimentController');

router.get('/', batimentController.getAllBatiments); // afficher tout les batiment
router.get('/:id', batimentController.getBatimentById); // rechercher un batiment selon l'ID 
router.post('/', batimentController.createBatiment); // ajouter un batiment
router.put('/:id', batimentController.updateBatiment); // modifier unbatiment
router.delete('/:id', batimentController.deleteBatiment);  //supprimer un batiment 

module.exports = router;
