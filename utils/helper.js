const db = require('../config/db');

exports.clientExists = async(email) => {
    let exists = await db.query('SELECT * FROM clients WHERE email=$1', [email]);
    if (exists.rowCount >= 1) return true;
    return false;
}

exports.comparePassword = () => {

}

exports.hashPassword = () => {

}