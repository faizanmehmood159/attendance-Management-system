const mysql = require('mysql2/promise'); 

const connection = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: '12345',
  database: 'project1'
});

module.exports = connection;
