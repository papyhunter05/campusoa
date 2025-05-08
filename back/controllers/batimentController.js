const db = require('../db/cite');

exports.getAllBatiments = (req, res) => {
  db.query('SELECT * FROM batiment', (err, results) => {
    if (err) return res.status(500).send(err);
    res.json(results);
  });
};

exports.getBatimentById = (req, res) => {
  const { id } = req.params;
  db.query('SELECT * FROM batiment WHERE n_bat = ?', [id], (err, results) => {
    if (err) return res.status(500).send(err);
    res.json(results[0]);
  });
};

exports.createBatiment = (req, res) => {
  try {
    const data = { ...req.body };
    console.log("Données reçues:", data);
    
    // Validation des données
    if (!data.nom_bat) {
      return res.status(400).json({ message: "Le nom du bâtiment est requis" });
    }
    
    if (!data.nb_chambre || isNaN(data.nb_chambre)) {
      return res.status(400).json({ message: "Le nombre de chambres doit être un nombre valide" });
    }
    
    if (!data.etat_bat) {
      return res.status(400).json({ message: "L'état du bâtiment est requis" });
    }
    
    // Supprimer l'ID s'il est fourni pour laisser la base de données le générer
    delete data.n_bat;
    
    db.query('INSERT INTO batiment SET ?', data, (err, results) => {
      if (err) {
        console.error("Erreur SQL:", err);
        return res.status(500).json({ message: "Erreur lors de l'insertion dans la base de données", error: err.message });
      }
      
      // Récupérer le bâtiment nouvellement créé
      db.query('SELECT * FROM batiment WHERE n_bat = ?', [results.insertId], (err, batiment) => {
        if (err) {
          console.error("Erreur SQL lors de la récupération:", err);
          return res.status(500).json({ message: "Bâtiment créé mais erreur lors de la récupération", id: results.insertId });
        }
        res.status(201).json(batiment[0] || { id: results.insertId });
      });
    });
  } catch (error) {
    console.error("Erreur générale:", error);
    res.status(500).json({ message: "Erreur serveur", error: error.message });
  }
};



exports.updateBatiment = (req, res) => {
  const { id } = req.params;
  const data = req.body;
  db.query('UPDATE batiment SET ? WHERE n_bat = ?', [data, id], (err) => {
    if (err) return res.status(500).send(err);
    res.sendStatus(200);
  });
};

exports.deleteBatiment = (req, res) => {
  const { id } = req.params;
  db.query('DELETE FROM batiment WHERE n_bat = ?', [id], (err) => {
    if (err) return res.status(500).send(err);
    res.sendStatus(200);
  });
};
