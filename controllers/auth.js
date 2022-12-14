const passport = require("passport");
const jwt = require("jsonwebtoken");
const db = require('../config/db');
const { success, error } = require('../utils/responseApi');
const { emailExists, hashPassword } = require('../utils/helper');

exports.list_clients = async(req, res) => {
    try {
        let clients = await db.query('SELECT * FROM clients');
        return res.status(200).json(success("App clients", clients.rows));
    } catch (err) {
        return res.status(500).json(error("Error getting the info", err))
    }
}

exports.register_client = async(req, res, next) => {
    try {
        if (await emailExists(req.body.email)) return res.status(422).json(error('Email already exist'));

        const passwordHash = await hashPassword(req.body.password);

        let newClient = await db.query(
            'INSERT INTO clients(name, email, password, phoneNumber, city, accessType, dob) VALUES($1, $2, $3, $4, $5, $6, $7) RETURNING *', [
                req.body.name,
                req.body.email,
                passwordHash,
                req.body.phoneNumber,
                req.body.city,
                req.body.accessType,
                req.body.dob ? req.body.dob : null
            ]
        );

        return res.status(201).json(success('Client created successfully', newClient.rows));
    } catch (err) {
        return res.status(500).json(error(err.message));
    }
}

exports.signin_client = async(req, res) => {
    try {
        // Authenticate client
        passport.authenticate('local', { session: false }, async(err, client) => {
            if (err || !client) return res.status(400).json(error('Wrong email or password'));

            // Genetate token
            let token = await jwt.sign({ id: client.id, email: client.email, accesstype: client.accesstype }, 'ekoonibaje', { expiresIn: "30m" })
            if (!token) return res.status(400).json(error('Error generating jwt'));

            return res.status(200).json(success('Login Successful', { token, client }));
        })(req, res);

    } catch (err) {
        return res.status(500).json(error(err.message));
    }
}