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
  const data = req.body;
  db.query('INSERT INTO batiment SET ?', data, (err, results) => {
    if (err) return res.status(500).send(err);
    res.status(201).json({ id: results.insertId });
  });
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
