const { body, validationResult } = require('express-validator');
const { success, error } = require('../utils/responseApi');
const { AccessType, SessionType } = require('./constants');

exports.signup = [
    body("name").notEmpty().trim().isLength({ min: 2 }).escape(),
    body("email").notEmpty().normalizeEmail().isEmail(),
    body("password").notEmpty().trim().isLength({ min: 6 }).escape(),
    body("phoneNumber").notEmpty().trim().isLength({ min: 9 }).escape(),
    body("city").notEmpty().trim().isIn(['lagos', 'abuja']).escape(),
    body("accessType").notEmpty().trim().isIn(AccessType.all).escape(),
    body("dob").if((value, { req }) => req.body.accessType == AccessType.user).trim().isISO8601().toDate(),
    (req, res, next) => {
        let errors = validationResult(req);
        if (!errors.isEmpty()) return res.status(422).json(error('validation error', errors.array()))
        next();
    }
]

exports.signin = [
    body("email").notEmpty().normalizeEmail().isEmail(),
    body("password").notEmpty().trim().isLength({ min: 6 }).escape(),
    (req, res, next) => {
        let errors = validationResult(req);
        if (!errors.isEmpty()) return res.status(422).json(error('validation error', errors.array()))
        next();
    }
]

exports.create_session = [
    body('startsAt').notEmpty().trim().isISO8601.toDate(),
    body('endsAt').notEmpty().trim().isISO8601.toDate(),
    body('type').isIn(SessionType.all).escape(),
    (req, res, next) => {
        let errors = validationResult(req);
        if (!errors.isEmpty()) return res.status(422).json(error('validation error', errors.array()))
        next();
    }
];