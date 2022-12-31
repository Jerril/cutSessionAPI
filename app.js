// Import modules
const express = require('express');
const passport = require('./config/passport');

// Import routes modules
const authRouter = require('./routes/auth');
const sessionRouter = require('./routes/session');

const app = express();
const port = process.env.port || 8000;

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Set the routes
app.use('/', authRouter);
app.use('/session', passport.authenticate('jwt', { session: false }), sessionRouter);

app.get('/', (req, res) => res.send('This is CutSession API'));

// catch 404
app.use((req, res, next) => {
    res.status(404).json({ err: 'Resource not found' });
});


app.listen(port, () => console.log(`Server running at http://localhost:${port}}`));