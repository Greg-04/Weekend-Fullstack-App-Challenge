const express = require('express');
const router = express.Router();
const pool = require('../modules/pool.js');

// GET

router.get('/', (req, res) => {
    const dbQuery = 'SELECT * FROM "koalas";';
    pool
        .query(dbQuery)
        .then((result) => {
            console.log('RESULT', result);
            res.send(result.rows);
        })
        .catch((err) => {
            console.log('ERROR', err);

            res.sendStatus(500);
        });
});

// POST

// PUT

// DELETE

module.exports = router;
