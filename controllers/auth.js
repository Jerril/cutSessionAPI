const db = require('../config/db');
const { body, validationResult } = require('express-validator');
const passport = require("passport");
const jwt = require("jsonwebtoken");
const bcrypt = require('bcryptjs');
const { success, error } = require('../utils/responseApi');
const { AccessType } = require('../utils/constants');

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
exports.register_client = [
    body("name").notEmpty().trim().isLength({ min: 2 }).escape(),
    body("email").notEmpty().normalizeEmail().isEmail(),
    body("password").notEmpty().trim().isLength({ min: 6 }).escape(),
    body("phoneNumber").notEmpty().trim().isLength({ min: 9 }).escape(),
    body("city").notEmpty().trim().isIn(['lagos', 'abuja']).escape(),
    body("accessType").notEmpty().trim().isIn(AccessType.all).escape(),
    body("dob").if((value, { req }) => req.body.accessType == AccessType.user).trim().isISO8601().toDate(),

    async(req, res, next) => {
        // check if there's validation error
        let errors = validationResult(req);

        if (!errors.isEmpty()) return res.status(422).json(error('validation error', errors.array()));

        try {
            // Check if email already exists
            let exists = await db.query('SELECT * FROM clients WHERE email=$1', [req.body.email]);
            if (exists.rowCount >= 1) return res.status(422).json(error('Email already exist'));

            // Hash password
            let passwordHash = await bcrypt.hash(req.body.password, 10);

            let newClient = await db.query('INSERT INTO clients(name, email, password, phoneNumber, city, accessType, dob) VALUES($1, $2, $3, $4, $5, $6, $7) RETURNING *', [req.body.name, req.body.email, passwordHash, req.body.phoneNumber, req.body.city, req.body.accessType, req.body.dob ? req.body.dob : null]);

            res.status(201).json(success('Client created successfully', newClient.rows));

        } catch (err) {
            return res.status(500).json(error(err.message));
        }
    }
]

// Register merchant
// exports.register_merchant = [
//     body("name").notEmpty().trim().isLength({ min: 2 }).escape(),
//     body("email").notEmpty().normalizeEmail().isEmail(),
//     body("password").notEmpty().trim().isLength({ min: 6 }).escape(),
//     body("phoneNumber").notEmpty().trim().isLength({ min: 9 }).escape(),
//     body("cityOfOperation").notEmpty().trim().isIn(['lagos', 'abuja']).escape(),
//     async(req, res, next) => {
//         // check if there's validation error
//         let errors = validationResult(req);

//         if (!errors.isEmpty()) return res.status(422).json(error('validation error', errors.array()));

//         try {
//             // Check if email already exists
//             let exists = await db.query('SELECT * FROM merchants WHERE email=$1', [req.body.email]);
//             if (exists.rowCount >= 1) return res.status(422).json(error('Email already exist'));

//             // Hash password
//             let passwordHash = await bcrypt.hash(req.body.password, 10);

//             let newMerchant = await db.query('INSERT INTO merchants(name, email, password, cityOfOperation, phoneNumber) VALUES($1, $2, $3, $4, $5) RETURNING *', [req.body.name, req.body.email, passwordHash, req.body.cityOfOperation, req.body.phoneNumber]);

//             res.status(201).json(success('Merchant created successfully', newMerchant.rows));

//         } catch (err) {
//             return res.status(500).json(error(err.message));
//         }
//     }
// ]

// Sign in client
exports.signin_client = [
    body("email").notEmpty().normalizeEmail().isEmail(),
    body("password").notEmpty().trim().isLength({ min: 6 }).escape(),

    async(req, res) => {
        // check if there's validation error
        let errors = validationResult(req);

        if (!errors.isEmpty()) return res.status(422).json(error('validation error', errors.array()));

        try {
            passport.authenticate("local", { session: false }, (err, client) => {
                if (err || !client) {
                    return res.status(401).json(error('Incorrect Email or Password', client))
                }

                jwt.sign({ id: client.id, email: client.email },
                    'ekooinbaje', { expiresIn: "30m" },
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
]