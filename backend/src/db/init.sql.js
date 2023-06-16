const mysql =  require("mysql2");

const pool = mysql
  .createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USERNAME,
    password:  process.env.DB_PWD,
    database:  process.env.DB_NAME,
    connectionLimit: 10,
  })
  .promise();

module.exports= pool;