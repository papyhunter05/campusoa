const express = require('express');
const router = express.Router();
const commentaireController = require('../controllers/commentaireController');

// Routes de base CRUD
router.get('/', commentaireController.getAllCommentaires); // Lister tous les commentaires
router.get('/:id', commentaireController.getCommentaireById); // Obtenir un commentaire spécifique
router.post('/', commentaireController.createCommentaire); // Créer un nouveau commentaire
router.put('/:id', commentaireController.updateCommentaire); // Mettre à jour un commentaire
router.delete('/:id', commentaireController.deleteCommentaire); // Supprimer un commentaire

// Routes supplémentaires pour les relations
router.get('/etudiant/:id', commentaireController.getCommentairesByEtudiant); // Commentaires par étudiant
router.get('/batiment/:id', commentaireController.getCommentairesByBatiment); // Commentaires par bâtiment

module.exports = router;