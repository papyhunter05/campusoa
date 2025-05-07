const db = require('../db/cite');

exports.getAllChambres = (req, res) => {
  db.query('SELECT * FROM chambre', (err, results) => {
    if (err) return res.status(500).send(err);
    res.json(results);
  });
};

exports.getChambreById = (req, res) => {
  const { id } = req.params;
  db.query('SELECT * FROM chambre WHERE id_chambre = ?', [id], (err, results) => {
    if (err) return res.status(500).send(err);
    res.json(results[0]);
  });
};

exports.createChambre = (req, res) => {
  const data = req.body;
  db.query('INSERT INTO chambre SET ?', data, (err, results) => {
    if (err) return res.status(500).send(err);
    res.status(201).json({ id: results.insertId });
  });
};

exports.updateChambre = (req, res) => {
  const { id } = req.params;
  const data = req.body;
  db.query('UPDATE chambre SET ? WHERE id_chambre = ?', [data, id], (err) => {
    if (err) return res.status(500).send(err);
    res.sendStatus(200);
  });
};

exports.deleteChambre = (req, res) => {
  const { id } = req.params;
  db.query('DELETE FROM chambre WHERE id_chambre = ?', [id], (err) => {
    if (err) return res.status(500).send(err);
    res.sendStatus(200);
  });
};
