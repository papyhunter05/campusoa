const db = require('../db/cite');

// Obtenir tous les bâtiments
exports.getAllBatiments = (req, res) => {
  db.query('SELECT * FROM batiment', (err, results) => {
    if (err) {
      console.error("Erreur lors de la récupération des bâtiments :", err);
      return res.status(500).json({ message: "Erreur serveur", error: err.message });
    }
    res.json(results);
  });
};

// Obtenir un bâtiment par son ID
exports.getBatimentById = (req, res) => {
  const { id } = req.params;
  db.query('SELECT * FROM batiment WHERE n_bat = ?', [id], (err, results) => {
    if (err) {
      console.error("Erreur lors de la récupération du bâtiment :", err);
      return res.status(500).json({ message: "Erreur serveur", error: err.message });
    }
    if (results.length === 0) {
      return res.status(404).json({ message: "Bâtiment non trouvé" });
    }
    res.json(results[0]);
  });
};

// Créer un bâtiment
exports.createBatiment = (req, res) => {
  try {
    const data = { ...req.body };

    // Validation
    if (!data.nom_bat) return res.status(400).json({ message: "Le nom du bâtiment est requis" });
    if (!data.nb_chambre || isNaN(data.nb_chambre)) {
      return res.status(400).json({ message: "Le nombre de chambres doit être un nombre valide" });
    }
    if (!data.etat_bat) return res.status(400).json({ message: "L'état du bâtiment est requis" });

    const nbChambres = parseInt(data.nb_chambre, 10);
    const capaciteMax = parseInt(data.capacite_max, 10);

    delete data.n_bat;
    delete data.capacite_max;

    db.query('INSERT INTO batiment SET ?', data, (err, results) => {
      if (err) {
        console.error("Erreur SQL (bâtiment) :", err);
        return res.status(500).json({ message: "Erreur lors de l'insertion du bâtiment", error: err.message });
      }

      const idBatiment = results.insertId;
      const chambres = Array.from({ length: nbChambres }, () => [idBatiment, "Disponible", capaciteMax]);

      db.query(
        'INSERT INTO chambre (n_bat, etat_chambre, capacite_max) VALUES ?',
        [chambres],
        (errCh) => {
          if (errCh) {
            console.error("Erreur SQL (chambres) :", errCh);
            return res.status(500).json({
              message: "Bâtiment créé, mais erreur lors de la création des chambres",
              id: idBatiment,
              error: errCh.message,
            });
          }

          db.query('SELECT * FROM batiment WHERE n_bat = ?', [idBatiment], (err2, result2) => {
            if (err2) {
              console.error("Erreur lors de la récupération du bâtiment :", err2);
              return res.status(500).json({ message: "Bâtiment créé mais erreur de récupération", id: idBatiment });
            }
            res.status(201).json(result2[0]);
          });
        }
      );
    });
  } catch (error) {
    console.error("Erreur inattendue :", error);
    res.status(500).json({ message: "Erreur serveur", error: error.message });
  }
};

