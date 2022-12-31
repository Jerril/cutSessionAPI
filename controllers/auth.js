const db = require('../config/db');
const passport = require("passport");
const jwt = require("jsonwebtoken");
const bcrypt = require('bcryptjs');
const { success, error } = require('../utils/responseApi');
const { AccessType } = require('../utils/constants');
const { emailExists } = require('../utils/helper');

// List clients
exports.list_clients = async(req, res) => {
    try {
        let clients = await db.query('SELECT * FROM clients');

        res.status(200).json(success("App clients", clients.rows));
    } catch (err) {
        res.status(500).json(error("Error getting the info", err))
    }
}

// Register client
exports.register_client = async(req, res, next) => {
    try {
        // Check if email exists
        if (emailExists(req.body.email)) res.status(422).json(error('Email already exist'));

        // Hash password
        let passwordHash = await bcrypt.hash(req.body.password, 10);
        let newClient = await db.query('INSERT INTO clients(name, email, password, phoneNumber, city, accessType, dob) VALUES($1, $2, $3, $4, $5, $6, $7) RETURNING *', [req.body.name, req.body.email, passwordHash, req.body.phoneNumber, req.body.city, req.body.accessType, req.body.dob ? req.body.dob : null]);

        res.status(201).json(success('Client created successfully', newClient.rows));
    } catch (err) {
        return res.status(500).json(error(err.message));
    }
}

// Sign in client
exports.signin_client = async(req, res) => {
    try {
        passport.authenticate("local", { session: false }, (err, client) => {
            if (err || !client) {
                return res.status(401).json(error('Incorrect Email or Password', client))
            }

            jwt.sign({ id: client.id, email: client.email },
                'ekoonibaje', { expiresIn: "30m" },
                (err, token) => {
                    if (err) return res.status(400).json(err);
                    let data = {
                        token: token,
                        client
                    }
                    res.status(200).json(success('Login Successful', data));
                });
        })(req, res)
    } catch (err) {
        return res.status(500).json(error(err.message));
    }
}