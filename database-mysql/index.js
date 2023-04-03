var mysql = require('mysql2');
const dotenv = require('dotenv')
dotenv.config()

var connection = mysql.createPool({
  connectionLimit : process.env.CONNECTIONLIMIT || 100,
  host: process.env.MYSQL_HOST || "containers-us-west-58.railway.app",
  user: process.env.MYSQL_USER || "root",
  password: process.env.MYSQL_PASSWORD || "aktO3qJmBIYxwcj7uRIF",
  database: process.env.MYSQL_DATABASE || "railway",
  charset: "cp1256",
  port : process.env.DB_PORT || 6324
});


connection.getConnection((err, success) => {
  err ? console.log("connection failed", err) : console.log("Database connected successfully")
})
module.exports = connection;