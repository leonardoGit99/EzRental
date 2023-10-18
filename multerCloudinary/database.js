const mysql = require('mysql2'); // Cambiamos el paquete "mysql" a "mysql2"
const connection = mysql.createConnection({
    host: '127.0.0.1',
    port: 3306,
    user: 'root',
    password: '',
    database: 'imagen',
    //authPluginName: 'caching_sha2_password' // Específica el plugin de autenticación
});

connection.connect((err) => {
    if (err) throw err;
    console.log('Connected to the database');
});

module.exports = connection;
