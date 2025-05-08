const db = require('../db/cite');

// Récupérer toutes les chambres avec nom du bâtiment
exports.getAllChambres = (req, res) => {
  const query = `
    SELECT c.*, b.nom_bat 
    FROM chambre c
    LEFT JOIN batiment b ON c.n_bat = b.n_bat
  `;

  db.query(query, (err, results) => {
    if (err) return res.status(500).json({ message: "Erreur serveur", error: err });
    res.status(200).json(results);
  });
};

// Récupérer une chambre par ID
exports.getChambreById = (req, res) => {
  const { id } = req.params;

  db.query('SELECT * FROM chambre WHERE n_chambre = ?', [id], (err, results) => {
    if (err) return res.status(500).json({ message: "Erreur serveur", error: err });

    if (results.length === 0) {
      return res.status(404).json({ message: "Chambre introuvable" });
    }

    res.status(200).json(results[0]);
  });
};

// Créer une chambre
exports.createChambre = (req, res) => {
  const data = req.body;

  if (!data.capacite_max || !data.etat_chambre || !data.n_bat) {
    return res.status(400).json({ message: "Champs requis manquants" });
  }

  db.query('INSERT INTO chambre SET ?', data, (err, results) => {
    if (err) return res.status(500).json({ message: "Erreur lors de la création", error: err });

    res.status(201).json({ message: "Chambre créée", id: results.insertId });
  });
};

// Mettre à jour une chambre
exports.updateChambre = (req, res) => {
  const { id } = req.params;
  const data = req.body;

  db.query('UPDATE chambre SET ? WHERE n_chambre = ?', [data, id], (err, result) => {
    if (err) return res.status(500).json({ message: "Erreur lors de la mise à jour", error: err });

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Chambre introuvable" });
    }

    res.status(200).json({ message: "Chambre mise à jour avec succès" });
  });
};

// Supprimer une chambre avec vérifications
exports.deleteChambre = (req, res) => {
  const { id } = req.params;

  // Étape 1 : Vérifier la présence d'étudiants
  db.query('SELECT * FROM etudiant WHERE n_chambre = ?', [id], (err, etudiants) => {
    if (err) return res.status(500).json({ message: "Erreur lors de la vérification des étudiants", error: err });

    if (etudiants.length > 0) {
      return res.status(400).json({ message: "Impossible de supprimer : des étudiants occupent cette chambre." });
    }

    // Étape 2 : Vérifier la présence de réservations
    db.query('SELECT * FROM reservation WHERE n_chambre = ?', [id], (err, reservations) => {
      if (err) return res.status(500).json({ message: "Erreur lors de la vérification des réservations", error: err });

      if (reservations.length > 0) {
        return res.status(400).json({ message: "Impossible de supprimer : la chambre est liée à des réservations." });
      }

      // Étape 3 : Récupérer le bâtiment de la chambre avant suppression
      db.query('SELECT n_bat FROM chambre WHERE n_chambre = ?', [id], (err, results) => {
        if (err) return res.status(500).json({ message: "Erreur lors de la récupération du bâtiment", error: err });

        if (results.length === 0) {
          return res.status(404).json({ message: "Chambre introuvable" });
        }

        const n_bat = results[0].n_bat;

        // Étape 4 : Supprimer la chambre
        db.query('DELETE FROM chambre WHERE n_chambre = ?', [id], (err, result) => {
          if (err) return res.status(500).json({ message: "Erreur lors de la suppression", error: err });

          // Étape 5 : Mettre à jour le nb_chambre du bâtiment
          db.query('UPDATE batiment SET nb_chambre = nb_chambre - 1 WHERE n_bat = ?', [n_bat], (err) => {
            if (err) return res.status(500).json({ message: "Erreur lors de la mise à jour du bâtiment", error: err });

            res.status(200).json({ message: "Chambre supprimée et bâtiment mis à jour" });
          });
        });
      });
    });
  });
};