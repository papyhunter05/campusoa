const db = require('../db/cite');

exports.getAllCommentaires = (req, res) => {
  db.query('SELECT * FROM commentaire', (err, results) => {
    if (err) return res.status(500).send(err);
    res.json(results);
  });
};

exports.getCommentaireById = (req, res) => {
  const { id } = req.params;
  db.query('SELECT * FROM commentaire WHERE n_comment = ?', [id], (err, results) => {
    if (err) return res.status(500).send(err);
    res.json(results[0]);
  });
};

exports.createCommentaire = (req, res) => {
  const data = req.body;
  db.query('INSERT INTO commentaire SET ?', data, (err, results) => {
    if (err) return res.status(500).send(err);
    res.status(201).json({ id: results.insertId });
  });
};

exports.updateCommentaire = (req, res) => {
  const { id } = req.params;
  const data = req.body;
  db.query('UPDATE commentaire SET ? WHERE n_comment = ?', [data, id], (err) => {
    if (err) return res.status(500).send(err);
    res.sendStatus(200);
  });
};

exports.deleteCommentaire = (req, res) => {
  const { id } = req.params;
  db.query('DELETE FROM commentaire WHERE n_comment = ?', [id], (err) => {
    if (err) return res.status(500).send(err);
    res.sendStatus(200);
  });
};
