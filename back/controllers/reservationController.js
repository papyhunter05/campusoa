const db = require('../db/cite');

exports.getAllReservations = (req, res) => {
  // Requête avec jointures pour obtenir les informations complètes
  const query = `
    SELECT r.*, e.nom, e.prenom, c.n_chambre, b.nom_bat
    FROM reservation r
    LEFT JOIN etudiant e ON r.n_etudiant = e.n_etudiant
    LEFT JOIN chambre c ON r.n_chambre = c.n_chambre
    LEFT JOIN batiment b ON c.n_bat = b.n_bat
  `;
  
  db.query(query, (err, results) => {
    if (err) return res.status(500).send(err);
    res.json(results);
  });
};

exports.getReservationById = (req, res) => {
  const { id } = req.params;
  const query = `
    SELECT r.*, e.nom, e.prenom, c.n_chambre, b.nom_bat
    FROM reservation r
    LEFT JOIN etudiant e ON r.n_etudiant = e.n_etudiant
    LEFT JOIN chambre c ON r.n_chambre = c.n_chambre
    LEFT JOIN batiment b ON c.n_bat = b.n_bat
    WHERE r.id_res = ?
  `;
  
  db.query(query, [id], (err, results) => {
    if (err) return res.status(500).send(err);
    res.json(results[0]);
  });
};

exports.createReservation = (req, res) => {
  const data = req.body;
  
  // Vérifier que les champs obligatoires sont présents
  if (!data.date_res || !data.n_chambre || !data.n_etudiant) {
    return res.status(400).json({ 
      message: "Les champs date_res, n_chambre et n_etudiant sont obligatoires" 
    });
  }
  
  db.query('INSERT INTO reservation SET ?', data, (err, results) => {
    if (err) {
      console.error("Erreur SQL:", err);
      return res.status(500).json({ 
        message: "Erreur lors de l'ajout de la réservation", 
        error: err.message 
      });
    }
    
    // Récupérer la réservation nouvellement créée
    db.query('SELECT * FROM reservation WHERE id_res = ?', [results.insertId], (err, reservation) => {
      if (err) {
        return res.status(500).json({ 
          message: "Réservation créée mais erreur lors de la récupération", 
          id: results.insertId 
        });
      }
      res.status(201).json(reservation[0] || { id: results.insertId });
    });
  });
};

exports.updateReservation = (req, res) => {
  const { id } = req.params;
  const data = req.body;
  
  db.query('UPDATE reservation SET ? WHERE id_res = ?', [data, id], (err) => {
    if (err) {
      console.error("Erreur SQL:", err);
      return res.status(500).json({ 
        message: "Erreur lors de la modification de la réservation", 
        error: err.message 
      });
    }
    
    // Récupérer la réservation mise à jour
    db.query('SELECT * FROM reservation WHERE id_res = ?', [id], (err, reservation) => {
      if (err) {
        return res.status(200).json({ 
          message: "Réservation modifiée mais erreur lors de la récupération"
        });
      }
      res.status(200).json(reservation[0] || { message: "Réservation modifiée avec succès" });
    });
  });
};

exports.deleteReservation = (req, res) => {
  const { id } = req.params;
  
  db.query('DELETE FROM reservation WHERE id_res = ?', [id], (err) => {
    if (err) {
      console.error("Erreur SQL:", err);
      return res.status(500).json({ 
        message: "Erreur lors de la suppression de la réservation", 
        error: err.message 
      });
    }
    res.status(200).json({ message: "Réservation supprimée avec succès" });
  });
};
