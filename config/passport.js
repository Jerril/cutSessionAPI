const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const JWTStrategy = require('passport-jwt').Strategy;
const extractJWT = require('passport-jwt').ExtractJwt;
const { emailExists, matchPassword } = require('../utils/helper');

// passport setup (local strategy)
passport.use(
    new LocalStrategy({
        usernameField: 'email',
        passwordField: 'password'
    }, async(email, password, done) => {
        try {
            let client = await emailExists(email);
            if (!client) return done(null, false, { message: 'Incorrect email' });

            let isMatch = await matchPassword(password, client.password);
            if (!isMatch) return done(null, false, { message: 'Incorrect password' });

            return done(null, client);
        } catch (err) {
            return done(err);
        }
    })
);

// Jwt token verification
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