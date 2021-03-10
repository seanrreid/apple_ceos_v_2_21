require('dotenv').config();

const host = process.env.DB_HOST,
    database = process.env.DB_DATABASE,
    user = process.env.DB_USER,
    password = process.env.DB_PASSWORD;


const pgp = require('pg-promise')({
    query: function (event) {
        console.log('QUERY:', event.query);
    }
});

const options = {
    host,
    database,
    user,
    password
}

const db = pgp(options);

module.exports = db;