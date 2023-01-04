const { body, validationResult } = require('express-validator');
const { success, error } = require('../utils/responseApi');
const { AccessType, SessionType } = require('./constants');
const { isTimeValid } = require('../utils/helper');

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
    body('startsAt').notEmpty().trim().isISO8601(),
    body('endsAt').notEmpty().trim().isISO8601(),
    body('type').isIn(SessionType.all).escape(),
    (req, res, next) => {
        let errors = validationResult(req);
        if (!errors.isEmpty()) return res.status(422).json(error('validation error', errors.array()))

        // 1. Check if its a valid time
        if (!isTimeValid(req.body.startsAt)) return res.status(422).json(error('validation error', 'The provided date is not valid'))
            // 2. endsAt must be greater than startsAt
        let endsAt = req.body.endsAt.split(":");
        let endsAtMins = (parseInt(endsAt[0]) * 60) + parseInt(endsAt[1]);

        let startsAt = req.body.startsAt.split(":");
        let startsAtMins = (parseInt(startsAt[0]) * 60) + parseInt(startsAt[1]);

        if (startsAtMins > endsAtMins) return res.status(422).json(error('validation error: End Time must be greater than start time', ))
            // 3. The difference between the two time must be either (45, 60, 90)
            // ==================
            // Type: Weekday, time between 9am-8pm
            // Type: Weekend, time between 10am-10pm

        next();
    }
];