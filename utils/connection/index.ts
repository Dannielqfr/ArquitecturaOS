import mysql from 'mysql2'

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'dbinscripciontalleres',
    port: 3306
  });
  
  connection.connect((err) => {
    if (err) {
      console.error('Error al conectar a la base de datos: ', err);
      return;
    }
    console.log('Conexión a la base de datos establecida');
  });
  
  export default connection;