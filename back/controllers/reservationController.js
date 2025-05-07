const db = require('../db/cite');

exports.getAllReservations = (req, res) => {
  db.query('SELECT * FROM reservation', (err, results) => {
    if (err) return res.status(500).send(err);
    res.json(results);
  });
};

exports.getReservationById = (req, res) => {
  const { id } = req.params;
  db.query('SELECT * FROM reservation WHERE id_res = ?', [id], (err, results) => {
    if (err) return res.status(500).send(err);
    res.json(results[0]);
  });
};

exports.createReservation = (req, res) => {
  const data = req.body;
  db.query('INSERT INTO reservation SET ?', data, (err, results) => {
    if (err) return res.status(500).send(err);
    res.status(201).json({ id: results.insertId });
  });
};

exports.updateReservation = (req, res) => {
  const { id } = req.params;
  const data = req.body;
  db.query('UPDATE reservation SET ? WHERE id_res = ?', [data, id], (err) => {
    if (err) return res.status(500).send(err);
    res.sendStatus(200);
  });
};

exports.deleteReservation = (req, res) => {
  const { id } = req.params;
  db.query('DELETE FROM reservation WHERE id_res = ?', [id], (err) => {
    if (err) return res.status(500).send(err);
    res.sendStatus(200);
  });
};
