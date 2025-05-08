const express = require('express');
const router = express.Router();
const batimentController = require('../controllers/batimentController');

router.get('/', batimentController.getAllBatiments);
router.get('/:id', batimentController.getBatimentById);
router.post('/', batimentController.createBatiment);
router.put('/:id', batimentController.updateBatiment);
router.delete('/:id', batimentController.deleteBatiment);

module.exports = router;