// Mettre à jour un bâtiment
exports.updateBatiment = (req, res) => {
  const { id } = req.params;
  const data = req.body;

  const nouveauNbChambre = parseInt(data.nb_chambre, 10);
  if (isNaN(nouveauNbChambre)) {
    return res.status(400).json({ message: "Le nombre de chambres doit être un entier" });
  }

  db.query('SELECT * FROM batiment WHERE n_bat = ?', [id], (err, result) => {
    if (err) {
      console.error("Erreur lors de la récupération du bâtiment :", err);
      return res.status(500).json({ message: "Erreur serveur" });
    }
    if (result.length === 0) {
      return res.status(404).json({ message: "Bâtiment non trouvé" });
    }

    const ancienNbChambre = result[0].nb_chambre;
    const diff = nouveauNbChambre - ancienNbChambre;

    if (diff > 0) {
      // Ajout de nouvelles chambres
      db.query(
        'SELECT capacite_max FROM chambre WHERE n_bat = ? LIMIT 1',
        [id],
        (errCap, capResult) => {
          if (errCap || capResult.length === 0) {
            return res.status(500).json({ message: "Impossible de récupérer la capacité" });
          }
    
          const capaciteMax = capResult[0].capacite_max;
          const nouvellesChambres = Array.from({ length: diff }, () => [id, "Disponible", capaciteMax]);
    
          db.query(
            'INSERT INTO chambre (n_bat, etat_chambre, capacite_max) VALUES ?',
            [nouvellesChambres],
            (errIns) => {
              if (errIns) {
                console.error("Erreur lors de l'ajout des nouvelles chambres :", errIns);
                return res.status(500).json({ message: "Erreur lors de l'ajout des chambres", error: errIns.message });
              }
    
              db.query('UPDATE batiment SET ? WHERE n_bat = ?', [data, id], (errUp) => {
                if (errUp) return res.status(500).json({ message: "Erreur lors de la mise à jour", error: errUp.message });
                res.status(200).json({ message: "Bâtiment mis à jour avec nouvelles chambres" });
              });
            }
          );
        }
      );
    } else if (diff < 0) {
      // Suppression de chambres disponibles
      const nombreASupprimer = Math.abs(diff);
      db.query(
        'SELECT n_chambre FROM chambre WHERE n_bat = ? AND etat_chambre = "Disponible" LIMIT ?',
        [id, nombreASupprimer],
        (errSel, chambres) => {
          if (errSel) {
            return res.status(500).json({ message: "Erreur lors de la récupération des chambres disponibles", error: errSel.message });
          }
    
          if (chambres.length < nombreASupprimer) {
            return res.status(400).json({ message: "Pas assez de chambres disponibles à supprimer" });
          }
    
          const chambresASupprimer = chambres.map(c => c.n_chambre);
          console.log("Chambres à supprimer :", chambresASupprimer);

          db.query(
            'DELETE FROM chambre WHERE n_chambre IN (?)',
            [chambresASupprimer],
            (errDel) => {
              if (errDel) {
                return res.status(500).json({ message: "Erreur lors de la suppression des chambres", error: errDel.message });
              }
    
              db.query('UPDATE batiment SET ? WHERE n_bat = ?', [data, id], (errUp) => {
                if (errUp) return res.status(500).json({ message: "Erreur lors de la mise à jour du bâtiment", error: errUp.message });
                res.status(200).json({ message: "Bâtiment mis à jour avec chambres supprimées" });
              });
            }
          );
        }
      );
    } else {
      // Pas de
    
      // Pas d'ajout de chambre, mise à jour simple
      db.query('UPDATE batiment SET ? WHERE n_bat = ?', [data, id], (errUp, resultUp) => {
        if (errUp) return res.status(500).json({ message: "Erreur lors de la mise à jour", error: errUp.message });
        res.status(200).json({ message: "Bâtiment mis à jour" });
      });
    }
  });
};

// Supprimer un bâtiment
exports.deleteBatiment = (req, res) => {
  const { id } = req.params;

  db.query('SELECT n_chambre FROM chambre WHERE n_bat = ? AND etat_chambre = "Occupée"', [id], (err, result) => {
    if (err) return res.status(500).json({ message: "Erreur lors de la vérification des chambres", error: err.message });

    if (result.length > 0) {
      return res.status(400).json({
        message: "Impossible de supprimer ce bâtiment : des chambres sont encore occupées"
      });
    } else {
      // Suppression des chambres
      db.query('DELETE FROM chambre WHERE n_bat = ?', [id], (err2) => {
        if (err2) return res.status(500).json({ message: "Erreur lors de la suppression des chambres", error: err2.message });

        // Suppression du bâtiment
        db.query('DELETE FROM batiment WHERE n_bat = ?', [id], (err3, result3) => {
          if (err3) return res.status(500).json({ message: "Erreur lors de la suppression du bâtiment", error: err3.message });
          if (result3.affectedRows === 0) {
            return res.status(404).json({ message: "Bâtiment non trouvé" });
          }
          res.status(200).json({ message: "Bâtiment supprimé avec succès" });
        });
      });
    }

    
  });
};
