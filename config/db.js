const mysql = require('mysql2/promise'); // Use mysql2 for promise support

const connection = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: '12345',
  database: 'project1'
});

module.exports = connection;
