const mysql = require("mysql2");

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'mysql123456',
    database: 'tracker'
  });

  module.exports = db; 