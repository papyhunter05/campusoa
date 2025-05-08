const db = require('../db/cite');

exports.getAllCommentaires = async (req, res) => {
  try {
    const query = `
      SELECT c.*, e.nom, e.prenom, b.nom_bat
      FROM commentaire c
      LEFT JOIN etudiant e ON c.n_etudiant = e.n_etudiant
      LEFT JOIN batiment b ON c.n_bat = b.n_bat
      ORDER BY c.date_com DESC
    `;
    
    const [results] = await db.promise().query(query);
    res.json(results);
  } catch (err) {
    console.error('Erreur:', err);
    res.status(500).json({ message: "Erreur serveur" });
  }
};

exports.getCommentaireById = async (req, res) => {
  try {
    const { id } = req.params;
    
    const query = `
      SELECT c.*, e.nom, e.prenom, b.nom_bat
      FROM commentaire c
      LEFT JOIN etudiant e ON c.n_etudiant = e.n_etudiant
      LEFT JOIN batiment b ON c.n_bat = b.n_bat
      WHERE c.n_comment = ?
    `;
    
    const [results] = await db.promise().query(query, [id]);
    
    if (results.length === 0) {
      return res.status(404).json({ message: "Commentaire non trouvé" });
    }
    
    res.json(results[0]);
  } catch (err) {
    console.error('Erreur:', err);
    res.status(500).json({ message: "Erreur serveur" });
  }
};

exports.createCommentaire = async (req, res) => {
  try {
    const data = { ...req.body };
    
    // Vérification des champs obligatoires
    if (!data.contenu || !data.n_etudiant || !data.n_bat) {
      return res.status(400).json({ 
        message: "Les champs contenu, n_etudiant et n_bat sont obligatoires" 
      });
    }
    
    // Ajout de la date actuelle si non fournie
    if (!data.date_com) {
      data.date_com = new Date().toISOString().slice(0, 19).replace('T', ' ');
    }
    
    // Vérification que l'étudiant existe
    const [etudiant] = await db.promise().query(
      'SELECT n_etudiant FROM etudiant WHERE n_etudiant = ?', 
      [data.n_etudiant]
    );
    
    if (etudiant.length === 0) {
      return res.status(400).json({ message: "L'étudiant spécifié n'existe pas" });
    }
    
    // Vérification que le bâtiment existe
    const [batiment] = await db.promise().query(
      'SELECT n_bat FROM batiment WHERE n_bat = ?', 
      [data.n_bat]
    );
    
    if (batiment.length === 0) {
      return res.status(400).json({ message: "Le bâtiment spécifié n'existe pas" });
    }
    
    // Insertion du commentaire
    const [result] = await db.promise().query('INSERT INTO commentaire SET ?', data);
    
    // Récupération du commentaire créé
    const [commentaire] = await db.promise().query(
      'SELECT * FROM commentaire WHERE n_comment = ?', 
      [result.insertId]
    );
    
    res.status(201).json(commentaire[0]);
  } catch (err) {
    console.error('Erreur:', err);
    res.status(500).json({ message: "Erreur serveur" });
  }
};

exports.updateCommentaire = async (req, res) => {
  try {
    const { id } = req.params;
    const data = { ...req.body };
    
    // Suppression de l'ID si présent (ne pas modifier la clé primaire)
    delete data.n_comment;
    
    // Vérification que le commentaire existe
    const [existing] = await db.promise().query(
      'SELECT n_comment FROM commentaire WHERE n_comment = ?', 
      [id]
    );
    
    if (existing.length === 0) {
      return res.status(404).json({ message: "Commentaire non trouvé" });
    }
    
    // Mise à jour du commentaire
    await db.promise().query('UPDATE commentaire SET ? WHERE n_comment = ?', [data, id]);
    
    // Récupération du commentaire mis à jour
    const [commentaire] = await db.promise().query(
      'SELECT * FROM commentaire WHERE n_comment = ?', 
      [id]
    );
    
    res.json(commentaire[0]);
  } catch (err) {
    console.error('Erreur:', err);
    res.status(500).json({ message: "Erreur serveur" });
  }
};

exports.deleteCommentaire = async (req, res) => {
  try {
    const { id } = req.params;
    
    // Suppression du commentaire
    await db.promise().query('DELETE FROM commentaire WHERE n_comment = ?', [id]);
    
    res.sendStatus(204);
  } catch (err) {
    console.error('Erreur:', err);
    res.status(500).json({ message: "Erreur serveur" });
  }
};

// Récupérer les commentaires par étudiant
exports.getCommentairesByEtudiant = async (req, res) => {
  try {
    const { id } = req.params;
    
    const query = `
      SELECT c.*, b.nom_bat
      FROM commentaire c
      LEFT JOIN batiment b ON c.n_bat = b.n_bat
      WHERE c.n_etudiant = ?
      ORDER BY c.date_com DESC
    `;
    
    const [results] = await db.promise().query(query, [id]);
    res.json(results);
  } catch (err) {
    console.error('Erreur:', err);
    res.status(500).json({ message: "Erreur serveur" });
  }
};

// Récupérer les commentaires par bâtiment
exports.getCommentairesByBatiment = async (req, res) => {
  try {
    const { id } = req.params;
    
    const query = `
      SELECT c.*, e.nom, e.prenom
      FROM commentaire c
      LEFT JOIN etudiant e ON c.n_etudiant = e.n_etudiant
      WHERE c.n_bat = ?
      ORDER BY c.date_com DESC
    `;
    
    const [results] = await db.promise().query(query, [id]);
    res.json(results);
  } catch (err) {
    console.error('Erreur:', err);
    res.status(500).json({ message: "Erreur serveur" });
  }
};