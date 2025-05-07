const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const app = express();
const port = 3001;

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/api/etudiants', require('./routes/etudiantRoutes'));
app.use('/api/commentaires', require('./routes/commentaireRoutes'));
app.use('/api/reservations', require('./routes/reservationRoutes'));
app.use('/api/batiments', require('./routes/batimentRoutes'));
app.use('/api/chambres', require('./routes/chambreRoutes'));

app.listen(port, () => {
  console.log(`Serveur Express en écoute sur le port ${port}`);
});
