const express = require('express');
const router = express.Router();
const commentaireController = require('../controllers/commentaireController');

router.get('/', commentaireController.getAllCommentaires); // afficher commentaire 
router.get('/:id', commentaireController.getCommentaireById); // rechercher une commentaire
router.post('/', commentaireController.createCommentaire); // ajout commentaire 
router.put('/:id', commentaireController.updateCommentaire); // modifier commentaire
router.delete('/:id', commentaireController.deleteCommentaire); // supprimer commentaire

module.exports = router;
