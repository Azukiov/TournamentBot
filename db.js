const mariadb = require('mariadb');
const log = require('./logger');

const db = mariadb.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
    connectionLimit: 5
});

db.getConnection()
    .then(conn => {
        log.db(`Connected to database`);
        conn.release();
    }).catch(err => {
        log.db(`Failed to connect to database after 5 attempts.`);
        log.error(err);
    });


module.exports = db;
