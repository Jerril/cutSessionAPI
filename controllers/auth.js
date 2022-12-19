const db = require('../config/db');
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const { success, error } = require('../utils/responseApi');

// List clients
exports.list_clients = async(req, res) => {
    try {
        let result = await db.query('SELECT * FROM USERS');
        res.status(200).json(success("App clients", result.rows));
    } catch (err) {
        res.status(500).json(error("Error getting the info", err))
    }
}

// Register user
exports.register_user = [
    body("name").notEmpty().trim().isLength({ min: 2 }).escape(),
    body("email").notEmpty().normalizeEmail().isEmail(),
    body("password").notEmpty().trim().isLength({ min: 6 }).escape(),
    body("phoneNumber").notEmpty().trim().isLength({ min: 9 }).escape(),
    body("dob").notEmpty().trim().isISO8601().toDate(),
    body("cityOfResidence").notEmpty().trim().isIn(['lagos', 'abuja']).escape(),
    async(req, res, next) => {
        // check if there's validation error
        let errors = validationResult(req);

        if (!errors.isEmpty()) return res.status(422).json(error('validation error', errors.array()));

        try {
            // Check if email already exists
            let exists = await db.query('SELECT * FROM users WHERE email=$1', [req.body.email]);
            if (exists.rowCount >= 1) return res.status(422).json(error('Email already exist'));

            // Hash password
            let passwordHash = await bcrypt.hash(req.body.password, 10);

            let newUser = await db.query('INSERT INTO users(name, email, password, dob, cityOfResidence, phoneNumber) VALUES($1, $2, $3, $4, $5, $6) RETURNING *', [req.body.name, req.body.email, passwordHash, req.body.dob, req.body.cityOfResidence, req.body.phoneNumber]);

            res.status(201).json(success('User created successfully', newUser.rows));

        } catch (err) {
            return res.status(500).json(error(err.message));
        }
    }
];

// Register merchant
exports.register_merchant = (req, res) => {
    // Validate incoming data. Match it against expected data
    // Insert record into DB
    // Return response
}

// Sign in client
exports.signin_client = (req, res) => {
    // Validate incoming data. Match it against expected data
    // Check if user exists & password matches. Generate token
    // Return response
}