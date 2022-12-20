const passport = require('passport');
const bcrypt = require('bcryptjs');
const LocalStrategy = require('passport-local').Strategy;
const JWTStrategy = require('passport-jwt').Strategy;
const extractJWT = require('passport-jwt').ExtractJwt;
const db = require('./db');

// passport setup
passport.use(
    new LocalStrategy({
        usernameField: 'email',
        passwordField: 'password'
    }, async(email, password, done) => {
        try {
            let client = await db.query('SELECT * FROM clients WHERE email=$1', [email]);
            if (client.rowCount < 1) return done(null, false, { message: "Incorrect email" });

            client = client.rows[0];

            bcrypt.compare(password, client.password, (err, res) => {
                if (res) return done(null, client);
                else return done(null, false, { message: "Incorrect password" });
            });
        } catch (err) {
            return done(err);
        }
    })
);

passport.use(
    new JWTStrategy({
            jwtFromRequest: extractJWT.fromAuthHeaderAsBearerToken(),
            secretOrKey: 'ekoonibaje',
        },
        (jwtPayload, done) => {
            return done(null, jwtPayload);
        }
    )
);

module.exports = passport;