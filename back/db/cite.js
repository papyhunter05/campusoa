const mysql = require('mysql2');

const conn = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'cite_v2'
});

conn.connect(err =>{
    if (err) throw err;
    console.log('Connecté à MySQL et à la base de données cite');
    
});

module.exports = conn;