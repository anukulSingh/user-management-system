const mysql = require("mysql2");
const config = require("./config");

const connection = mysql.createConnection({
    host: config.MYSQL_HOST,
    user: config.MYSQL_USER,
    port: config.MYSQL_PORT,
    password: config.MYSQL_PASSWORD,
    database: config.MYSQL_DATABASE,
});

connection.connect((err) => {
    if (err) {
        return console.error('error: ' + err.message);
    }
    return console.log(`Database ${config.MYSQL_DATABASE} connected on PORT ${config.MYSQL_PORT}`)
})


module.exports = connection;