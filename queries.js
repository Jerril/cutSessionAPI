const { Pool } = require('pg');

const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'cutsession',
    password: 'postgres',
    port: 5432
});

// Write your queries