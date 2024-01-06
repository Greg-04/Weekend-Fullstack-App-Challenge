const express = require('express');
const router = express.Router();
const pool = require('../modules/pool.js');

// GET

router.get('/', (req, res) => {
    const dbQuery = 'SELECT * FROM "toDoList";';
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

router.post('/', (req, res) => {
    const newTask = req.body;
    const queryText = `
    INSERT INTO "toDoList" ("Task", "Description")
    VALUES 
	($1, $2);`;
    const queryArgs = [
        newTask.Task,
        newTask.Description,
    ];
    pool    
        .query(queryText, queryArgs)
        .then((results) => {
            res.sendStatus(201);
        })
        .catch((err) => {
            res.sendStatus(500);
        });
});


// PUT

// DELETE

module.exports = router;
