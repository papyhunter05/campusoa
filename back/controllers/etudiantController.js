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
  const data = req.body;
  db.query('INSERT INTO etudiant SET ?', data, (err, results) => {
    if (err) return res.status(500).send(err);
    res.status(201).json({ id: results.insertId });
  });
};

exports.updateEtudiant = (req, res) => {
  const { id } = req.params;
  const data = req.body;
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
