import mysql from 'mysql';


console.log(process.env.DB_USER)

const connection = mysql.createConnection({
  host: 'db',
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT
});

connection.connect((err) => {
  if (err) {
    console.error('Error connecting to MySQL:', err);
  } else {
    console.log('Connected to MySQL');
  }
})

export default connection;