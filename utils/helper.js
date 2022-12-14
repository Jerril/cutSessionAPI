const bcrypt = require('bcryptjs');
const db = require('../config/db');

exports.emailExists = async(email) => {
    let client = await db.query('SELECT * FROM clients WHERE email=$1', [email]);
    if (client.rowCount == 0) return false;
    return client.rows[0];
}

exports.matchPassword = async(password, hashPassword) => {
    return await bcrypt.compare(password, hashPassword);
}

exports.hashPassword = async(password) => {
    let salt = await bcrypt.genSalt(10);
    let hash = await bcrypt.hash(password, salt);

    return hash;
}

exports.isTimeValid = (time) => {
    return /^([0-9]|0[0-9]|1[0-9]|2[0-3]):[0-5][0-9]$/.test(time);
}