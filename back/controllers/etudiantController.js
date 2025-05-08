const db = require('../db/cite');

exports.getAllEtudiants = (req, res) => {
  db.query('SELECT * FROM etudiant', (err, results) => {
    if (err) return res.status(500).send(err);
    res.json(results);
  });
};

exports.getEtudiantById = (req, res) => {
  const { id } = req.params;
  db.query('SELECT * FROM etudiant WHERE n_etudiant = ?', [id], (err, results) => {
    if (err) return res.status(500).send(err);
    res.json(results[0]);
  });
};

exports.createEtudiant = (req, res) => {
  try {
    const data = { ...req.body };
    console.log("Données reçues:", data);
    
    // Vérifier que les champs obligatoires sont présents
    if (!data.nom || !data.prenom || !data.univ || !data.niveau || !data.contact) {
      return res.status(400).json({ 
        message: "Les champs nom, prenom, univ, niveau et contact sont obligatoires" 
      });
    }
    
    // Supprimer n_etudiant s'il est présent dans les données (car auto-incrémenté)
    if (data.n_etudiant !== undefined) {
      delete data.n_etudiant;
    }
    
    // Si n_chambre est vide, le définir à NULL pour éviter les problèmes de contrainte
    if (data.n_chambre === '') {
      data.n_chambre = null;
    }
    
    db.query('INSERT INTO etudiant SET ?', data, (err, results) => {
      if (err) {
        console.error("Erreur SQL complète:", err);
        return res.status(500).json({ 
          message: "Erreur lors de l'ajout de l'étudiant", 
          error: err.message 
        });
      }
      
      // Récupérer l'étudiant nouvellement créé
      db.query('SELECT * FROM etudiant WHERE n_etudiant = ?', [results.insertId], (err, etudiant) => {
        if (err) {
          console.error("Erreur SQL lors de la récupération:", err);
          return res.status(500).json({ 
            message: "Étudiant créé mais erreur lors de la récupération", 
            id: results.insertId 
          });
        }
        res.status(201).json(etudiant[0] || { id: results.insertId });
      });
    });
  } catch (error) {
    console.error("Erreur générale:", error);
    res.status(500).json({ message: "Erreur serveur", error: error.message });
  }
};

exports.updateEtudiant = (req, res) => {
  const { id } = req.params;
  const data = req.body;
  
  // Supprimer n_etudiant du corps de la requête s'il est présent
  // car on ne veut pas modifier la clé primaire
  if (data.n_etudiant !== undefined) {
    delete data.n_etudiant;
  }
  
  db.query('UPDATE etudiant SET ? WHERE n_etudiant = ?', [data, id], (err) => {
    if (err) return res.status(500).send(err);
    res.sendStatus(200);
  });
};

exports.deleteEtudiant = (req, res) => {
  const { id } = req.params;
  db.query('DELETE FROM etudiant WHERE n_etudiant = ?', [id], (err) => {
    if (err) return res.status(500).send(err);
    res.sendStatus(200);
  });
};
