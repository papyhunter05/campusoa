const express = require('express');
const router = express.Router();
const etudiantController = require('../controllers/etudiantController');

router.get('/', etudiantController.getAllEtudiants); // afficher etudiant
router.get('/:id', etudiantController.getEtudiantById); // rechercher un etudiant
router.post('/', etudiantController.createEtudiant); // ajout etudiant
router.put('/:id', etudiantController.updateEtudiant); // modifier etudiant
router.delete('/:id', etudiantController.deleteEtudiant); // supprimenr etudiant

module.exports = router;
