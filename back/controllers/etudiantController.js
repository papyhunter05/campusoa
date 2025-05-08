const db = require('../db/cite');

exports.getAllEtudiants = async (req, res) => {
  try {
    const [results] = await db.promise().query('SELECT * FROM etudiant');
    res.json(results);
  } catch (err) {
    console.error('Erreur:', err);
    res.status(500).json({ message: "Erreur serveur" });
  }
};

exports.getEtudiantById = async (req, res) => {
  try {
    const { id } = req.params;
    const [results] = await db.promise().query('SELECT * FROM etudiant WHERE n_etudiant = ?', [id]);
    
    if (results.length === 0) {
      return res.status(404).json({ message: "Étudiant non trouvé" });
    }
    
    res.json(results[0]);
  } catch (err) {
    console.error('Erreur:', err);
    res.status(500).json({ message: "Erreur serveur" });
  }
};

exports.createEtudiant = async (req, res) => {
  try {
    const data = { ...req.body };
    
    // Suppression de l'ID si présent (auto-incrément)
    delete data.n_etudiant;
    
    // Insertion de l'étudiant
    const [result] = await db.promise().query('INSERT INTO etudiant SET ?', data);
    
    // Si une chambre est attribuée, mettre à jour son état
    if (data.n_chambre) {
      await db.promise().query(
        'UPDATE chambre SET etat_chambre = "Occupée" WHERE n_chambre = ?',
        [data.n_chambre]
      );
    }
    
    // Récupération de l'étudiant créé
    const [etudiant] = await db.promise().query(
      'SELECT * FROM etudiant WHERE n_etudiant = ?', 
      [result.insertId]
    );
    
    res.status(201).json(etudiant[0]);
  } catch (err) {
    console.error('Erreur:', err);
    res.status(500).json({ message: "Erreur serveur" });
  }
};

exports.updateEtudiant = async (req, res) => {
  try {
    const { id } = req.params;
    const data = { ...req.body };
    
    // Suppression de l'ID si présent (ne pas modifier la clé primaire)
    delete data.n_etudiant;
    
    // Mise à jour de l'étudiant
    await db.promise().query('UPDATE etudiant SET ? WHERE n_etudiant = ?', [data, id]);
    
    // Si la chambre est modifiée, mettre à jour son état
    if (data.n_chambre) {
      await db.promise().query(
        'UPDATE chambre SET etat_chambre = "Occupée" WHERE n_chambre = ?',
        [data.n_chambre]
      );
    }
    
    // Récupération de l'étudiant mis à jour
    const [etudiant] = await db.promise().query(
      'SELECT * FROM etudiant WHERE n_etudiant = ?', 
      [id]
    );
    
    res.json(etudiant[0]);
  } catch (err) {
    console.error('Erreur:', err);
    res.status(500).json({ message: "Erreur serveur" });
  }
};

exports.deleteEtudiant = async (req, res) => {
  try {
    const { id } = req.params;
    
    // Récupérer la chambre de l'étudiant avant suppression
    const [etudiant] = await db.promise().query(
      'SELECT n_chambre FROM etudiant WHERE n_etudiant = ?',
      [id]
    );
    
    // Suppression de l'étudiant
    await db.promise().query('DELETE FROM etudiant WHERE n_etudiant = ?', [id]);
    
    // Si l'étudiant avait une chambre, mettre à jour son état
    if (etudiant[0]?.n_chambre) {
      await db.promise().query(
        'UPDATE chambre SET etat_chambre = "Disponible" WHERE n_chambre = ?',
        [etudiant[0].n_chambre]
      );
    }
    
    res.sendStatus(204);
  } catch (err) {
    console.error('Erreur:', err);
    res.status(500).json({ message: "Erreur serveur" });
  }
};