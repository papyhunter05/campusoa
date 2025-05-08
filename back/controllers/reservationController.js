const db = require('../db/cite');

exports.getAllReservations = async (req, res) => {
  try {
    const query = `
      SELECT r.*, e.nom, e.prenom, c.n_chambre, b.nom_bat
      FROM reservation r
      LEFT JOIN etudiant e ON r.n_etudiant = e.n_etudiant
      LEFT JOIN chambre c ON r.n_chambre = c.n_chambre
      LEFT JOIN batiment b ON c.n_bat = b.n_bat
    `;
    
    const [results] = await db.promise().query(query);
    res.json(results);
  } catch (err) {
    console.error('Erreur:', err);
    res.status(500).json({ message: "Erreur serveur" });
  }
};

exports.getReservationById = async (req, res) => {
  try {
    const { id } = req.params;
    
    const query = `
      SELECT r.*, e.nom, e.prenom, c.n_chambre, b.nom_bat
      FROM reservation r
      LEFT JOIN etudiant e ON r.n_etudiant = e.n_etudiant
      LEFT JOIN chambre c ON r.n_chambre = c.n_chambre
      LEFT JOIN batiment b ON c.n_bat = b.n_bat
      WHERE r.id_res = ?
    `;
    
    const [results] = await db.promise().query(query, [id]);
    
    if (results.length === 0) {
      return res.status(404).json({ message: "Réservation non trouvée" });
    }
    
    res.json(results[0]);
  } catch (err) {
    console.error('Erreur:', err);
    res.status(500).json({ message: "Erreur serveur" });
  }
};

exports.createReservation = async (req, res) => {
  try {
    const data = { ...req.body };
    
    // Vérification des champs obligatoires
    if (!data.date_res || !data.n_chambre || !data.n_etudiant) {
      return res.status(400).json({ 
        message: "Les champs date_res, n_chambre et n_etudiant sont obligatoires" 
      });
    }
    
    // Insertion de la réservation
    const [result] = await db.promise().query('INSERT INTO reservation SET ?', data);
    
    // Récupération de la réservation créée
    const [reservation] = await db.promise().query(
      'SELECT * FROM reservation WHERE id_res = ?', 
      [result.insertId]
    );
    
    res.status(201).json(reservation[0]);
  } catch (err) {
    console.error('Erreur:', err);
    
    if (err.code === 'ER_DUP_ENTRY') {
      return res.status(409).json({ message: "Une réservation avec ces informations existe déjà" });
    }
    
    res.status(500).json({ message: "Erreur serveur" });
  }
};

exports.updateReservation = async (req, res) => {
  try {
    const { id } = req.params;
    const data = { ...req.body };
    
    // Suppression de l'ID si présent (ne pas modifier la clé primaire)
    delete data.id_res;
    
    // Mise à jour de la réservation
    await db.promise().query('UPDATE reservation SET ? WHERE id_res = ?', [data, id]);
    
    // Récupération de la réservation mise à jour
    const [reservation] = await db.promise().query(
      'SELECT * FROM reservation WHERE id_res = ?', 
      [id]
    );
    
    res.json(reservation[0]);
  } catch (err) {
    console.error('Erreur:', err);
    
    if (err.code === 'ER_DUP_ENTRY') {
      return res.status(409).json({ message: "Conflit de données - une valeur doit être unique" });
    }
    
    res.status(500).json({ message: "Erreur serveur" });
  }
};

exports.deleteReservation = async (req, res) => {
  try {
    const { id } = req.params;
    
    // Suppression de la réservation
    await db.promise().query('DELETE FROM reservation WHERE id_res = ?', [id]);
    
    res.sendStatus(204);
  } catch (err) {
    console.error('Erreur:', err);
    res.status(500).json({ message: "Erreur serveur" });
  }
};