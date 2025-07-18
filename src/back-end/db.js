// db.js
import mysql from 'mysql2';

export const connection = mysql.createConnection({
  host: 'MYSQL1003.site4now.net',
  user: 'aba4cf_50anos',
  password: 'tp@onlin3',
  database: 'db_aba4cf_50anos'
});

connection.connect(err => {
  if (err) throw err;
  console.log('MySQL conectado!');
});
