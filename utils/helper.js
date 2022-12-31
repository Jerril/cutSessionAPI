const bcrypt = require('bcryptjs');
const db = require('../config/db');

exports.emailExists = async(email) => {
    let exists = await db.query('SELECT * FROM clients WHERE email=$1', [email]);
    if (exists.rowCount >= 1) return true;

    return false;
}

exports.matchPassword = () => {}

exports.hashPassword = async(password) => {
    let salt = await bcrypt.genSalt(10);
    let hash = await bcrypt.hash(password, salt);

    return hash;
}